import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateProductVariantDto } from '@/api/main'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useUpdateProductVariant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      variantId,
      body,
    }: {
      id: string
      variantId: string
      body: UpdateProductVariantDto
    }) => productService.updateVariant({ path: { id, variantId }, body }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
