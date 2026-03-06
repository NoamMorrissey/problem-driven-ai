import { getLocale } from "next-intl/server";
import { listContent } from "@/lib/mdx/get-content";
import { Link } from "@/i18n/navigation";

export default async function PlanningPage() {
  const locale = await getLocale();
  const pages = listContent(locale, "planning");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {locale === "es" ? "Planificación" : "Planning"}
      </h1>
      <p className="mt-3 text-gray-600">
        {locale === "es"
          ? "Guías paso a paso, artefactos, anti-patrones y gate reviews por fase."
          : "Step-by-step guides, artifacts, anti-patterns and gate reviews per phase."}
      </p>

      {pages.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {pages
            .filter((p) => p.filePath.endsWith("index.mdx"))
            .map((page) => (
              <li key={page.filePath}>
                <Link
                  href={`/planning/${page.meta.slug || ""}`}
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
