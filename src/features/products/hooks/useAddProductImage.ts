import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateProductImageDto } from '@/api/main'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useAddProductImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: CreateProductImageDto }) =>
      productService.addImage({ path: { id }, body }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
