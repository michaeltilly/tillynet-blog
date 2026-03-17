import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-cyan-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-400 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-cyan-500 transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
