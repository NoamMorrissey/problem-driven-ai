import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const content = {
  en: {
    title: "Programs",
    subtitle: "Workshops, e-books and training programs.",
    ebook: {
      title: "E-Book: Problem-Driven AI",
      description:
        "Download the free guide to building AI products that start from real problems. Includes the 5-level methodology, case studies and practical templates.",
      cta: "Get the e-book →",
    },
    workshops: {
      title: "Workshops",
      description:
        "Hands-on training for product teams, leadership and practitioners. Learn to apply the Problem-Driven AI methodology in your organization.",
      cta: "View workshops →",
    },
  },
  es: {
    title: "Programas",
    subtitle: "Workshops, e-books y programas formativos.",
    ebook: {
      title: "E-Book: Problem-Driven AI",
      description:
        "Descarga la guía gratuita para construir productos de IA que parten de problemas reales. Incluye la metodología de 5 niveles, casos de estudio y plantillas prácticas.",
      cta: "Obtener el e-book →",
    },
    workshops: {
      title: "Workshops",
      description:
        "Formación práctica para equipos de producto, dirección y profesionales. Aprende a aplicar la metodología Problem-Driven AI en tu organización.",
      cta: "Ver workshops →",
    },
  },
};

export default async function ProgramsPage() {
  const locale = await getLocale();
  const t = content[locale as "en" | "es"] || content.en;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-3 text-gray-600">{t.subtitle}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/programs/ebook"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400"
        >
          <span className="inline-block rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
            {locale === "es" ? "Gratuito" : "Free"}
          </span>
          <h2 className="mt-3 text-xl font-semibold group-hover:underline">
            {t.ebook.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{t.ebook.description}</p>
          <span className="mt-4 inline-block text-sm font-medium text-gray-900">
            {t.ebook.cta}
          </span>
        </Link>

        <Link
          href="/programs/workshops"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400"
        >
          <h2 className="mt-3 text-xl font-semibold group-hover:underline">
            {t.workshops.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.workshops.description}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-gray-900">
            {t.workshops.cta}
          </span>
        </Link>
      </div>
    </div>
  );
}
