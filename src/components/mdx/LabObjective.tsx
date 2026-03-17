import { Target } from "lucide-react";
import { type ReactNode } from "react";

interface LabObjectiveProps {
  children: ReactNode;
}

export function LabObjective({ children }: LabObjectiveProps) {
  return (
    <div className="my-6 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-5 w-5 text-cyan-500" />
        <span className="font-semibold text-cyan-700 dark:text-cyan-300 uppercase text-sm tracking-wide">
          Lab Objective
        </span>
      </div>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
