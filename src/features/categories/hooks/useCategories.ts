import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

type CategoryListQuery = {
  page?: number
  limit?: number
  name?: string
  parent_id?: string
  isActive?: boolean
}

export const useCategories = (query?: CategoryListQuery) => {
  return useQuery({
    queryKey: categoryKeys.list(query),
    queryFn: () => categoryService.getList({ query }),
  })
}
