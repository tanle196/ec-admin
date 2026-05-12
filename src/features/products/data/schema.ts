import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  category_id: z.string(),
  name: z.string(),
  slug: z.string(),
  basePrice: z.number(),
  sku: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  isFeatured: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Product = z.infer<typeof productSchema>
