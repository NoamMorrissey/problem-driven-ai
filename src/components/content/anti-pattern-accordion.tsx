"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface AntiPatternItem {
  title: string;
  description: string;
  consequence: string;
}

interface AntiPatternAccordionProps {
  items: AntiPatternItem[];
}

export function AntiPatternAccordion({
  items,
}: AntiPatternAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "border-2 rounded-lg overflow-hidden bg-white",
            "border-red-200 hover:border-red-300 transition-colors"
          )}
        >
          <button
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            className={cn(
              "w-full px-6 py-4 text-left font-medium",
              "flex items-start justify-between gap-4",
              "hover:bg-red-50 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-inset"
            )}
          >
            <div className="flex items-start gap-3 flex-grow">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-900">{item.title}</span>
            </div>
            <svg
              className={cn(
                "w-5 h-5 text-gray-600 transition-transform duration-200 flex-shrink-0 mt-0.5",
                expandedIndex === index && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {expandedIndex === index && (
            <div className="px-6 py-4 bg-red-50 border-t border-red-200">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                    Anti-Pattern
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 text-sm uppercase tracking-wide mb-1">
                    Consequence
                  </h4>
                  <p className="text-red-800 text-sm leading-relaxed">
                    {item.consequence}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
