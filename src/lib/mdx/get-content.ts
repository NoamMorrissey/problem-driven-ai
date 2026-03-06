import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ContentMeta {
  title: string;
  description?: string;
  slug?: string;
  sidebar_position?: number;
  sidebar_label?: string;
  tags?: string[];
  hide_title?: boolean;
  [key: string]: unknown;
}

export interface ContentPage {
  meta: ContentMeta;
  content: string;
  filePath: string;
}

/**
 * Get a single MDX page by locale and slug path.
 * Example: getContent("en", "methodology/principles/the-problem-is-sacred")
 */
export function getContent(
  locale: string,
  slugPath: string
): ContentPage | null {
  const basePath = path.join(CONTENT_DIR, locale, slugPath);

  // Try exact file match first, then index
  const candidates = [
    `${basePath}.mdx`,
    `${basePath}.md`,
    path.join(basePath, "index.mdx"),
    path.join(basePath, "index.md"),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: data as ContentMeta,
        content,
        filePath,
      };
    }
  }

  return null;
}

/**
 * List all content pages in a section.
 * Example: listContent("en", "methodology/principles")
 */
export function listContent(
  locale: string,
  sectionPath: string
): ContentPage[] {
  const dirPath = path.join(CONTENT_DIR, locale, sectionPath);

  if (!fs.existsSync(dirPath)) return [];

  const pages: ContentPage[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(raw);
        pages.push({
          meta: data as ContentMeta,
          content,
          filePath: fullPath,
        });
      }
    }
  }

  walk(dirPath);

  return pages.sort(
    (a, b) => (a.meta.sidebar_position ?? 99) - (b.meta.sidebar_position ?? 99)
  );
}

/**
 * Get all slug paths for a section (for generateStaticParams).
 * Returns relative paths without locale prefix.
 */
export function getAllSlugs(locale: string, sectionPath: string): string[][] {
  const dirPath = path.join(CONTENT_DIR, locale, sectionPath);

  if (!fs.existsSync(dirPath)) return [];

  const slugs: string[][] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        const relativePath = path.relative(dirPath, fullPath);
        const slugParts = relativePath
          .replace(/\.mdx?$/, "")
          .replace(/\/index$/, "")
          .split("/")
          .filter(Boolean);

        if (slugParts.length > 0) {
          slugs.push(slugParts);
        }
      }
    }
  }

  walk(dirPath);
  return slugs;
}
