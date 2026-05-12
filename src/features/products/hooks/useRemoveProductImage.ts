import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useRemoveProductImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, imageId }: { id: string; imageId: string }) =>
      productService.removeImage({ path: { id, imageId } }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
