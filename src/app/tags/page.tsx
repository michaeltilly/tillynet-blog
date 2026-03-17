import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all tags across TillyNet blog posts.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tags</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Browse posts by topic.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-cyan-500/50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
          >
            {tag}
            <span className="ml-1.5 text-gray-400 dark:text-gray-500">
              ({count})
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
