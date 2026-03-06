"use client";

import { formatDate } from "@/lib/utils/date";

interface Registration {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  created_at: string;
}

interface WorkshopRegistrationsTableProps {
  registrations: Registration[];
}

const statusColors: Record<string, string> = {
  registered: "bg-green-100 text-green-900",
  pending: "bg-yellow-100 text-yellow-900",
  cancelled: "bg-red-100 text-red-900",
};

export default function WorkshopRegistrationsTable({
  registrations,
}: WorkshopRegistrationsTableProps) {
  if (registrations.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600 text-lg">No registrations yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 font-semibold text-gray-900">Name</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Email</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 font-semibold text-gray-900">Registered Date</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr
              key={registration.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-gray-900">
                {registration.first_name && registration.last_name
                  ? `${registration.first_name} ${registration.last_name}`
                  : registration.first_name || "—"}
              </td>
              <td className="px-6 py-4 text-gray-600">{registration.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[registration.status] ||
                    "bg-gray-100 text-gray-900"
                  }`}
                >
                  {registration.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {formatDate(registration.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
