import { z } from 'zod'

export const addressSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  phone: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional().nullable(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
  postalCode: z.string().optional().nullable(),
  isDefault: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Address = z.infer<typeof addressSchema>
