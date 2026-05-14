import { useQuery } from '@tanstack/react-query'
import { paymentService } from '../api/paymentService'
import { paymentKeys } from '../queryKeys'

export const usePayment = (id: string | null) => {
  return useQuery({
    queryKey: paymentKeys.detail(id ?? ''),
    queryFn: () => paymentService.findOne({ path: { id: id! } }),
    enabled: !!id,
  })
}
