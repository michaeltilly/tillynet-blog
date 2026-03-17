import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { Callout } from "@/components/mdx/Callout";
import { NetworkDiagram } from "@/components/mdx/NetworkDiagram";
import { BlogImage } from "@/components/mdx/BlogImage";

const mdxComponents = {
  Callout,
  NetworkDiagram,
  BlogImage,
  img: ({ src, alt }: React.ComponentPropsWithoutRef<"img">) => (
    <BlogImage src={typeof src === "string" ? src : ""} alt={typeof alt === "string" ? alt : ""} />
  ),
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
            {project.frontmatter.status}
          </span>
          {project.frontmatter.github && (
            <a
              href={project.frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-cyan-500 transition-colors"
            >
              View on GitHub &rarr;
            </a>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          {project.frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {project.frontmatter.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-sm text-gray-600 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>
    </div>
  );
}
