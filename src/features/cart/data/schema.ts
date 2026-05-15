import { z } from 'zod'

export const cartItemVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number(),
  stock: z.number(),
  attributes: z.record(z.unknown()).optional(),
})

export const cartItemSchema = z.object({
  id: z.string(),
  cart_id: z.string(),
  variant_id: z.string(),
  variant: cartItemVariantSchema,
  quantity: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const cartSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  items: z.array(cartItemSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CartItemVariant = z.infer<typeof cartItemVariantSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>
