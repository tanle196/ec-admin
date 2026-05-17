import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../api/productService'
import { productKeys } from '../queryKeys'

type UploadProductImageParams = {
  id: string
  file: File
  alt?: string
  isPrimary?: boolean
  sortOrder?: number
}

export const useUploadProductImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, file, alt, isPrimary, sortOrder }: UploadProductImageParams) =>
      productService.uploadImage({
        path: { id },
        body: { file, ...(alt && { alt }), isPrimary, sortOrder },
      }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })
    },
  })
}
