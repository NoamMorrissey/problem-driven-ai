import Link from "next/link";
import WorkshopForm from "@/components/admin/workshop-form";

export const metadata = {
  title: "Create Workshop - Admin",
  description: "Create a new workshop",
};

export default function NewWorkshopPage() {
  return (
    <div>
      <Link
        href="/admin/workshops"
        className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-8 inline-block"
      >
        ← Back to Workshops
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Workshop</h1>
        <p className="text-gray-600 mt-1">Add a new workshop to your catalog</p>
      </div>

      <WorkshopForm mode="create" />
    </div>
  );
}
