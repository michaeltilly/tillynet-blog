import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About Michael Tillman - Network Engineer, Cloud Architect, and Home Labber.",
};

const certifications = [
  {
    name: "CCNP ENCOR",
    code: "350-401",
    status: "In Progress",
    href: "/projects/ccnp-journey",
  },
  {
    name: "ENAUTO",
    code: "300-435",
    status: "In Progress",
    href: "/projects/ccnp-journey",
  },
];

const timeline = [
  {
    year: "2025",
    events: [
      "Built TillyNet home lab — 16 VLANs, Proxmox, pfSense, Samba AD, 802.1X",
      "Deployed hybrid cloud infrastructure with AWS Site-to-Site VPN",
      "Started CCNP ENCOR and ENAUTO certification tracks",
      "Published 20 technical blog posts documenting the journey",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Bio */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          About
        </h1>
        <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            I&apos;m Michael Tillman, a network engineer and cloud architect passionate about
            building enterprise-grade infrastructure. TillyNet is my self-hosted lab
            environment that simulates real-world IT infrastructure — featuring VLAN
            segmentation, virtualized services, firewall enforcement, DNS resolution,
            and automation workflows.
          </p>
          <p>
            Built to bridge theory with practice, this lab showcases hands-on
            experimentation in modern network architecture and systems engineering. Every
            configuration, every failure, and every fix is documented on this blog.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Certifications
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert) => (
            <Link
              key={cert.code}
              href={cert.href}
              className="group flex items-start gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 hover:border-cyan-500/50 transition-all"
            >
              <Award className="h-8 w-8 text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cert.code}
                </p>
                <span className="mt-2 inline-block rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                  {cert.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Experience Timeline
        </h2>
        <div className="space-y-8">
          {timeline.map((period) => (
            <div key={period.year} className="relative pl-8 border-l-2 border-cyan-500">
              <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-cyan-500 border-4 border-white dark:border-gray-950" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {period.year}
              </h3>
              <ul className="mt-3 space-y-2">
                {period.events.map((event, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Connect
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/michaeltilly"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-cyan-500/50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/michaeltillman7/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-cyan-500/50 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
