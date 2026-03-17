import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects, getAllTags } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://blog.tillynet.com";
  const posts = getAllPosts();
  const projects = getAllProjects();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/tags`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...projectPages, ...tagPages];
}
