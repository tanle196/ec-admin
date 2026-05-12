import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateProductDto } from '@/api/main'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateProductDto }) =>
      productService.update({ path: { id }, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}
