import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">TillyNet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Building enterprise-grade infrastructure from the ground up.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/michaeltilly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/michaeltillman7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TillyNet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
