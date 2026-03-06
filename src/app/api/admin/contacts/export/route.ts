import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface Contact {
  id: string;
  email: string;
  full_name: string;
  company: string;
  role: string;
  source: string;
  source_detail: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export async function GET() {
  try {
    // Check authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all contacts
    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
      return NextResponse.json(
        { error: "Failed to fetch contacts" },
        { status: 500 }
      );
    }

    if (!contacts || contacts.length === 0) {
      // Return empty CSV with headers
      const csv = "Name,Email,Company,Source,Source Detail,Tags,Created At\n";
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="contacts.csv"',
        },
      });
    }

    // Generate CSV
    const csv = generateCSV(contacts as Contact[]);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="contacts.csv"',
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateCSV(contacts: Contact[]): string {
  const headers = ["Name", "Email", "Company", "Source", "Source Detail", "Tags", "Created At"];
  const rows: string[] = [];

  // Add headers
  rows.push(headers.map(escapeCSV).join(","));

  // Add data rows
  for (const contact of contacts) {
    const row = [
      contact.full_name,
      contact.email,
      contact.company || "",
      contact.source || "",
      contact.source_detail || "",
      (contact.tags || []).join("; "),
      contact.created_at,
    ];
    rows.push(row.map(escapeCSV).join(","));
  }

  return rows.join("\n");
}

function escapeCSV(field: string): string {
  if (!field) return "";

  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }

  return field;
}
