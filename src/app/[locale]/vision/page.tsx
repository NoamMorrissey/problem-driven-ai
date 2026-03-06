import { getLocale } from "next-intl/server";
import { listContent } from "@/lib/mdx/get-content";
import { Link } from "@/i18n/navigation";

export default async function VisionPage() {
  const locale = await getLocale();
  const pages = listContent(locale, "vision");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Vision</h1>
      <p className="mt-3 text-gray-600">
        {locale === "es"
          ? "La visión y los fundamentos de Problem-Driven AI."
          : "The vision and foundations of Problem-Driven AI."}
      </p>

      {pages.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {pages.map((page) => (
            <li key={page.filePath}>
              <Link
                href={`/vision/${page.meta.slug || ""}`}
                className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <h2 className="font-semibold">{page.meta.title}</h2>
                {page.meta.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {page.meta.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-gray-400 italic">
          Content will be available after migration.
        </p>
      )}
    </div>
  );
}
