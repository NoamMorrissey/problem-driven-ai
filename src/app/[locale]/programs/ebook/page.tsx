import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LeadCaptureForm } from "@/components/content/lead-capture-form";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "E-Book: Problem-Driven AI",
    description:
      "Download the free e-book on building AI products starting from real problems.",
  };
}

const content = {
  en: {
    badge: "Free E-Book",
    title: "Problem-Driven AI",
    subtitle: "A practical guide to building AI products that solve real problems",
    description:
      "Stop building AI for the sake of AI. This e-book walks you through the 5-level methodology for identifying genuine problems and designing AI solutions that deliver measurable value.",
    highlights: [
      "The 5-level methodology explained step by step",
      "Real-world case studies and anti-patterns",
      "Templates and frameworks you can use immediately",
      "Principles for evaluating AI product-market fit",
    ],
    highlightsTitle: "What you'll learn",
    formTitle: "Get your free copy",
    formDescription:
      "Enter your details below and we'll send the e-book straight to your inbox.",
    back: "← Back to Programs",
  },
  es: {
    badge: "E-Book Gratuito",
    title: "Problem-Driven AI",
    subtitle:
      "Una guía práctica para construir productos de IA que resuelven problemas reales",
    description:
      "Deja de construir IA por el simple hecho de usar IA. Este e-book te guía a través de la metodología de 5 niveles para identificar problemas genuinos y diseñar soluciones de IA que aporten valor medible.",
    highlights: [
      "La metodología de 5 niveles explicada paso a paso",
      "Casos de estudio reales y anti-patrones",
      "Plantillas y frameworks que puedes usar de inmediato",
      "Principios para evaluar el product-market fit con IA",
    ],
    highlightsTitle: "Qué aprenderás",
    formTitle: "Obtén tu copia gratuita",
    formDescription:
      "Introduce tus datos y te enviaremos el e-book directamente a tu correo.",
    back: "← Volver a Programas",
  },
};

export default async function EbookPage() {
  const locale = await getLocale();
  const t = content[locale as "en" | "es"] || content.en;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/programs"
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        {t.back}
      </Link>

      <div className="mt-6">
        <span className="inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          {t.badge}
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-xl text-gray-600">{t.subtitle}</p>
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed">{t.description}</p>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">{t.highlightsTitle}</h2>
        <ul className="mt-3 space-y-2">
          {t.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-lg font-semibold">{t.formTitle}</h2>
        <p className="mt-1 text-sm text-gray-500">{t.formDescription}</p>
        <LeadCaptureForm
          source="ebook"
          sourceDetail="ebook-landing-page"
          className="mt-4"
        />
      </div>
    </div>
  );
}
