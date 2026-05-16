import { z } from 'zod'

export const discountSchema = z.object({
  id: z.string(),
  code: z.string(),
  type: z.enum(['percent', 'fixed']),
  value: z.number(),
  minOrderValue: z.union([z.number(), z.record(z.unknown())]).nullable().optional(),
  usageLimit: z.union([z.number(), z.record(z.unknown())]).nullable().optional(),
  usedCount: z.number(),
  isActive: z.boolean(),
  startsAt: z.union([z.coerce.date(), z.record(z.unknown())]).nullable().optional(),
  expiresAt: z.union([z.coerce.date(), z.record(z.unknown())]).nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Discount = z.infer<typeof discountSchema>
