import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ProgramsPage() {
  const locale = await getLocale();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {locale === "es" ? "Programas" : "Programs"}
      </h1>
      <p className="mt-3 text-gray-600">
        {locale === "es"
          ? "Workshops, e-books y programas formativos."
          : "Workshops, e-books and training programs."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold">Workshops</h2>
          <p className="mt-2 text-gray-500">
            {locale === "es" ? "Próximamente" : "Coming soon"}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold">E-Book</h2>
          <p className="mt-2 text-gray-500">
            {locale === "es" ? "Próximamente" : "Coming soon"}
          </p>
        </div>
      </div>
    </div>
  );
}
