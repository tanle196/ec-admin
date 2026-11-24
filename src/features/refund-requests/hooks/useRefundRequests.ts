import { useQuery } from '@tanstack/react-query'
import { refundRequestService } from '../api/refundRequestService'
import { type RefundRequestStatus } from '../data/schema'
import { refundRequestKeys } from '../queryKeys'

type RefundRequestListQuery = {
  page?: number
  limit?: number
  status?: RefundRequestStatus
  order_id?: string
  payment_id?: string
}

export const useRefundRequests = (query?: RefundRequestListQuery) => {
  return useQuery({
    queryKey: refundRequestKeys.list(query),
    queryFn: () => refundRequestService.getList({ query }),
  })
}
