import { z } from 'zod'

export const REFUND_REQUEST_STATUSES = ['pending', 'approved', 'rejected'] as const
export type RefundRequestStatus = typeof REFUND_REQUEST_STATUSES[number]

export const refundRequestItemSchema = z.object({
  id: z.string(),
  order_item_id: z.string(),
  quantity: z.number(),
  amount: z.number(),
})

export const refundRequestSchema = z.object({
  id: z.string(),
  payment_id: z.string(),
  order_id: z.string(),
  requested_by: z.string(),
  amount: z.number(),
  reason: z.string(),
  status: z.enum(REFUND_REQUEST_STATUSES),
  adminNote: z.unknown().optional().nullable(),
  reviewedBy: z.unknown().optional().nullable(),
  reviewedAt: z.unknown().optional().nullable(),
  refund_id: z.unknown().optional().nullable(),
  items: z.array(refundRequestItemSchema),
  createdAt: z.coerce.date(),
})

export const refundRequestListItemSchema = refundRequestSchema

export type RefundRequestItem = z.infer<typeof refundRequestItemSchema>
export type RefundRequest = z.infer<typeof refundRequestSchema>
export type RefundRequestListItem = RefundRequest
