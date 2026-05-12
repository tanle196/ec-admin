import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateCategoryDto } from '@/api/main'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateCategoryDto) => categoryService.create({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}
