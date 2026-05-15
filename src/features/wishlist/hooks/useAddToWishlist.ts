import { useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistService } from '../api/wishlistService'
import { wishlistKeys } from '../queryKeys'

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product_id: string) =>
      wishlistService.addProduct({ body: { product_id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
    },
  })
}
