import { createClient } from "@/lib/supabase/server";
import { workshopSchema } from "@/lib/validations/workshop";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

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
    const { data: allWorkshops, count: totalCount, error: countError } = await query;

    if (countError) {
      return NextResponse.json(
        { error: "Failed to fetch workshops" },
        { status: 500 }
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

    const offset = (page - 1) * PAGE_SIZE;
    paginatedQuery.range(offset, offset + PAGE_SIZE - 1);

    const { data: workshops, error: dataError } = await paginatedQuery;

    if (dataError) {
      return NextResponse.json(
        { error: "Failed to fetch workshops" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: workshops || [],
      pagination: {
        page,
        totalPages,
        totalCount: totalCount || 0,
        pageSize: PAGE_SIZE,
      },
    });
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Create workshop
    const { data: workshop, error } = await supabase
      .from("workshops")
      .insert({
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
        published: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating workshop:", error);
      return NextResponse.json(
        { error: "Failed to create workshop" },
        { status: 500 }
      );
    }

    return NextResponse.json(workshop, { status: 201 });
  } catch (error) {
    console.error("Error creating workshop:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
