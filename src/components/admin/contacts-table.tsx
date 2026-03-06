"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date";
import { useCallback } from "react";

interface Contact {
  id: string;
  email: string;
  full_name: string;
  company: string;
  role: string;
  source: "ebook" | "workshop" | "empresa" | "evento" | "manual";
  source_detail: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  totalCount: number;
  page: number;
  source: string;
  search: string;
}

const PAGE_SIZE = 10;
const SOURCES = [
  { value: "", label: "All Sources" },
  { value: "ebook", label: "Ebook" },
  { value: "workshop", label: "Workshop" },
  { value: "empresa", label: "Empresa" },
  { value: "evento", label: "Evento" },
  { value: "manual", label: "Manual" },
];

const sourceColors: Record<string, string> = {
  ebook: "bg-blue-100 text-blue-900",
  workshop: "bg-purple-100 text-purple-900",
  empresa: "bg-green-100 text-green-900",
  evento: "bg-orange-100 text-orange-900",
  manual: "bg-gray-100 text-gray-900",
};

export default function ContactsTable({
  contacts,
  totalCount,
  page,
  source,
  search,
}: ContactsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const buildQueryString = useCallback(
    (overrides: Partial<{ search: string; source: string; page: number }>) => {
      const params = new URLSearchParams();

      const newSearch = overrides.search !== undefined ? overrides.search : search;
      const newSource = overrides.source !== undefined ? overrides.source : source;
      const newPage = overrides.page !== undefined ? overrides.page : page;

      if (newSearch) params.set("search", newSearch);
      if (newSource) params.set("source", newSource);
      if (newPage > 1) params.set("page", newPage.toString());

      const queryString = params.toString();
      return queryString ? `?${queryString}` : "";
    },
    [search, source, page]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    router.push(`/admin/crm${buildQueryString({ search: newSearch, page: 1 })}`);
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSource = e.target.value;
    router.push(`/admin/crm${buildQueryString({ source: newSource, page: 1 })}`);
  };

  const goToPage = (newPage: number) => {
    router.push(`/admin/crm${buildQueryString({ page: newPage })}`);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="sm:w-40">
          <select
            value={source}
            onChange={handleSourceChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SOURCES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {contacts.length > 0 ? (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Company
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">Source</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/crm/${contact.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {contact.full_name || "—"}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {contact.company || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        sourceColors[contact.source] ||
                        "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {contact.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(contact.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">No contacts found</p>
          <p className="text-gray-500 text-sm mt-2">
            {search || source
              ? "Try adjusting your filters"
              : "Create a contact to get started"}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Info */}
      <p className="text-sm text-gray-600 text-center">
        Showing {contacts.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0} to{" "}
        {Math.min(page * PAGE_SIZE, totalCount)} of {totalCount}{" "}
        {totalCount === 1 ? "contact" : "contacts"}
      </p>
    </div>
  );
}
