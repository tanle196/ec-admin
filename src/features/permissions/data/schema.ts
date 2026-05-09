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

export type PermissionAction = z.infer<typeof permissionActionSchema>

export const permissionSchema = z.object({
  id: z.string(),
  module: z.string(),
  action: permissionActionSchema,
  description: z.string().optional(),
  isSystem: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permission = z.infer<typeof permissionSchema>
