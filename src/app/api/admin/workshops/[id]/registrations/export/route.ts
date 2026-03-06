import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch workshop to get title for filename
    const { data: workshop, error: workshopError } = await supabase
      .from("workshops")
      .select("title")
      .eq("id", id)
      .single();

    if (workshopError || !workshop) {
      return NextResponse.json(
        { error: "Workshop not found" },
        { status: 404 }
      );
    }

    // Fetch registrations
    const { data: registrations, error: registrationsError } = await supabase
      .from("workshop_registrations")
      .select("*")
      .eq("workshop_id", id)
      .order("created_at", { ascending: false });

    if (registrationsError) {
      return NextResponse.json(
        { error: "Failed to fetch registrations" },
        { status: 500 }
      );
    }

    // Generate CSV
    const headers = ["First Name", "Last Name", "Email", "Status", "Registered Date"];
    const rows = (registrations || []).map((reg) => [
      reg.first_name || "",
      reg.last_name || "",
      reg.email,
      reg.status,
      new Date(reg.created_at).toISOString().split("T")[0],
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap in quotes if contains comma or quote
            const escaped = String(cell).replace(/"/g, '""');
            return escaped.includes(",") || escaped.includes('"')
              ? `"${escaped}"`
              : escaped;
          })
          .join(",")
      )
      .join("\n");

    const filename = `${workshop.title}-registrations-${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv;charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting registrations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
