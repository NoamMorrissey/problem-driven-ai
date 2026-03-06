import { createClient } from "@/lib/supabase/server";
import ContactsTable from "@/components/admin/contacts-table";
import Link from "next/link";

export interface Contact {
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

interface PageProps {
  searchParams: Promise<{
    search?: string;
    source?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: "CRM - Contacts",
  description: "Manage contacts",
};

const PAGE_SIZE = 10;
const SOURCES = ["ebook", "workshop", "empresa", "evento", "manual"] as const;

export default async function CRMPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const source = params.source || "";
  const pageNum = parseInt(params.page || "1", 10);

  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  // Apply filters
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  if (source && source !== "all") {
    query = query.eq("source", source);
  }

  // Get total count
  const { data: allContacts, count: totalCount } = await query;

  if (!allContacts) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
        <p className="text-gray-600 mb-8">Error loading contacts</p>
      </div>
    );
  }

  const totalPages = Math.ceil((totalCount || 0) / PAGE_SIZE);

  // Apply pagination
  const paginatedQuery = supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    const q = paginatedQuery.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%`
    );
    if (source && source !== "all") {
      await q.eq("source", source);
    }
    if (pageNum > 1) {
      q.range((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE - 1);
    } else {
      q.range(0, PAGE_SIZE - 1);
    }
  } else {
    if (source && source !== "all") {
      paginatedQuery.eq("source", source);
    }
    if (pageNum > 1) {
      paginatedQuery.range((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE - 1);
    } else {
      paginatedQuery.range(0, PAGE_SIZE - 1);
    }
  }

  const { data: contacts } = await paginatedQuery;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">
            {totalCount} total {totalCount === 1 ? "contact" : "contacts"}
          </p>
        </div>
        <Link
          href="/api/admin/contacts/export"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Export CSV
        </Link>
      </div>

      <ContactsTable
        contacts={(contacts || []) as Contact[]}
        totalCount={totalCount || 0}
        page={pageNum}
        source={source}
        search={search}
      />
    </div>
  );
}
