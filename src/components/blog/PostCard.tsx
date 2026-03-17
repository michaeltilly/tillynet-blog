import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/mdx";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 transition-all hover:border-cyan-500/50 hover:shadow-md"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
              {post.category === "on-premise-engineering-labs"
                ? "On-Premise"
                : "Cloud"}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
            {post.frontmatter.title}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 shrink-0">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {post.frontmatter.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.frontmatter.tags.slice(0, 6).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
