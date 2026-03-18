import Link from "next/link";

const skills = [
  {
    category: "Enterprise Networking",
    items: ["Cisco SD-Access", "OSPF", "IS-IS", "BGP", "VLANs", "802.1X"],
    evidence: "/tags/homelab",
    certification: "CCNP Enterprise",
  },
  {
    category: "Network Automation",
    items: ["Ansible", "Python", "PowerShell", "RESTCONF", "NETCONF"],
    evidence: "/tags/docker",
    certification: "DevNet ENAUTO",
  },
  {
    category: "Cloud Infrastructure",
    items: ["Terraform", "AWS VPC", "EC2", "S3", "Site-to-Site VPN"],
    evidence: "/tags/aws",
    certification: "AWS Labs",
  },
  {
    category: "Security & Compliance",
    items: ["STIG Compliance", "PKI/TLS", "EAP-TLS", "RADIUS", "Samba AD"],
    evidence: "/tags/authentication",
    certification: "DoD Cleared",
  },
];

export function SkillsOverview() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills & Certifications
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Every skill backed by documented, hands-on evidence.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <Link
              key={skill.category}
              href={skill.evidence}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 transition-all hover:border-cyan-500/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {skill.category}
                </h3>
                <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                  {skill.certification}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400"
                  >
                    {item}
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
