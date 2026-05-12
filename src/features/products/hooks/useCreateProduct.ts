import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateProductDto } from '@/api/main'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateProductDto) => productService.create({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}
