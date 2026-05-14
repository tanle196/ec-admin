import { useQuery } from '@tanstack/react-query'
import { orderService } from '../api/orderService'
import { orderKeys } from '../queryKeys'

export const useOrder = (id: string | null) => {
  return useQuery({
    queryKey: orderKeys.detail(id ?? ''),
    queryFn: () => orderService.findOne({ path: { id: id! } }),
    enabled: !!id,
  })
}
