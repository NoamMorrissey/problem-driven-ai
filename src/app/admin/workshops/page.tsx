import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils/date";

interface Workshop {
  id: string;
  title: string;
  slug: string;
  workshop_date: string | null;
  status: string;
  max_capacity: number | null;
  workshop_registrations: Array<{ id: string }>;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: "Workshops - Admin",
  description: "Manage workshops",
};

const PAGE_SIZE = 10;
const STATUSES = ["draft", "published", "archived"] as const;

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-900",
  published: "bg-green-100 text-green-900",
  archived: "bg-red-100 text-red-900",
};

export default async function WorkshopsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const status = params.status || "";
  const pageNum = parseInt(params.page || "1", 10);

  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("workshops")
    .select("*, workshop_registrations(count)", { count: "exact" })
    .order("created_at", { ascending: false });

  // Apply filters
  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  // Get total count
  const { data: allWorkshops, count: totalCount } = await query;

  if (!allWorkshops) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workshops</h1>
        <p className="text-gray-600 mb-8">Error loading workshops</p>
      </div>
    );
  }

  const totalPages = Math.ceil((totalCount || 0) / PAGE_SIZE);

  // Apply pagination
  const paginatedQuery = supabase
    .from("workshops")
    .select("*, workshop_registrations(count)")
    .order("created_at", { ascending: false });

  if (search) {
    paginatedQuery.ilike("title", `%${search}%`);
  }

  if (status && status !== "all") {
    paginatedQuery.eq("status", status);
  }

  const offset = (pageNum - 1) * PAGE_SIZE;
  paginatedQuery.range(offset, offset + PAGE_SIZE - 1);

  const { data: workshops } = await paginatedQuery;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workshops</h1>
          <p className="text-gray-600 mt-1">
            {totalCount} total {totalCount === 1 ? "workshop" : "workshops"}
          </p>
        </div>
        <Link
          href="/admin/workshops/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Create Workshop
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <form method="GET" className="flex gap-2">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by title..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              name="status"
              defaultValue={status}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      {(workshops || []).length > 0 ? (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg mb-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 font-semibold text-gray-900">Title</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Registrations</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Capacity</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((workshop) => {
                const registrationCount = workshop.workshop_registrations?.[0]?.count || 0;
                return (
                  <tr
                    key={workshop.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/workshops/${workshop.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {workshop.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {workshop.workshop_date
                        ? formatDateTime(workshop.workshop_date)
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[workshop.status] ||
                          "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {workshop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {registrationCount}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {workshop.max_capacity || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/workshops/${workshop.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center mb-6">
          <p className="text-gray-600 text-lg">No workshops found</p>
          <p className="text-gray-500 text-sm mt-2">
            {search || status
              ? "Try adjusting your filters"
              : "Create a workshop to get started"}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <Link
            href={`/admin/workshops?search=${search}&status=${status}&page=${
              pageNum - 1
            }`}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pageNum === 1
                ? "border border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/workshops?search=${search}&status=${status}&page=${p}`}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                p === pageNum
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </Link>
          ))}

          <Link
            href={`/admin/workshops?search=${search}&status=${status}&page=${
              pageNum + 1
            }`}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pageNum === totalPages
                ? "border border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </Link>
        </div>
      )}

      {/* Info */}
      <p className="text-sm text-gray-600 text-center">
        Showing {(workshops || []).length > 0 ? (pageNum - 1) * PAGE_SIZE + 1 : 0}{" "}
        to {Math.min(pageNum * PAGE_SIZE, totalCount || 0)} of {totalCount || 0}{" "}
        {totalCount === 1 ? "workshop" : "workshops"}
      </p>
    </div>
  );
}
