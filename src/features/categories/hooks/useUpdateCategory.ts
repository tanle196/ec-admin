import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateCategoryDto } from '@/api/main'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateCategoryDto }) =>
      categoryService.update({ path: { id }, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}
