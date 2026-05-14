import { useQuery } from '@tanstack/react-query'
import { orderService } from '../api/orderService'
import { orderKeys } from '../queryKeys'

type OrderListQuery = {
  page?: number
  limit?: number
  status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  user_id?: string
}

export const useOrders = (query?: OrderListQuery) => {
  return useQuery({
    queryKey: orderKeys.list(query),
    queryFn: () => orderService.getList({ query }),
  })
}
