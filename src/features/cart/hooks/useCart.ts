import { useQuery } from '@tanstack/react-query'
import { cartService } from '../api/cartService'
import { cartKeys } from '../queryKeys'

export const useCart = () => {
  return useQuery({
    queryKey: cartKeys.me(),
    queryFn: () => cartService.getCart(),
  })
}
