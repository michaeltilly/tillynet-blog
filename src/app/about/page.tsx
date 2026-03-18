import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Award, Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About Michael Tillman - CCNP Network Engineer specializing in SD-Access, network automation, and enterprise infrastructure.",
};

const certifications = [
  {
    name: "CCNP Enterprise",
    code: "Cisco Certified Network Professional",
    status: "Achieved",
    href: "/projects/ccnp-journey",
  },
  {
    name: "ENCOR",
    code: "350-401 — Enterprise Core",
    status: "Achieved",
    href: "/projects/ccnp-journey",
  },
  {
    name: "DevNet Specialist — ENAUTO",
    code: "300-435 — Enterprise Automation",
    status: "Achieved",
    href: "/projects/ccnp-journey",
  },
];

const timeline = [
  {
    year: "Present",
    events: [
      "CCNP-certified Network Engineer with Active DoD Secret Clearance",
      "Specializing in Cisco SD-Access ecosystems, secure transport architectures, and complex routing",
      "Driving network automation with Ansible, Python, and PowerShell for zero-downtime deployments",
      "Enforcing STIG compliance and continuous modernization of mission-critical networks",
    ],
  },
  {
    year: "2025",
    events: [
      "Earned CCNP Enterprise certification (ENCOR + DevNet ENAUTO)",
      "Built TillyNet home lab — 16 VLANs, Proxmox, pfSense, Samba AD, 802.1X EAP-TLS",
      "Deployed hybrid cloud infrastructure with AWS Site-to-Site VPN via Terraform",
      "Published 20+ technical blog posts documenting enterprise infrastructure builds",
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
            I&apos;m Michael Tillman, a CCNP-certified Network Engineer with an Active DoD
            Secret Clearance. I specialize in the design, automation, and continuous
            modernization of mission-critical, enterprise-scale networks.
          </p>
          <p>
            My technical foundation centers on Cisco Software-Defined Access (SDA) ecosystems,
            secure transport architectures, and complex routing. I am driven by network
            automation — leveraging Ansible, Python, and PowerShell to eliminate manual overhead,
            enforce strict STIG compliance, and execute large-scale, zero-downtime deployments.
          </p>
          <p>
            I excel at translating complex network challenges into reliable, automated solutions
            that reduce operational risk. I partner with stakeholders to provide advanced
            engineering support, drive continuous improvement initiatives, and ensure that
            technical architectures securely and efficiently meet overarching business objectives.
          </p>
          <p>
            TillyNet is my personal lab environment where I experiment with enterprise
            technologies outside of production — documenting every configuration, every failure,
            and every lesson learned on this blog.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Certifications
        </h2>
        <div className="grid gap-4">
          {certifications.map((cert) => (
            <Link
              key={cert.code}
              href={cert.href}
              className="group flex items-start gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 hover:border-cyan-500/50 transition-all"
            >
              <Award className="h-8 w-8 text-cyan-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {cert.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                    <CheckCircle className="h-3 w-3" />
                    {cert.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {cert.code}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Clearance */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Clearance
        </h2>
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
          <Shield className="h-8 w-8 text-cyan-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              DoD Tier 3 Secret Clearance
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Active
            </p>
          </div>
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
