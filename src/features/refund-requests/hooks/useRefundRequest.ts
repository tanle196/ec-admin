import { useQuery } from '@tanstack/react-query'
import { refundRequestService } from '../api/refundRequestService'
import { refundRequestKeys } from '../queryKeys'

export const useRefundRequest = (id: string | null) => {
  return useQuery({
    queryKey: refundRequestKeys.detail(id ?? ''),
    queryFn: () => refundRequestService.findOne({ path: { id: id! } }),
    enabled: !!id,
  })
}
