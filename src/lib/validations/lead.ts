import { z } from "zod";

export const leadCaptureSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  source: z.enum(["ebook", "workshop", "empresa", "evento", "manual"]),
  sourceDetail: z.string().optional(),
  locale: z.enum(["en", "es"]).optional().default("en"),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
