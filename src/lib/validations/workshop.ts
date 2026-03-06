import { z } from "zod";

export const workshopSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional().default(""),
  content: z.string().optional().default(""),
  workshop_date: z.string().optional().default(""),
  location: z.string().optional().default(""),
  max_capacity: z.number().optional().default(0),
  price: z.number().optional().default(0),
  duration_hours: z.number().optional().default(0),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  status: z.enum(["draft", "published", "archived"]).optional().default("draft"),
  language: z.enum(["en", "es"]).optional().default("es"),
});

export type WorkshopInput = z.infer<typeof workshopSchema>;
