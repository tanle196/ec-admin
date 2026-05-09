import { z } from 'zod'

const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  roles: z.array(roleSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof userSchema>
