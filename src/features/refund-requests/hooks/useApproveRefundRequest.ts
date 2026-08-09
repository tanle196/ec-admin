import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderKeys } from '@/features/orders/queryKeys'
import { paymentKeys } from '@/features/payments/queryKeys'
import { refundRequestService } from '../api/refundRequestService'
import { refundRequestKeys } from '../queryKeys'

type ApproveRefundRequestParams = {
  id: string
  orderId: string
  paymentId: string
  note?: string
}

export const useApproveRefundRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, note }: ApproveRefundRequestParams) =>
      refundRequestService.approve({ path: { id }, body: { note } }),
    onSuccess: (_, { id, orderId, paymentId }) => {
      queryClient.invalidateQueries({ queryKey: refundRequestKeys.all })
      queryClient.invalidateQueries({ queryKey: refundRequestKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) })
      queryClient.invalidateQueries({ queryKey: paymentKeys.all })
      queryClient.invalidateQueries({ queryKey: paymentKeys.detail(paymentId) })
      queryClient.invalidateQueries({ queryKey: paymentKeys.refunds(paymentId) })
    },
  })
}
