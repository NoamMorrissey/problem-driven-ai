"use client";

import { useEffect, useState } from "react";

/**
 * Simple MDX content renderer.
 * For Phase 1, renders raw markdown as HTML paragraphs.
 * Will be replaced with proper MDX compilation in Sub-rama 3 refinement.
 */
export function MDXContent({ content }: { content: string }) {
  // Strip MDX imports and component usage for now,
  // render as plain text with basic formatting
  const cleanContent = content
    .replace(/^import\s+.*$/gm, "")
    .replace(/<[A-Z][^>]*\/>/g, "") // self-closing components
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "") // component blocks
    .trim();

  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      {cleanContent.split("\n\n").map((paragraph, i) => {
        if (paragraph.startsWith("# ")) {
          return (
            <h1 key={i} className="text-3xl font-bold mt-8 mb-4">
              {paragraph.slice(2)}
            </h1>
          );
        }
        if (paragraph.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl font-semibold mt-6 mb-3">
              {paragraph.slice(3)}
            </h2>
          );
        }
        if (paragraph.startsWith("### ")) {
          return (
            <h3 key={i} className="text-xl font-semibold mt-4 mb-2">
              {paragraph.slice(4)}
            </h3>
          );
        }
        if (paragraph.startsWith("---")) {
          return <hr key={i} className="my-8" />;
        }
        if (paragraph.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-gray-300 pl-4 italic my-4"
            >
              {paragraph.slice(2)}
            </blockquote>
          );
        }
        if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
          const items = paragraph.split("\n").filter((l) => l.trim());
          return (
            <ul key={i} className="list-disc pl-6 my-4">
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^[-*]\s+/, "")}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="my-3 leading-relaxed">
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
