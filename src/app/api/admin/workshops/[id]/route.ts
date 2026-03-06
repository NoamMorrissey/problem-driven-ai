import { createClient } from "@/lib/supabase/server";
import { workshopSchema } from "@/lib/validations/workshop";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch workshop with registration count
    const { data: workshop, error: workshopError } = await supabase
      .from("workshops")
      .select("*, workshop_registrations(count)")
      .eq("id", id)
      .single();

    if (workshopError || !workshop) {
      return NextResponse.json(
        { error: "Workshop not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workshop);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validationResult = workshopSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const data = validationResult.data;

    // Parse date if provided
    let workshopDate: string | null = null;
    if (data.workshop_date) {
      const parsedDate = new Date(data.workshop_date);
      if (!isNaN(parsedDate.getTime())) {
        workshopDate = parsedDate.toISOString();
      }
    }

    // Update workshop
    const { data: workshop, error } = await supabase
      .from("workshops")
      .update({
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        content: data.content || null,
        workshop_date: workshopDate,
        location: data.location || null,
        max_capacity: data.max_capacity || null,
        price: data.price || 0,
        duration_hours: data.duration_hours || null,
        level: data.level || null,
        status: data.status || "draft",
        language: data.language || "es",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating workshop:", error);
      return NextResponse.json(
        { error: "Failed to update workshop" },
        { status: 500 }
      );
    }

    return NextResponse.json(workshop);
  } catch (error) {
    console.error("Error updating workshop:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from("workshops")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting workshop:", error);
      return NextResponse.json(
        { error: "Failed to delete workshop" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
