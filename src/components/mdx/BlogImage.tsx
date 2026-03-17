"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface BlogImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function BlogImage({ src, alt = "", caption }: BlogImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <figure className="my-6">
        <button
          onClick={() => setIsOpen(true)}
          className="block w-full cursor-zoom-in"
        >
          <img
            src={src}
            alt={alt}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow"
            loading="lazy"
          />
        </button>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
