import { z } from 'zod'

export const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] as const
export type OrderStatus = typeof ORDER_STATUSES[number]

export const orderItemSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  productName: z.string(),
  variantName: z.unknown().optional().nullable(),
  unitPrice: z.number(),
  quantity: z.number(),
  total: z.number(),
})

export const appliedDiscountSchema = z.object({
  id: z.string(),
  code: z.string(),
  type: z.enum(['percent', 'fixed']),
  value: z.number(),
})

export const orderSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  orderNumber: z.string(),
  status: z.enum(ORDER_STATUSES),
  subtotal: z.number(),
  shippingFee: z.number(),
  discount: z.number(),
  total: z.number(),
  notes: z.unknown().optional().nullable(),
  items: z.array(orderItemSchema),
  discounts: z.array(appliedDiscountSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const orderListItemSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  orderNumber: z.string(),
  status: z.enum(ORDER_STATUSES),
  total: z.number(),
  createdAt: z.coerce.date(),
})

export type Order = z.infer<typeof orderSchema>
export type OrderItem = z.infer<typeof orderItemSchema>
export type AppliedDiscount = z.infer<typeof appliedDiscountSchema>
export type OrderListItem = z.infer<typeof orderListItemSchema>
