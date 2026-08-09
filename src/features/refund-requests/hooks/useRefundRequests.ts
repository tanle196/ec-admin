import { useQuery } from '@tanstack/react-query'
import { refundRequestService } from '../api/refundRequestService'
import { refundRequestKeys } from '../queryKeys'
import { type RefundRequestStatus } from '../data/schema'

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
