import { z } from 'zod'

export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'refunded'] as const
export const PAYMENT_METHODS = ['cod', 'vnpay', 'momo', 'zalopay', 'stripe', 'bank_transfer'] as const

export type PaymentStatus = typeof PAYMENT_STATUSES[number]
export type PaymentMethod = typeof PAYMENT_METHODS[number]

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

export type Payment = z.infer<typeof paymentSchema>
export type PaymentListItem = Payment
