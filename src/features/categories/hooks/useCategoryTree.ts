import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

export const useCategoryTree = () => {
  return useQuery({
    queryKey: categoryKeys.tree(),
    queryFn: () => categoryService.getTree(),
  })
}
