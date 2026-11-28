import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bannerService } from '../api/bannerService'
import { bannerKeys } from '../queryKeys'

export const useUploadBannerImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      file,
      isMobile = false,
    }: {
      id: string
      file: File
      isMobile?: boolean
    }) => bannerService.uploadImage({ path: { id }, body: { file, isMobile } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all })
    },
  })
}
