import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/mdx/get-content";
import { MDXContent } from "@/lib/mdx/mdx-remote";

interface ContentPageProps {
  section: string;
  slug: string[];
}

export async function ContentPageRenderer({ section, slug }: ContentPageProps) {
  const locale = await getLocale();
  const slugPath = `${section}/${slug.join("/")}`;
  const page = getContent(locale, slugPath);

  if (!page) notFound();

  return (
    <article>
      {!page.meta.hide_title && (
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {page.meta.title}
          </h1>
          {page.meta.description && (
            <p className="mt-3 text-lg text-gray-600">
              {page.meta.description}
            </p>
          )}
          {page.meta.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {page.meta.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      )}

      <MDXContent content={page.content} />
    </article>
  );
}
