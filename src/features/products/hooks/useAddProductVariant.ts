import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateProductVariantDto } from '@/api/main'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useAddProductVariant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: CreateProductVariantDto }) =>
      productService.addVariant({ path: { id }, body }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
