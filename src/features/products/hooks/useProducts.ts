import { useQuery } from '@tanstack/react-query'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

type ProductListQuery = {
  page?: number
  limit?: number
  name?: string
  category_id?: string
  status?: 'draft' | 'published' | 'archived'
  isFeatured?: boolean
}

export const useProducts = (query?: ProductListQuery) => {
  return useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => productService.getList({ query }),
  })
}
