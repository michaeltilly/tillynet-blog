"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (typeof node === "object" && "props" in node) {
      return getTextContent(node.props.children);
    }
    return "";
  };

  const handleCopy = async () => {
    const text = getTextContent(children);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.replace("language-", "") || "";

  return (
    <div className="group relative my-4">
      {language && (
        <div className="absolute left-4 top-0 -translate-y-full">
          <span className="rounded-t-md bg-gray-800 px-3 py-1 text-xs font-mono text-gray-400">
            {language}
          </span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md bg-gray-800 p-1.5 text-gray-400 opacity-0 transition-opacity hover:bg-gray-700 hover:text-white group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950 p-4 text-sm leading-relaxed">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
