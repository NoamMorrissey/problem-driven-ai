import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/date";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Workshops | Problem-Driven AI",
    description:
      "Hands-on workshops on building AI products with the Problem-Driven methodology.",
  };
}

const i18n = {
  en: {
    title: "Workshops",
    subtitle:
      "Hands-on training to apply the Problem-Driven AI methodology in your team",
    description:
      "Our workshops combine theory with practice. You'll work through real scenarios using the 5-level framework, identify genuine problems worth solving with AI, and leave with actionable artifacts for your own projects.",
    noWorkshops: "No upcoming workshops scheduled yet.",
    notifyTitle: "Get notified",
    notifyDescription:
      "Leave your email and we'll let you know when new workshops are scheduled.",
    back: "← Back to Programs",
    upcoming: "Upcoming Workshops",
    past: "Past Workshops",
    free: "Free",
    spotsLeft: "spots left",
    full: "Full",
    viewDetails: "View details →",
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
    noWorkshops: "Aún no hay workshops programados.",
    notifyTitle: "Recibe notificaciones",
    notifyDescription:
      "Deja tu email y te avisaremos cuando se programen nuevos workshops.",
    back: "← Volver a Programas",
    upcoming: "Próximos Workshops",
    past: "Workshops Anteriores",
    free: "Gratuito",
    spotsLeft: "plazas disponibles",
    full: "Completo",
    viewDetails: "Ver detalles →",
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

interface Workshop {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  workshop_date: string | null;
  location: string | null;
  max_capacity: number | null;
  price: number | null;
  duration_hours: number | null;
  level: string | null;
  language: string | null;
  registration_count: number;
}

export default async function WorkshopsPage() {
  const locale = await getLocale();
  const t = i18n[locale as "en" | "es"] || i18n.en;

  let workshops: Workshop[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("workshops")
      .select("id, title, slug, description, workshop_date, location, max_capacity, price, duration_hours, level, language")
      .eq("status", "published")
      .order("workshop_date", { ascending: true });

    if (data) {
      // Get registration counts
      const workshopIds = data.map((w) => w.id);
      const { data: regCounts } = await supabase
        .from("workshop_registrations")
        .select("workshop_id")
        .in("workshop_id", workshopIds);

      const countMap: Record<string, number> = {};
      regCounts?.forEach((r) => {
        countMap[r.workshop_id] = (countMap[r.workshop_id] || 0) + 1;
      });

      workshops = data.map((w) => ({
        ...w,
        registration_count: countMap[w.id] || 0,
      }));
    }
  } catch {
    // Supabase not configured yet — show empty state
  }

  const now = new Date().toISOString();
  const upcoming = workshops.filter(
    (w) => !w.workshop_date || w.workshop_date >= now
  );
  const past = workshops.filter(
    (w) => w.workshop_date && w.workshop_date < now
  );

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
          <div key={i} className="rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Workshops */}
      {upcoming.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">{t.upcoming}</h2>
          <div className="mt-4 space-y-4">
            {upcoming.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                locale={locale}
                t={t}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {upcoming.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">{t.noWorkshops}</p>
          <div className="mx-auto mt-6 max-w-sm">
            <h2 className="text-lg font-semibold">{t.notifyTitle}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {t.notifyDescription}
            </p>
          </div>
        </div>
      )}

      {/* Past workshops */}
      {past.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-400">{t.past}</h2>
          <div className="mt-4 space-y-4 opacity-60">
            {past.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                locale={locale}
                t={t}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkshopCard({
  workshop,
  locale,
  t,
}: {
  workshop: Workshop;
  locale: string;
  t: (typeof i18n)["en"];
}) {
  const spotsLeft = workshop.max_capacity
    ? workshop.max_capacity - workshop.registration_count
    : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <Link
      href={`/programs/workshops/${workshop.slug}`}
      className="group block rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold group-hover:underline">
            {workshop.title}
          </h3>
          {workshop.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {workshop.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
            {workshop.workshop_date && (
              <span>{formatDate(workshop.workshop_date)}</span>
            )}
            {workshop.location && <span>{workshop.location}</span>}
            {workshop.duration_hours && (
              <span>
                {workshop.duration_hours}h
              </span>
            )}
            {workshop.level && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 capitalize">
                {workshop.level}
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          {workshop.price === 0 || workshop.price === null ? (
            <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              {t.free}
            </span>
          ) : (
            <span className="text-lg font-semibold">
              {workshop.price}€
            </span>
          )}
          {spotsLeft !== null && (
            <p className="mt-1 text-xs text-gray-500">
              {isFull ? (
                <span className="text-red-600 font-medium">{t.full}</span>
              ) : (
                `${spotsLeft} ${t.spotsLeft}`
              )}
            </p>
          )}
        </div>
      </div>
      <span className="mt-3 inline-block text-sm font-medium text-gray-900">
        {t.viewDetails}
      </span>
    </Link>
  );
}
