"use client";

import { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  children: ReactNode;
}

export function GlossaryTooltip({
  term,
  definition,
  children,
}: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span
        className={cn(
          "border-b border-dotted border-gray-400",
          "cursor-help transition-colors",
          "hover:border-gray-600 hover:text-gray-700"
        )}
      >
        {children}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 bottom-full mb-2",
            "z-50 w-max max-w-xs px-3 py-2 text-sm font-medium text-white",
            "bg-gray-900 rounded-md shadow-lg",
            "whitespace-normal break-words",
            "pointer-events-none"
          )}
        >
          <div className="font-semibold text-blue-300 mb-1">{term}</div>
          <div className="text-gray-100">{definition}</div>
          <div
            className={cn(
              "absolute top-full left-1/2 -translate-x-1/2",
              "border-4 border-transparent border-t-gray-900"
            )}
          />
        </div>
      )}
    </div>
  );
}
