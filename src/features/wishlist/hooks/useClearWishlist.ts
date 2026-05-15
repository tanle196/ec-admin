import { useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistService } from '../api/wishlistService'
import { wishlistKeys } from '../queryKeys'

export const useClearWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
    },
  })
}
