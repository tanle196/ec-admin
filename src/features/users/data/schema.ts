import { z } from 'zod'

const userStatusSchema = z.union([z.literal('active'), z.literal('inactive')])
export type UserStatus = z.infer<typeof userStatusSchema>

const _userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: userStatusSchema,
  roles: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof _userSchema>
