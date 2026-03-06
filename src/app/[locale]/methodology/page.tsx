import { getLocale } from "next-intl/server";
import { listContent } from "@/lib/mdx/get-content";
import { Link } from "@/i18n/navigation";

export default async function MethodologyPage() {
  const locale = await getLocale();
  const principles = listContent(locale, "methodology/principles");
  const phases = listContent(locale, "methodology/phases");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {locale === "es" ? "Metodología" : "Methodology"}
      </h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">
          {locale === "es" ? "Principios" : "Principles"}
        </h2>
        {principles.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {principles
              .filter((p) => !p.filePath.endsWith("index.mdx"))
              .map((page) => (
                <li key={page.filePath}>
                  <Link
                    href={`/methodology/principles/${page.meta.slug || ""}`}
                    className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <h3 className="font-medium">{page.meta.title}</h3>
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
          <p className="mt-4 text-gray-400 italic">
            Content will be available after migration.
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          {locale === "es" ? "Fases" : "Phases"}
        </h2>
        {phases.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {phases
              .filter((p) => p.filePath.endsWith("index.mdx"))
              .map((page) => (
                <li key={page.filePath}>
                  <Link
                    href={`/methodology/phases/${page.meta.slug || ""}`}
                    className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <h3 className="font-medium">{page.meta.title}</h3>
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
          <p className="mt-4 text-gray-400 italic">
            Content will be available after migration.
          </p>
        )}
      </section>
    </div>
  );
}
