"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background topology animation */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.4; r: 4; }
              50% { opacity: 1; r: 6; }
            }
            @keyframes drawLine {
              from { stroke-dashoffset: 200; }
              to { stroke-dashoffset: 0; }
            }
            .node { animation: pulse 3s ease-in-out infinite; }
            .node:nth-child(2n) { animation-delay: 0.5s; }
            .node:nth-child(3n) { animation-delay: 1s; }
            .node:nth-child(4n) { animation-delay: 1.5s; }
            .link {
              stroke-dasharray: 200;
              animation: drawLine 2s ease-out forwards;
            }
            .link:nth-child(2n) { animation-delay: 0.3s; }
            .link:nth-child(3n) { animation-delay: 0.6s; }
          `}</style>

          {/* Network links */}
          <line className="link" x1="100" y1="200" x2="250" y2="120" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="100" y1="200" x2="250" y2="280" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="250" y1="120" x2="400" y2="180" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="250" y1="280" x2="400" y2="180" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="400" y1="180" x2="550" y2="100" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="400" y1="180" x2="550" y2="260" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="550" y1="100" x2="700" y2="200" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="550" y1="260" x2="700" y2="200" stroke="rgb(6,182,212)" strokeWidth="1.5" />
          <line className="link" x1="250" y1="120" x2="400" y2="60" stroke="rgb(6,182,212)" strokeWidth="1" />
          <line className="link" x1="400" y1="60" x2="550" y2="100" stroke="rgb(6,182,212)" strokeWidth="1" />
          <line className="link" x1="250" y1="280" x2="400" y2="340" stroke="rgb(6,182,212)" strokeWidth="1" />
          <line className="link" x1="400" y1="340" x2="550" y2="260" stroke="rgb(6,182,212)" strokeWidth="1" />

          {/* Network nodes */}
          <circle className="node" cx="100" cy="200" fill="rgb(6,182,212)" />
          <circle className="node" cx="250" cy="120" fill="rgb(6,182,212)" />
          <circle className="node" cx="250" cy="280" fill="rgb(6,182,212)" />
          <circle className="node" cx="400" cy="180" fill="rgb(6,182,212)" />
          <circle className="node" cx="400" cy="60" fill="rgb(6,182,212)" />
          <circle className="node" cx="400" cy="340" fill="rgb(6,182,212)" />
          <circle className="node" cx="550" cy="100" fill="rgb(6,182,212)" />
          <circle className="node" cx="550" cy="260" fill="rgb(6,182,212)" />
          <circle className="node" cx="700" cy="200" fill="rgb(6,182,212)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Michael Tillman
        </h1>
        <p className="mt-4 text-xl text-cyan-600 dark:text-cyan-400 font-medium">
          Network Engineer &middot; Cloud Architect &middot; Home Labber
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Building enterprise-grade infrastructure from the ground up. Documenting every VLAN,
          every firewall rule, and every lesson learned along the way.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 transition-all hover:shadow-cyan-400/30"
          >
            Explore Projects
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all"
          >
            Read the Blog &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
