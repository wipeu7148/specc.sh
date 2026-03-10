import { z } from "zod";

/** Convert any string to a URL-safe slug. */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Zod schemas for workspace (single source of truth)
export const WorkspaceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(), // ISO 8601 string
});

// Inferred TypeScript types
export type Workspace = z.infer<typeof WorkspaceSchema>;
