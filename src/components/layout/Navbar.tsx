"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/tags", label: "Tags" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
        >
          TillyNet
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: theme toggle + mobile menu button */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 hidden dark:block" />
            <Moon className="h-5 w-5 block dark:hidden" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md md:hidden">
          <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
