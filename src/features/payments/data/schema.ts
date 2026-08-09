import { z } from 'zod'

export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'partially_refunded', 'refunded'] as const
export const PAYMENT_METHODS = ['cod', 'vnpay', 'momo', 'zalopay', 'stripe', 'bank_transfer'] as const
export const REFUND_STATUSES = ['pending', 'succeeded', 'failed'] as const

export type PaymentStatus = typeof PAYMENT_STATUSES[number]
export type PaymentMethod = typeof PAYMENT_METHODS[number]
export type RefundStatus = typeof REFUND_STATUSES[number]

export const paymentSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  method: z.enum(PAYMENT_METHODS),
  status: z.enum(PAYMENT_STATUSES),
  amount: z.number(),
  transactionId: z.unknown().optional().nullable(),
  metadata: z.unknown().optional().nullable(),
  paidAt: z.unknown().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const paymentListItemSchema = paymentSchema

export const refundItemSchema = z.object({
  id: z.string(),
  order_item_id: z.string(),
  quantity: z.number(),
  amount: z.number(),
})

export const refundSchema = z.object({
  id: z.string(),
  payment_id: z.string(),
  order_id: z.string(),
  amount: z.number(),
  reason: z.string(),
  status: z.enum(REFUND_STATUSES),
  transactionId: z.unknown().optional().nullable(),
  actorId: z.unknown().optional().nullable(),
  items: z.array(refundItemSchema),
  createdAt: z.coerce.date(),
})

export type Payment = z.infer<typeof paymentSchema>
export type PaymentListItem = Payment
export type RefundItem = z.infer<typeof refundItemSchema>
export type Refund = z.infer<typeof refundSchema>
