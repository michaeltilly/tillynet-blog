import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Posts
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Recent writeups from the lab.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 transition-all hover:border-cyan-500/50 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {post.frontmatter.title}
                </h3>
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
                {post.frontmatter.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-400"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
