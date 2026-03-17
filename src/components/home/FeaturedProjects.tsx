import Link from "next/link";
import { Server, Cloud, Award } from "lucide-react";

const projects = [
  {
    title: "TillyNet Home Lab",
    description: "Enterprise-grade home lab: 16 VLANs, Proxmox cluster, pfSense firewall, Samba AD, Authentik SSO, Traefik reverse proxy, 802.1X authentication.",
    icon: Server,
    tags: ["Proxmox", "pfSense", "Docker", "Samba AD", "RADIUS"],
    href: "/projects/tillynet-homelab",
    status: "Active",
  },
  {
    title: "AWS Cloud Infrastructure",
    description: "Terraform-managed VPC, EC2 instances, S3 storage, and site-to-site VPN bridging cloud to TillyNet on-premise infrastructure.",
    icon: Cloud,
    tags: ["Terraform", "AWS", "VPC", "VPN"],
    href: "/projects/aws-infrastructure",
    status: "Active",
  },
  {
    title: "CCNP Certification Journey",
    description: "ENCOR and ENAUTO lab environments, SD-Access configurations, practice exams, and hands-on lab documentation.",
    icon: Award,
    tags: ["OSPF", "IS-IS", "SD-Access", "Cisco"],
    href: "/projects/ccnp-journey",
    status: "In Progress",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Featured Projects
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Infrastructure I&apos;ve designed, built, and documented.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="flex items-center justify-between">
                <project.icon className="h-8 w-8 text-cyan-500" />
                <span className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
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
      </div>
    </section>
  );
}
