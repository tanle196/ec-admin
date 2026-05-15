import { useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistService } from '../api/wishlistService'
import { wishlistKeys } from '../queryKeys'

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) =>
      wishlistService.removeProduct({ path: { productId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
    },
  })
}
