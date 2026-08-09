import { createFileRoute } from '@tanstack/react-router'
import { RefundRequests } from '@/features/refund-requests'

export const Route = createFileRoute('/_authenticated/refund-requests/')({
  component: RefundRequests,
})
