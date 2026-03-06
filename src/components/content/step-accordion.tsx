"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface StepItem {
  title: string;
  content: string;
  step?: number;
}

interface StepAccordionProps {
  items: StepItem[];
}

export function StepAccordion({ items }: StepAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors"
        >
          <button
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            className={cn(
              "w-full px-6 py-4 text-left font-medium",
              "flex items-center justify-between",
              "hover:bg-gray-50 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset"
            )}
          >
            <div className="flex items-center gap-4">
              {item.step !== undefined && (
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                  {item.step}
                </span>
              )}
              <span className="text-gray-900">{item.title}</span>
            </div>
            <svg
              className={cn(
                "w-5 h-5 text-gray-600 transition-transform duration-200",
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
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
