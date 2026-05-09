import { z } from 'zod'

const permissionActionSchema = z.union([
  z.literal('create'),
  z.literal('read'),
  z.literal('update'),
  z.literal('delete'),
  z.literal('cancel'),
  z.literal('publish'),
  z.literal('assign.role'),
])

const permissionSchema = z.object({
  id: z.string(),
  module: z.string(),
  action: permissionActionSchema,
  description: z.string().optional(),
  isSystem: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  permissions: z.array(permissionSchema).optional(),
})

export type Role = z.infer<typeof roleSchema>
