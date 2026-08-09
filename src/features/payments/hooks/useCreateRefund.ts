import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderKeys } from '@/features/orders/queryKeys'
import { paymentService } from '../api/paymentService'
import { paymentKeys } from '../queryKeys'
import { type RefundItemInputDto } from '@/api/main'

type CreateRefundParams = {
  paymentId: string
  orderId: string
  items: RefundItemInputDto[]
  reason: string
}

export const useCreateRefund = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ paymentId, items, reason }: CreateRefundParams) =>
      paymentService.createRefund({ path: { id: paymentId }, body: { items, reason } }),
    onSuccess: (_, { paymentId, orderId }) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all })
      queryClient.invalidateQueries({ queryKey: paymentKeys.detail(paymentId) })
      queryClient.invalidateQueries({ queryKey: paymentKeys.refunds(paymentId) })
      queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) })
    },
  })
}
