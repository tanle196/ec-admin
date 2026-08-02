import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

type UploadProductImageParams = {
  id: string
  file: File
  alt?: string
  isPrimary?: boolean
  sortOrder?: number
  variant_id?: string
}

export const useUploadProductImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, file, alt, isPrimary, sortOrder, variant_id }: UploadProductImageParams) =>
      productService.uploadImage({
        path: { id },
        body: { file, ...(alt && { alt }), isPrimary, sortOrder, variant_id },
      }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
