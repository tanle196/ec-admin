import { useMutation, useQueryClient } from '@tanstack/react-query'
import { refundRequestService } from '../api/refundRequestService'
import { refundRequestKeys } from '../queryKeys'

type RejectRefundRequestParams = {
  id: string
  note: string
}

export const useRejectRefundRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, note }: RejectRefundRequestParams) =>
      refundRequestService.reject({ path: { id }, body: { note } }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: refundRequestKeys.all })
      queryClient.invalidateQueries({ queryKey: refundRequestKeys.detail(id) })
    },
  })
}
