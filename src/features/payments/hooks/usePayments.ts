import { useQuery } from '@tanstack/react-query'
import { paymentService } from '../api/paymentService'
import { paymentKeys } from '../queryKeys'
import { type PaymentStatus } from '../data/schema'

type PaymentListQuery = {
  page?: number
  limit?: number
  status?: PaymentStatus
  order_id?: string
  user_id?: string
}

export const usePayments = (query?: PaymentListQuery) => {
  return useQuery({
    queryKey: paymentKeys.list(query),
    queryFn: () => paymentService.getList({ query }),
  })
}
