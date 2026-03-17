import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Infrastructure projects: TillyNet home lab, AWS cloud infrastructure, and CCNP certification journey.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Infrastructure I&apos;ve designed, built, and documented.
        </p>
        <p className="mt-8 text-gray-500 dark:text-gray-400">
          Projects coming soon.
        </p>
      </div>
    );
  }

  const featured = projects.find((p) => p.frontmatter.featured);
  const others = projects.filter((p) => !p.frontmatter.featured);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Projects
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Infrastructure I&apos;ve designed, built, and documented.
      </p>

      <div className="mt-8 space-y-6">
        {featured && <ProjectCard project={featured} featured />}
        <div className="grid gap-6 sm:grid-cols-2">
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
