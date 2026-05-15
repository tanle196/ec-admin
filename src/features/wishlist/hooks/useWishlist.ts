import { useQuery } from '@tanstack/react-query'
import { wishlistService } from '../api/wishlistService'
import { wishlistKeys } from '../queryKeys'

export const useWishlist = () => {
  return useQuery({
    queryKey: wishlistKeys.me(),
    queryFn: () => wishlistService.getWishlist(),
  })
}
