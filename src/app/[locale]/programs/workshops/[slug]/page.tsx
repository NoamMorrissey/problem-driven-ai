import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/date";
import { WorkshopRegistrationForm } from "@/components/content/workshop-registration-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("workshops")
      .select("title, description")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (data) {
      return {
        title: `${data.title} | Problem-Driven AI`,
        description: data.description || undefined,
      };
    }
  } catch {
    // fallback
  }
  return { title: "Workshop | Problem-Driven AI" };
}

const i18n = {
  en: {
    back: "← Back to Workshops",
    date: "Date",
    location: "Location",
    duration: "Duration",
    level: "Level",
    capacity: "Capacity",
    price: "Price",
    free: "Free",
    hours: "hours",
    spotsLeft: "spots left",
    full: "This workshop is full",
    register: "Register",
    photos: "Photos",
    registered: "registered",
  },
  es: {
    back: "← Volver a Workshops",
    date: "Fecha",
    location: "Lugar",
    duration: "Duración",
    level: "Nivel",
    capacity: "Capacidad",
    price: "Precio",
    free: "Gratuito",
    hours: "horas",
    spotsLeft: "plazas disponibles",
    full: "Este workshop está completo",
    register: "Inscribirse",
    photos: "Fotos",
    registered: "inscritos",
  },
};

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = i18n[locale as "en" | "es"] || i18n.en;

  const supabase = await createClient();

  const { data: workshop } = await supabase
    .from("workshops")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!workshop) {
    notFound();
  }

  // Get registration count
  const { count: registrationCount } = await supabase
    .from("workshop_registrations")
    .select("id", { count: "exact", head: true })
    .eq("workshop_id", workshop.id);

  // Get photos
  const { data: photos } = await supabase
    .from("workshop_photos")
    .select("*")
    .eq("workshop_id", workshop.id)
    .order("sort_order", { ascending: true });

  const regCount = registrationCount || 0;
  const spotsLeft = workshop.max_capacity
    ? workshop.max_capacity - regCount
    : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;
  const isPast =
    workshop.workshop_date &&
    new Date(workshop.workshop_date) < new Date();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/programs/workshops"
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        {t.back}
      </Link>

      <div className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {workshop.title}
        </h1>
        {workshop.description && (
          <p className="mt-3 text-xl text-gray-600">{workshop.description}</p>
        )}
      </div>

      {/* Details grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {workshop.workshop_date && (
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {t.date}
            </p>
            <p className="mt-1 font-semibold">
              {formatDate(workshop.workshop_date)}
            </p>
          </div>
        )}
        {workshop.location && (
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {t.location}
            </p>
            <p className="mt-1 font-semibold">{workshop.location}</p>
          </div>
        )}
        {workshop.duration_hours && (
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {t.duration}
            </p>
            <p className="mt-1 font-semibold">
              {workshop.duration_hours} {t.hours}
            </p>
          </div>
        )}
        {workshop.level && (
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {t.level}
            </p>
            <p className="mt-1 font-semibold capitalize">{workshop.level}</p>
          </div>
        )}
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {t.price}
          </p>
          <p className="mt-1 font-semibold">
            {workshop.price === 0 || workshop.price === null
              ? t.free
              : `${workshop.price}€`}
          </p>
        </div>
        {workshop.max_capacity && (
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {t.capacity}
            </p>
            <p className="mt-1 font-semibold">
              {regCount} / {workshop.max_capacity}{" "}
              <span className="text-sm font-normal text-gray-500">
                {t.registered}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      {workshop.content && (
        <div className="mt-8 prose prose-gray max-w-none">
          {workshop.content.split("\n").map((paragraph: string, i: number) =>
            paragraph.trim() ? (
              <p key={i}>{paragraph}</p>
            ) : null
          )}
        </div>
      )}

      {/* Photos */}
      {photos && photos.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold">{t.photos}</h2>
          <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-lg">
                <img
                  src={photo.image_url}
                  alt={photo.caption || workshop.title}
                  className="h-48 w-full object-cover"
                />
                {photo.caption && (
                  <p className="mt-1 text-xs text-gray-500">{photo.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registration */}
      {!isPast && (
        <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold">{t.register}</h2>
          {isFull ? (
            <p className="mt-2 text-sm text-red-600 font-medium">{t.full}</p>
          ) : (
            <>
              {spotsLeft !== null && (
                <p className="mt-1 text-sm text-gray-500">
                  {spotsLeft} {t.spotsLeft}
                </p>
              )}
              <WorkshopRegistrationForm
                workshopId={workshop.id}
                className="mt-4"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
