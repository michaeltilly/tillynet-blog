"use client";

import { useState } from "react";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/mdx";

interface TagFilterProps {
  posts: Post[];
  allTags: { tag: string; count: number }[];
}

export function TagFilter({ posts, allTags }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesTag =
      !selectedTag ||
      post.frontmatter.tags.some((t) => t.toLowerCase() === selectedTag);
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesTag && matchesCategory;
  });

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            !selectedCategory
              ? "bg-cyan-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() =>
            setSelectedCategory(
              selectedCategory === "on-premise-engineering-labs"
                ? null
                : "on-premise-engineering-labs"
            )
          }
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            selectedCategory === "on-premise-engineering-labs"
              ? "bg-cyan-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          On-Premise
        </button>
        <button
          onClick={() =>
            setSelectedCategory(
              selectedCategory === "cloud-engineering-labs"
                ? null
                : "cloud-engineering-labs"
            )
          }
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
            selectedCategory === "cloud-engineering-labs"
              ? "bg-cyan-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Cloud
        </button>
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {allTags.slice(0, 15).map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedTag === tag
                ? "bg-cyan-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tag} ({count})
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No posts match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
