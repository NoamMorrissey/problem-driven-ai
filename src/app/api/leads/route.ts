import { NextRequest, NextResponse } from "next/server";
import { leadCaptureSchema } from "@/lib/validations/lead";
import { createServerClient } from "@/lib/supabase/server";
import { sendEbookEmail } from "@/lib/resend/send-ebook";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadCaptureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, fullName, company, source, sourceDetail, locale } =
      parsed.data;

    // Insert or update contact in Supabase
    const supabase = await createServerClient();

    const { data: existingContact } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", email)
      .single();

    let contactId: string;

    if (existingContact) {
      contactId = existingContact.id;
      // Update existing contact
      await supabase
        .from("contacts")
        .update({
          full_name: fullName,
          company: company || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", contactId);
    } else {
      // Create new contact
      const { data: newContact, error: insertError } = await supabase
        .from("contacts")
        .insert({
          email,
          full_name: fullName,
          company: company || null,
          source,
          source_detail: sourceDetail || null,
        })
        .select("id")
        .single();

      if (insertError || !newContact) {
        console.error("Failed to insert contact:", insertError);
        return NextResponse.json(
          { error: "Failed to save contact" },
          { status: 500 }
        );
      }

      contactId = newContact.id;
    }

    // Track ebook download if source is ebook
    if (source === "ebook") {
      await supabase.from("ebook_downloads").insert({
        contact_id: contactId,
        referrer: request.headers.get("referer") || null,
      });

      // Send ebook email
      try {
        await sendEbookEmail({ to: email, fullName, locale });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message:
        locale === "es"
          ? "¡Revisa tu email! El e-book está en camino."
          : "Check your email! The e-book is on its way.",
    });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
