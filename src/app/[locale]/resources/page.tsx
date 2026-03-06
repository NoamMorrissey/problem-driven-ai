import { getLocale } from "next-intl/server";
import { listContent } from "@/lib/mdx/get-content";
import { Link } from "@/i18n/navigation";

export default async function ResourcesPage() {
  const locale = await getLocale();
  const pages = listContent(locale, "resources");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {locale === "es" ? "Recursos" : "Resources"}
      </h1>

      {pages.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {pages.map((page) => (
            <li key={page.filePath}>
              <Link
                href={`/resources/${page.meta.slug || ""}`}
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
