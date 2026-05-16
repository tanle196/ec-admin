import { useQuery } from '@tanstack/react-query'
import { discountService } from '../api/discountService'
import { discountKeys } from '../queryKeys'

type DiscountListQuery = {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
}

export const useDiscounts = (query?: DiscountListQuery) => {
  return useQuery({
    queryKey: discountKeys.list(query),
    queryFn: () => discountService.getList({ query }),
  })
}
