#!/usr/bin/env python3
"""
TillyNet Blog Deploy Script
============================
Copies content from Obsidian vault to Next.js content directory,
transforms Obsidian-specific syntax to MDX, and pushes to GitHub.
Vercel auto-deploys from the main branch.

Usage:
    python deploy.py              # Full deploy (copy, transform, push)
    python deploy.py --dry-run    # Preview changes without pushing
"""

import os
import re
import sys
import shutil
import subprocess

# === CONFIGURATION ===
OBSIDIAN_VAULT = r"C:\Users\tillyadmin\Documents\TillyDomain_Obsidian_Vault"
BLOG_ROOT = os.path.dirname(os.path.abspath(__file__))

# Source directories (from restructured vault)
OBSIDIAN_BLOG_DIR = os.path.join(OBSIDIAN_VAULT, "blog")
OBSIDIAN_ON_PREM = os.path.join(OBSIDIAN_BLOG_DIR, "on-premise-engineering-labs")
OBSIDIAN_CLOUD = os.path.join(OBSIDIAN_BLOG_DIR, "cloud-engineering-labs")
OBSIDIAN_ABOUT = os.path.join(OBSIDIAN_BLOG_DIR, "pages", "about.md")
OBSIDIAN_IMAGES = os.path.join(OBSIDIAN_VAULT, "assets", "images")

# Destination directories
CONTENT_DIR = os.path.join(BLOG_ROOT, "content", "blog")
CONTENT_ON_PREM = os.path.join(CONTENT_DIR, "on-premise-engineering-labs")
CONTENT_CLOUD = os.path.join(CONTENT_DIR, "cloud-engineering-labs")
STATIC_IMAGES = os.path.join(BLOG_ROOT, "public", "images")

DRY_RUN = "--dry-run" in sys.argv


def log(msg: str) -> None:
    print(msg)


def transform_obsidian_to_mdx(content: str) -> str:
    """Transform Obsidian-specific syntax to MDX components."""

    # 1. Transform Obsidian image embeds: ![[file.png]] -> ![Image](/images/file.png)
    #    Handles .png, .jpg, .jpeg, .gif, .svg, .webp
    content = re.sub(
        r'!\[\[([^\]]*\.(png|jpg|jpeg|gif|svg|webp))\]\]',
        lambda m: f'![{m.group(1)}](/images/{m.group(1).replace(" ", "%20")})',
        content,
        flags=re.IGNORECASE
    )

    # 2. Transform Obsidian wiki image links: [[file.png]] (without !)
    content = re.sub(
        r'\[\[([^\]]*\.(png|jpg|jpeg|gif|svg|webp))\]\]',
        lambda m: f'![{m.group(1)}](/images/{m.group(1).replace(" ", "%20")})',
        content,
        flags=re.IGNORECASE
    )

    # 3. Transform Obsidian callouts to MDX Callout components
    #    > [!info] Optional title
    #    > Content line 1
    #    > Content line 2
    def replace_callout(match: re.Match) -> str:
        callout_type = match.group(1).lower()
        title = match.group(2).strip() if match.group(2) else ""
        body_lines = match.group(3).strip()
        # Remove leading "> " from each line
        body = "\n".join(
            line.lstrip(">").lstrip(" ") for line in body_lines.split("\n")
        )

        valid_types = {"info", "warning", "tip", "danger", "note", "caution"}
        if callout_type == "note":
            callout_type = "info"
        elif callout_type == "caution":
            callout_type = "warning"
        elif callout_type not in valid_types:
            callout_type = "info"

        title_attr = f' title="{title}"' if title else ""
        return f'<Callout type="{callout_type}"{title_attr}>\n{body}\n</Callout>'

    content = re.sub(
        r'> \[!(\w+)\]\s*(.*)\n((?:>.*\n?)*)',
        replace_callout,
        content
    )

    # 4. Transform ```terminal blocks to TerminalBlock components
    content = re.sub(
        r'```terminal\n(.*?)```',
        r'<TerminalBlock>\n{\`\1\`}\n</TerminalBlock>',
        content,
        flags=re.DOTALL
    )

    return content


def copy_images(source_dir: str) -> None:
    """Copy images from source to static/images."""
    if not os.path.exists(source_dir):
        return

    os.makedirs(STATIC_IMAGES, exist_ok=True)

    for root, _, files in os.walk(source_dir):
        for filename in files:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')):
                src = os.path.join(root, filename)
                dst = os.path.join(STATIC_IMAGES, filename)
                if DRY_RUN:
                    log(f"  [DRY RUN] Would copy image: {filename}")
                else:
                    shutil.copy2(src, dst)


def process_content_directory(source_dir: str, dest_dir: str, label: str) -> int:
    """Copy and transform markdown files from Obsidian to Next.js content."""
    log(f"\n{'='*60}")
    log(f"Processing: {label}")
    log(f"{'='*60}")

    if not os.path.exists(source_dir):
        log(f"  Source not found: {source_dir} - skipping.")
        return 0

    # Clean destination
    if os.path.exists(dest_dir) and not DRY_RUN:
        shutil.rmtree(dest_dir)

    if not DRY_RUN:
        shutil.copytree(source_dir, dest_dir)

    count = 0
    for root, _, files in os.walk(source_dir if DRY_RUN else dest_dir):
        for filename in files:
            if not filename.endswith(".md"):
                continue

            filepath = os.path.join(root, filename)
            count += 1

            if DRY_RUN:
                log(f"  [DRY RUN] Would process: {filename}")
                continue

            # Read and transform content
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            transformed = transform_obsidian_to_mdx(content)

            # Write back as .mdx
            mdx_path = filepath.replace(".md", ".mdx")
            with open(mdx_path, "w", encoding="utf-8") as f:
                f.write(transformed)

            # Remove original .md if renamed
            if mdx_path != filepath:
                os.remove(filepath)

            log(f"  Processed: {filename} -> {os.path.basename(mdx_path)}")

    log(f"  Total: {count} files processed")
    return count


def main() -> None:
    if DRY_RUN:
        log("=" * 60)
        log("DRY RUN MODE - No changes will be made")
        log("=" * 60)

    # Step 1: Process on-premise engineering labs
    on_prem_count = process_content_directory(
        OBSIDIAN_ON_PREM, CONTENT_ON_PREM, "On-Premise Engineering Labs"
    )

    # Step 2: Process cloud engineering labs
    cloud_count = process_content_directory(
        OBSIDIAN_CLOUD, CONTENT_CLOUD, "Cloud Engineering Labs"
    )

    # Step 3: Copy images
    log(f"\n{'='*60}")
    log("Copying images")
    log(f"{'='*60}")
    copy_images(OBSIDIAN_IMAGES)
    # Also scan blog content directories for inline images
    copy_images(OBSIDIAN_ON_PREM)
    copy_images(OBSIDIAN_CLOUD)
    log("  Done.")

    # Step 4: Summary
    total = on_prem_count + cloud_count
    log(f"\n{'='*60}")
    log(f"SUMMARY: {total} posts processed")
    log(f"{'='*60}")

    if DRY_RUN:
        log("\nDry run complete. No files were modified.")
        return

    # Step 5: Git commit and push
    log(f"\n{'='*60}")
    log("Pushing to GitHub")
    log(f"{'='*60}")

    try:
        subprocess.run(["git", "add", "."], cwd=BLOG_ROOT, check=True)

        # Check if there are changes to commit
        result = subprocess.run(
            ["git", "diff", "--cached", "--quiet"],
            cwd=BLOG_ROOT,
            capture_output=True
        )
        if result.returncode == 0:
            log("  No changes to commit.")
            return

        subprocess.run(
            ["git", "commit", "-m", f"Deploy: {total} posts updated"],
            cwd=BLOG_ROOT, check=True
        )
        subprocess.run(
            ["git", "push", "origin", "master"],
            cwd=BLOG_ROOT, check=True
        )
        log("  Pushed to GitHub. Vercel will auto-deploy.")
    except subprocess.CalledProcessError as e:
        log(f"  Git error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
