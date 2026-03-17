import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import { PostCard } from "@/components/blog/PostCard";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `All TillyNet blog posts tagged with "${tag}".`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/tags" className="hover:text-cyan-500 transition-colors">
          Tags
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700 dark:text-gray-300">{decodedTag}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Posts tagged &ldquo;{decodedTag}&rdquo;
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {posts.length} post{posts.length !== 1 ? "s" : ""} found.
      </p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
