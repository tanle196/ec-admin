import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '../api/orderService'
import { orderKeys } from '../queryKeys'

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => orderService.cancel({ path: { id } }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all })
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) })
    },
  })
}
