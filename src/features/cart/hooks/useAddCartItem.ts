import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../api/cartService'
import { cartKeys } from '../queryKeys'

type AddCartItemParams = {
  variant_id: string
  quantity?: number
}

export const useAddCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ variant_id, quantity }: AddCartItemParams) =>
      cartService.addItem({ body: { variant_id, quantity } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}
