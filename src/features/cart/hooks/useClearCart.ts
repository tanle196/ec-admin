import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../api/cartService'
import { cartKeys } from '../queryKeys'

export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}
