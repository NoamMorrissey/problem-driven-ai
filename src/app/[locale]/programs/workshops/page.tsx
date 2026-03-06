import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Workshops | Problem-Driven AI",
    description:
      "Hands-on workshops on building AI products with the Problem-Driven methodology.",
  };
}

const content = {
  en: {
    title: "Workshops",
    subtitle:
      "Hands-on training to apply the Problem-Driven AI methodology in your team",
    description:
      "Our workshops combine theory with practice. You'll work through real scenarios using the 5-level framework, identify genuine problems worth solving with AI, and leave with actionable artifacts for your own projects.",
    comingSoon: "Upcoming workshops will be announced here.",
    notifyTitle: "Get notified",
    notifyDescription:
      "Leave your email and we'll let you know when new workshops are scheduled.",
    back: "← Back to Programs",
    features: [
      {
        title: "For product teams",
        description:
          "Learn to evaluate AI opportunities without falling into the technology-first trap.",
      },
      {
        title: "For leadership",
        description:
          "Understand how to prioritize AI initiatives based on real business impact.",
      },
      {
        title: "For practitioners",
        description:
          "Get hands-on experience with the frameworks, templates and anti-patterns.",
      },
    ],
  },
  es: {
    title: "Workshops",
    subtitle:
      "Formación práctica para aplicar la metodología Problem-Driven AI en tu equipo",
    description:
      "Nuestros workshops combinan teoría y práctica. Trabajarás con escenarios reales usando el framework de 5 niveles, identificarás problemas genuinos que vale la pena resolver con IA, y te llevarás artefactos accionables para tus propios proyectos.",
    comingSoon: "Los próximos workshops se anunciarán aquí.",
    notifyTitle: "Recibe notificaciones",
    notifyDescription:
      "Deja tu email y te avisaremos cuando se programen nuevos workshops.",
    back: "← Volver a Programas",
    features: [
      {
        title: "Para equipos de producto",
        description:
          "Aprende a evaluar oportunidades de IA sin caer en la trampa de empezar por la tecnología.",
      },
      {
        title: "Para dirección",
        description:
          "Entiende cómo priorizar iniciativas de IA basándote en impacto de negocio real.",
      },
      {
        title: "Para profesionales",
        description:
          "Obtén experiencia práctica con los frameworks, plantillas y anti-patrones.",
      },
    ],
  },
};

export default async function WorkshopsPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-xl text-gray-600">{t.subtitle}</p>
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed">{t.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {t.features.map((feature, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 p-4"
          >
            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="text-gray-500">{t.comingSoon}</p>
        <div className="mx-auto mt-6 max-w-sm">
          <h2 className="text-lg font-semibold">{t.notifyTitle}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {t.notifyDescription}
          </p>
          <form
            action="/api/leads"
            method="POST"
            className="mt-4 flex gap-2"
          >
            <input type="hidden" name="source" value="workshop" />
            <input
              type="hidden"
              name="sourceDetail"
              value="workshops-notify"
            />
            <input type="hidden" name="locale" value={locale} />
            <input
              type="email"
              name="email"
              required
              placeholder={locale === "es" ? "Tu email" : "Your email"}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </form>
          <p className="mt-2 text-xs text-gray-400">
            {locale === "es"
              ? "La inscripción completa estará disponible próximamente."
              : "Full registration will be available soon."}
          </p>
        </div>
      </div>
    </div>
  );
}
