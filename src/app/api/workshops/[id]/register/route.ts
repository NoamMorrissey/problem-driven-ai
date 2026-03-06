import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  locale: z.enum(["en", "es"]).optional().default("en"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: workshopId } = await params;
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, locale } = parsed.data;
    const supabase = await createClient();

    // Verify workshop exists and is published
    const { data: workshop, error: workshopError } = await supabase
      .from("workshops")
      .select("id, title, max_capacity, status")
      .eq("id", workshopId)
      .eq("status", "published")
      .single();

    if (workshopError || !workshop) {
      return NextResponse.json(
        { error: "Workshop not found" },
        { status: 404 }
      );
    }

    // Check capacity
    if (workshop.max_capacity) {
      const { count } = await supabase
        .from("workshop_registrations")
        .select("id", { count: "exact", head: true })
        .eq("workshop_id", workshopId);

      if (count && count >= workshop.max_capacity) {
        return NextResponse.json(
          { error: "Workshop is full", code: "WORKSHOP_FULL" },
          { status: 409 }
        );
      }
    }

    // Check for duplicate registration
    const { data: existing } = await supabase
      .from("workshop_registrations")
      .select("id")
      .eq("workshop_id", workshopId)
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Already registered", code: "ALREADY_REGISTERED" },
        { status: 409 }
      );
    }

    // Upsert contact
    const { data: contact } = await supabase
      .from("contacts")
      .upsert(
        {
          email,
          first_name: firstName,
          last_name: lastName,
          source: "workshop",
          status: "active",
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    // Create registration
    const { error: regError } = await supabase
      .from("workshop_registrations")
      .insert({
        workshop_id: workshopId,
        email,
        first_name: firstName,
        last_name: lastName,
        status: "registered",
        contact_id: contact?.id || null,
      });

    if (regError) {
      console.error("Registration error:", regError);
      return NextResponse.json(
        { error: "Failed to register" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
