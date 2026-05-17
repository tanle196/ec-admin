import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

export const useRemoveCategoryImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      categoryService.removeImage({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}
