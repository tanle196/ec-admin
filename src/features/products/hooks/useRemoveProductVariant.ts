import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useRemoveProductVariant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, variantId }: { id: string; variantId: string }) =>
      productService.removeVariant({ path: { id, variantId } }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
