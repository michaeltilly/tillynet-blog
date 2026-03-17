"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");

  const headings: TOCItem[] = content
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 2;
      const text = line.replace(/^#+\s+/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level };
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
        On This Page
      </h4>
      <ul className="space-y-1 text-sm border-l border-gray-200 dark:border-gray-800">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 transition-colors border-l-2 -ml-px ${
                heading.level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === heading.id
                  ? "border-cyan-500 text-cyan-500 font-medium"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
