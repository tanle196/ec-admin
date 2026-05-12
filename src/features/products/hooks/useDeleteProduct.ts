import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}
