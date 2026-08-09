import { useQuery } from '@tanstack/react-query'
import { paymentService } from '../api/paymentService'
import { paymentKeys } from '../queryKeys'

export const useRefunds = (paymentId: string | null) => {
  return useQuery({
    queryKey: paymentKeys.refunds(paymentId ?? ''),
    queryFn: () => paymentService.findRefunds({ path: { id: paymentId! } }),
    enabled: !!paymentId,
  })
}
