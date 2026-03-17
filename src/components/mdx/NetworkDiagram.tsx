"use client";

import { useState } from "react";

interface DiagramNode {
  id: string;
  label: string;
  type: "firewall" | "hypervisor" | "server" | "switch" | "cloud" | "client";
  x: number;
  y: number;
}

interface DiagramLink {
  from: string;
  to: string;
  label?: string;
}

interface NetworkDiagramProps {
  nodes: DiagramNode[];
  links: DiagramLink[];
  title?: string;
}

const nodeColors: Record<string, { fill: string; stroke: string; text: string }> = {
  firewall: { fill: "#fef2f2", stroke: "#ef4444", text: "#dc2626" },
  hypervisor: { fill: "#faf5ff", stroke: "#a855f7", text: "#9333ea" },
  server: { fill: "#eff6ff", stroke: "#3b82f6", text: "#2563eb" },
  switch: { fill: "#f0fdf4", stroke: "#22c55e", text: "#16a34a" },
  cloud: { fill: "#fff7ed", stroke: "#f97316", text: "#ea580c" },
  client: { fill: "#f0f9ff", stroke: "#06b6d4", text: "#0891b2" },
};

export function NetworkDiagram({ nodes, links, title }: NetworkDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const padding = 60;
  const nodeWidth = 120;
  const nodeHeight = 50;

  const maxX = Math.max(...nodes.map((n) => n.x)) + nodeWidth + padding * 2;
  const maxY = Math.max(...nodes.map((n) => n.y)) + nodeHeight + padding * 2;

  const getNodeCenter = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return { x: 0, y: 0 };
    return { x: node.x + nodeWidth / 2, y: node.y + nodeHeight / 2 };
  };

  const isLinkHighlighted = (link: DiagramLink) => {
    return hoveredNode === link.from || hoveredNode === link.to;
  };

  return (
    <div className="my-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden">
      {title && (
        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-2 bg-gray-50 dark:bg-gray-900">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {title}
          </span>
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <svg
          viewBox={`0 0 ${maxX} ${maxY}`}
          className="w-full"
          style={{ minWidth: "400px", maxHeight: "500px" }}
        >
          {/* Links */}
          {links.map((link, i) => {
            const from = getNodeCenter(link.from);
            const to = getNodeCenter(link.to);
            const highlighted = isLinkHighlighted(link);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            return (
              <g key={i}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={highlighted ? "#06b6d4" : "#6b7280"}
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  strokeDasharray={highlighted ? "none" : "none"}
                  className="transition-all duration-200"
                />
                {link.label && (
                  <text
                    x={midX}
                    y={midY - 8}
                    textAnchor="middle"
                    className="fill-gray-500 dark:fill-gray-400"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {link.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = nodeColors[node.type] || nodeColors.server;
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={8}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-200"
                  filter={isHovered ? "url(#glow)" : undefined}
                />
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 - 6}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize="13"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
                <text
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 + 12}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {node.type}
                </text>
              </g>
            );
          })}

          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
