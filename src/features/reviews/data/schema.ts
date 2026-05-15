import { z } from 'zod'

export const reviewAuthorSchema = z.object({
  id: z.string(),
  fullName: z.unknown().nullable().optional(),
  avatar: z.unknown().nullable().optional(),
})

export const reviewSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user: reviewAuthorSchema,
  product_id: z.string(),
  rating: z.number().min(1).max(5),
  title: z.unknown().nullable().optional(),
  content: z.unknown().nullable().optional(),
  isVerified: z.boolean(),
  isApproved: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Review = z.infer<typeof reviewSchema>
export type ReviewAuthor = z.infer<typeof reviewAuthorSchema>
