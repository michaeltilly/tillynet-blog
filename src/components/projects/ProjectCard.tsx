import Link from "next/link";
import type { Project } from "@/lib/mdx";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 ${
        featured ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {project.frontmatter.title}
        </h3>
        <span className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
          {project.frontmatter.status}
        </span>
      </div>
      <p
        className={`mt-3 text-gray-600 dark:text-gray-400 leading-relaxed ${
          featured ? "text-base" : "text-sm"
        }`}
      >
        {project.frontmatter.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.frontmatter.tags.map((tag) => (
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
