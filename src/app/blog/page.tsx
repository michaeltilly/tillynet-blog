import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { TagFilter } from "@/components/blog/TagFilter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical blog posts covering network engineering, cloud infrastructure, home labbing, and cybersecurity.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {posts.length} posts covering network engineering, cloud infrastructure,
        and home lab builds.
      </p>

      <div className="mt-8">
        <TagFilter posts={posts} allTags={allTags} />
      </div>
    </div>
  );
}
