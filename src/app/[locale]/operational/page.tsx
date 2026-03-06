import { getLocale } from "next-intl/server";
import { listContent } from "@/lib/mdx/get-content";
import { Link } from "@/i18n/navigation";

const subsections = ["problem", "solution", "context", "ai-build", "market"];

export default async function OperationalPage() {
  const locale = await getLocale();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {locale === "es" ? "Operativa" : "Operational"}
      </h1>
      <p className="mt-3 text-gray-600">
        {locale === "es"
          ? "Técnicas, herramientas y conceptos operativos por área."
          : "Techniques, tools and operational concepts by area."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {subsections.map((sub) => {
          const pages = listContent(locale, `operational/${sub}`);
          return (
            <Link
              key={sub}
              href={`/operational/${sub}`}
              className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              <h2 className="font-semibold capitalize">{sub.replace("-", " ")}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {pages.length > 0
                  ? `${pages.length} pages`
                  : "Coming soon"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
