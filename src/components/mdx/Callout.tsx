import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { type ReactNode } from "react";

const calloutConfig = {
  info: {
    icon: Info,
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-400 dark:border-blue-500",
    iconClass: "text-blue-500",
    titleClass: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-400 dark:border-amber-500",
    iconClass: "text-amber-500",
    titleClass: "text-amber-800 dark:text-amber-300",
  },
  tip: {
    icon: Lightbulb,
    bgClass: "bg-green-50 dark:bg-green-950/30",
    borderClass: "border-green-400 dark:border-green-500",
    iconClass: "text-green-500",
    titleClass: "text-green-800 dark:text-green-300",
  },
  danger: {
    icon: AlertCircle,
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-400 dark:border-red-500",
    iconClass: "text-red-500",
    titleClass: "text-red-800 dark:text-red-300",
  },
};

interface CalloutProps {
  type?: keyof typeof calloutConfig;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      className={`my-6 rounded-lg border-l-4 ${config.borderClass} ${config.bgClass} p-4`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-5 w-5 ${config.iconClass}`} />
        <span className={`font-semibold text-sm uppercase tracking-wide ${config.titleClass}`}>
          {title || defaultTitle}
        </span>
      </div>
      <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
