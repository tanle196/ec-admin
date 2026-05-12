import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  parent_id: z.union([z.string(), z.record(z.unknown())]).nullable().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.union([z.string(), z.record(z.unknown())]).nullable().optional(),
  image: z.union([z.string(), z.record(z.unknown())]).nullable().optional(),
  sortOrder: z.number(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof categorySchema>
