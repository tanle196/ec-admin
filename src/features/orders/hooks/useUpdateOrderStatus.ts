import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type OrderStatus } from '../data/schema'
import { orderService } from '../api/orderService'
import { orderKeys } from '../queryKeys'

type UpdateStatusParams = {
  id: string
  status: OrderStatus
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: UpdateStatusParams) =>
      orderService.updateStatus({ path: { id }, body: { status } }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) })
    },
  })
}
