import { z } from 'zod'

export const wishlistProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  basePrice: z.number(),
  sku: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  isFeatured: z.boolean(),
  description: z.unknown().nullable().optional(),
})

export const wishlistItemSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  product: wishlistProductSchema,
  createdAt: z.coerce.date(),
})

export const wishlistSchema = z.object({
  items: z.array(wishlistItemSchema),
  total: z.number(),
})

export type WishlistProduct = z.infer<typeof wishlistProductSchema>
export type WishlistItem = z.infer<typeof wishlistItemSchema>
export type Wishlist = z.infer<typeof wishlistSchema>
