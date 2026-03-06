import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils/date";
import WorkshopForm from "@/components/admin/workshop-form";
import WorkshopRegistrationsTable from "@/components/admin/workshop-registrations-table";
import DeleteWorkshopButton from "@/components/admin/delete-workshop-button";

interface WorkshopRegistration {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  created_at: string;
}

interface Workshop {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  workshop_date: string | null;
  location: string | null;
  max_capacity: number | null;
  price: number | null;
  duration_hours: number | null;
  level: string | null;
  status: string;
  language: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Workshop Details",
  description: "View and edit workshop details",
};

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch workshop
  const { data: workshop, error: workshopError } = await supabase
    .from("workshops")
    .select("*")
    .eq("id", id)
    .single();

  if (workshopError || !workshop) {
    return (
      <div>
        <Link
          href="/admin/workshops"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-8 inline-block"
        >
          ← Back to Workshops
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-900">
          Workshop not found
        </div>
      </div>
    );
  }

  // Fetch registrations
  const { data: registrations } = await supabase
    .from("workshop_registrations")
    .select("*")
    .eq("workshop_id", id)
    .order("created_at", { ascending: false });

  // Fetch photos
  const { data: photos } = await supabase
    .from("workshop_photos")
    .select("*")
    .eq("workshop_id", id)
    .order("sort_order", { ascending: true });

  const workshopData = workshop as Workshop;
  const registrationsData = (registrations || []) as WorkshopRegistration[];

  return (
    <div>
      <Link
        href="/admin/workshops"
        className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-8 inline-block"
      >
        ← Back to Workshops
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{workshopData.title}</h1>
          <p className="text-gray-600 mt-1">
            {workshopData.workshop_date
              ? formatDateTime(workshopData.workshop_date)
              : "No date scheduled"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            workshopData.status === "published"
              ? "bg-green-100 text-green-900"
              : workshopData.status === "archived"
              ? "bg-red-100 text-red-900"
              : "bg-gray-100 text-gray-900"
          }`}>
            {workshopData.status}
          </div>
        </div>
      </div>

      {/* Tabs - Edit Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Workshop</h2>
        <WorkshopForm mode="edit" initialData={workshopData} />
      </div>

      {/* Registrations Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Registrations ({registrationsData.length})
            </h2>
          </div>
          <a
            href={`/api/admin/workshops/${id}/registrations/export`}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            download
          >
            Export CSV
          </a>
        </div>

        <WorkshopRegistrationsTable registrations={registrationsData} />
      </div>

      {/* Photos Section */}
      {(photos || []).length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <img
                    src={photo.image_url}
                    alt={photo.caption || "Workshop photo"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {photo.caption && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Danger Zone</h2>
        <DeleteWorkshopButton workshopId={id} workshopTitle={workshopData.title} />
      </div>
    </div>
  );
}
