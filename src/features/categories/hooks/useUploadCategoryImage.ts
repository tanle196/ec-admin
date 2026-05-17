import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService'
import { categoryKeys } from '../queryKeys'

export const useUploadCategoryImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      categoryService.uploadImage({ path: { id }, body: { file } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}
