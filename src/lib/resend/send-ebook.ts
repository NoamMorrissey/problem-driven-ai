import { resend } from "./client";
import fs from "fs";
import path from "path";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Problem-Driven AI <noreply@resend.dev>";

interface SendEbookParams {
  to: string;
  fullName: string;
  locale?: "en" | "es";
}

export async function sendEbookEmail({
  to,
  fullName,
  locale = "en",
}: SendEbookParams) {
  const subject =
    locale === "es"
      ? "Tu e-book de Problem-Driven AI"
      : "Your Problem-Driven AI e-book";

  const body =
    locale === "es"
      ? `Hola ${fullName},\n\nGracias por tu interés en Problem-Driven AI. Adjunto encontrarás el e-book.\n\nSi tienes preguntas, no dudes en responder a este email.\n\nAlfonso Morcuende\nProblem-Driven AI`
      : `Hi ${fullName},\n\nThank you for your interest in Problem-Driven AI. Please find the e-book attached.\n\nIf you have any questions, feel free to reply to this email.\n\nAlfonso Morcuende\nProblem-Driven AI`;

  // Read the e-book PDF
  const ebookPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "problem-driven-ai-ebook.pdf"
  );

  let attachments: { filename: string; content: Buffer }[] = [];

  if (fs.existsSync(ebookPath)) {
    attachments = [
      {
        filename: "Problem-Driven-AI-Ebook.pdf",
        content: fs.readFileSync(ebookPath),
      },
    ];
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    text: body,
    attachments,
  });

  if (error) {
    console.error("Failed to send ebook email:", error);
    throw new Error(`Email send failed: ${error.message}`);
  }

  return data;
}
