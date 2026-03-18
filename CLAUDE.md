# CLAUDE.md - TillyNet Blog (Next.js)

## What This Is

Professional portfolio/blog website for Michael Tillman at https://blog.tillynet.com. Built with Next.js 16, TypeScript, Tailwind CSS, and MDX. Hosted on Vercel with auto-deploy from GitHub.

## Tech Stack

- **Framework:** Next.js 16.1.7 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Content:** MDX via next-mdx-remote + gray-matter + reading-time
- **Icons:** lucide-react
- **Theme:** next-themes (dark/light toggle, defaults to dark)
- **Hosting:** Vercel (free tier, auto-deploys from master branch)
- **DNS:** Cloudflare (CNAME blog → Vercel)
- **Repo:** github.com/michaeltilly/tillynet-blog (branch: master)

## Project Structure

```
tillynet-blog/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Navbar, Footer, ThemeProvider, Inter font)
│   │   ├── page.tsx            # Homepage (Hero + FeaturedProjects + LatestPosts + Skills)
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing with TagFilter
│   │   │   └── [slug]/page.tsx # Individual post (MDX rendered, sticky TOC)
│   │   ├── projects/
│   │   │   ├── page.tsx        # Project showcase grid
│   │   │   └── [slug]/page.tsx # Individual project (MDX rendered)
│   │   ├── about/page.tsx      # Bio, certifications, timeline, connect links
│   │   ├── tags/
│   │   │   ├── page.tsx        # All tags with counts
│   │   │   └── [tag]/page.tsx  # Posts filtered by tag
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── sitemap.ts          # Auto-generated XML sitemap
│   │   └── rss.xml/route.ts    # RSS feed
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, ThemeProvider
│   │   ├── home/               # HeroSection, FeaturedProjects, LatestPosts, SkillsOverview
│   │   ├── blog/               # PostCard, TableOfContents, TagFilter
│   │   ├── projects/           # ProjectCard
│   │   └── mdx/                # Callout, TerminalBlock, BlogImage, CodeBlock, LabObjective, NetworkDiagram
│   ├── lib/
│   │   ├── mdx.ts              # Core content library (getAllPosts, getPostBySlug, etc.)
│   │   ├── posts.ts            # Re-exports from mdx.ts
│   │   └── projects.ts         # Re-exports from mdx.ts
│   └── styles/
│       └── globals.css         # Tailwind base + prose styles + scrollbar + accent color
├── content/                    # Content files (populated by deploy.py)
│   ├── blog/
│   │   ├── on-premise-engineering-labs/   # 16 posts (post-1/ through post-16/)
│   │   └── cloud-engineering-labs/        # 4 posts (aws-lab-1/ through aws-lab-4/)
│   └── projects/               # Project definition MDX files
│       ├── tillynet-homelab.mdx
│       ├── aws-infrastructure.mdx
│       └── ccnp-journey.mdx
├── public/images/              # Static images copied by deploy.py
├── deploy.py                   # Obsidian → MDX deploy script
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

## Content Pipeline

```
Obsidian Vault (blog/)
       │
  deploy.py
  1. Copies blog/on-premise-engineering-labs/ → content/blog/on-premise-engineering-labs/
  2. Copies blog/cloud-engineering-labs/ → content/blog/cloud-engineering-labs/
  3. Transforms Obsidian syntax → MDX:
     - ![[file.png]] → ![file](/images/file.png)
     - [[file.png]]  → ![file](/images/file.png)
     - > [!info]     → <Callout type="info">
     - ```terminal   → <TerminalBlock>
  4. Renames .md → .mdx
  5. Copies assets/images/ → public/images/
  6. git add, commit, push to origin/master
       │
  Vercel auto-deploys (~60s)
       │
  Live at blog.tillynet.com
```

## How Content Loading Works

- `src/lib/mdx.ts` recursively reads all `.md`/`.mdx` files from `content/blog/`
- Slugs are derived from the **parent directory name** (e.g., `post-1`, `aws-lab-3`)
- Category is derived from the **grandparent directory** (e.g., `on-premise-engineering-labs`)
- Posts with `draft: true` in frontmatter are filtered out
- Posts are sorted by date descending
- Projects are read from `content/projects/` and sorted by `order` field

## MDX Components Available in Posts

| Component | Usage | Source |
|-----------|-------|--------|
| `<Callout type="info\|warning\|tip\|danger">` | Info/warning boxes | Auto-transformed from `> [!info]` |
| `<TerminalBlock>` | CLI output with green-on-black style | Auto-transformed from ` ```terminal ` |
| `<BlogImage src="" alt="" caption="">` | Image with lightbox | Auto-transformed from `![[file.png]]` |
| `<CodeBlock>` | Code with copy button | Standard code fences |
| `<LabObjective>` | Lab goal box (cyan gradient) | Write directly in MDX |
| `<NetworkDiagram nodes={[]} links={[]}>` | Interactive SVG topology | Write directly in MDX |

## Design System

- **Accent color:** Cyan (`cyan-500`, `rgb(6,182,212)`)
- **Dark mode default:** `bg-gray-950`, `text-gray-100`
- **Light mode:** `bg-white`, `text-gray-900`
- **Font:** Inter (Google Fonts)
- **Navbar:** Fixed, glass-morphism (`backdrop-blur-md`), hamburger menu on mobile
- **Blog posts:** Two-column layout on xl screens (content + sticky TOC sidebar)
- **Cards:** Rounded borders, cyan glow on hover

## Commands

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build (must pass with 0 errors before deploy)
python deploy.py     # Copy Obsidian content, transform, push to GitHub
python deploy.py --dry-run  # Preview what would change without pushing
```

## Critical Paths

- **DO NOT change directory names** in `content/blog/` without updating `deploy.py` source paths
- **DO NOT remove `content/projects/*.mdx`** — the Projects page and homepage FeaturedProjects reference these
- **The `master` branch auto-deploys** to production. Every push goes live within ~60 seconds.
- **Project content files** (`content/projects/`) are NOT auto-deployed from Obsidian — they live in this repo and are edited directly

## Source of Truth

- **Blog posts:** Obsidian vault at `C:\Users\tillyadmin\Documents\TillyDomain_Obsidian_Vault\blog\`
- **Project pages:** This repo at `content/projects/`
- **Components/pages:** This repo at `src/`
- **Old Hugo site:** `C:\Users\tillyadmin\Documents\tillynetblog` (deprecated, do not use)
