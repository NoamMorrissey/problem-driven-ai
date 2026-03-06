"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface ArtifactItem {
  title: string;
  description: string;
  format?: string;
}

interface ArtifactAccordionProps {
  items: ArtifactItem[];
}

export function ArtifactAccordion({ items }: ArtifactAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "border-2 rounded-lg overflow-hidden bg-white",
            "border-teal-200 hover:border-teal-300 transition-colors"
          )}
        >
          <button
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            className={cn(
              "w-full px-6 py-4 text-left font-medium",
              "flex items-start justify-between gap-4",
              "hover:bg-teal-50 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-inset"
            )}
          >
            <div className="flex items-start gap-3 flex-grow">
              <svg
                className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
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
            <div className="px-6 py-4 bg-teal-50 border-t border-teal-200">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.format && (
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                      Format
                    </h4>
                    <p className="text-teal-700 text-sm font-medium">
                      {item.format}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
