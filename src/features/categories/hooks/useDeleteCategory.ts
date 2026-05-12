import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => categoryService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}
