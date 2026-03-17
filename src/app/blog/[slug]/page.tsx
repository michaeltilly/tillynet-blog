import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Callout } from "@/components/mdx/Callout";
import { TerminalBlock } from "@/components/mdx/TerminalBlock";
import { BlogImage } from "@/components/mdx/BlogImage";
import { LabObjective } from "@/components/mdx/LabObjective";
import { NetworkDiagram } from "@/components/mdx/NetworkDiagram";
import { CodeBlock } from "@/components/mdx/CodeBlock";

const mdxComponents = {
  Callout,
  TerminalBlock,
  BlogImage,
  LabObjective,
  NetworkDiagram,
  CodeBlock,
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre {...props}>{children}</pre>
  ),
  img: ({ src, alt }: React.ComponentPropsWithoutRef<"img">) => (
    <BlogImage src={typeof src === "string" ? src : ""} alt={typeof alt === "string" ? alt : ""} />
  ),
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.frontmatter.title,
    description: `${post.frontmatter.title} - TillyNet technical blog post`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const categoryLabel =
    post.category === "on-premise-engineering-labs"
      ? "On-Premise Engineering Labs"
      : "Cloud Engineering Labs";

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/blog" className="hover:text-cyan-500 transition-colors">
          Blog
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700 dark:text-gray-300">{categoryLabel}</span>
      </nav>

      <div className="flex gap-12">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.frontmatter.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.frontmatter.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, rehypeHighlight],
                },
              }}
            />
          </div>

          {/* Post navigation */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-800 pt-8">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-cyan-500/50 transition-all"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  &larr; Previous
                </span>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {prevPost.frontmatter.title}
                </p>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-cyan-500/50 transition-all text-right sm:col-start-2"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Next &rarr;
                </span>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {nextPost.frontmatter.title}
                </p>
              </Link>
            )}
          </div>
        </article>

        {/* Table of Contents sidebar */}
        <aside className="hidden xl:block w-64 shrink-0">
          <TableOfContents content={post.content} />
        </aside>
      </div>
    </div>
  );
}
