import { Terminal } from "lucide-react";
import { type ReactNode } from "react";

interface TerminalBlockProps {
  title?: string;
  children: ReactNode;
}

export function TerminalBlock({ title, children }: TerminalBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-700 bg-gray-950 shadow-lg">
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <Terminal className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-400 font-mono">
            {title || "terminal"}
          </span>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-green-400">
        {children}
      </pre>
    </div>
  );
}
