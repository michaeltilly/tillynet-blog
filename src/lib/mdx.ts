import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  draft: boolean;
  publish?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  category: string;
}

export interface ProjectFrontmatter {
  title: string;
  status: string;
  description: string;
  tags: string[];
  github?: string;
  startDate: string;
  featured?: boolean;
  order?: number;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllPosts(): Post[] {
  const blogDir = path.join(contentDir, "blog");
  const files = getFilesRecursively(blogDir);

  const posts = files
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      // Derive slug from the parent directory name (e.g., post-1, aws-lab-1)
      const parentDir = path.basename(path.dirname(filePath));
      // Derive category from the grandparent directory
      const categoryDir = path.basename(path.dirname(path.dirname(filePath)));

      return {
        slug: parentDir,
        frontmatter: {
          title: data.title || "Untitled",
          date: data.date ? new Date(data.date).toISOString().split("T")[0] : "1970-01-01",
          tags: data.tags || [],
          categories: data.categories || [],
          draft: data.draft ?? false,
          publish: data.publish,
        },
        content,
        readingTime: stats.text,
        category: categoryDir,
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const filePath = path.join(projectsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: {
          title: data.title || "Untitled",
          status: data.status || "active",
          description: data.description || "",
          tags: data.tags || [],
          github: data.github,
          startDate: data.startDate || "2025-01-01",
          featured: data.featured ?? false,
          order: data.order ?? 99,
        },
        content,
      };
    })
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
