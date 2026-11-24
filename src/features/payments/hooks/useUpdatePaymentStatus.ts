import { useMutation, useQueryClient } from '@tanstack/react-query'
import { paymentService } from '../api/paymentService'
import { type PaymentStatus } from '../data/schema'
import { paymentKeys } from '../queryKeys'

type UpdateStatusParams = {
  id: string
  status: PaymentStatus
  transactionId?: string
}

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status, transactionId }: UpdateStatusParams) =>
      paymentService.updateStatus({
        path: { id },
        body: { status, transactionId },
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all })
      queryClient.invalidateQueries({ queryKey: paymentKeys.detail(id) })
    },
  })
}
