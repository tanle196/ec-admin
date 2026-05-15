import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../api/cartService'
import { cartKeys } from '../queryKeys'

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) =>
      cartService.removeItem({ path: { itemId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}
