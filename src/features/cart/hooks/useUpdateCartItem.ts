import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../api/cartService'
import { cartKeys } from '../queryKeys'

type UpdateCartItemParams = {
  itemId: string
  quantity: number
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: UpdateCartItemParams) =>
      cartService.updateItem({ path: { itemId }, body: { quantity } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}
