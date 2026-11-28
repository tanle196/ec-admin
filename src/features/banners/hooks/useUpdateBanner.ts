import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateBannerDto } from '@/api/main'
import { bannerService } from '../api/bannerService'
import { bannerKeys } from '../queryKeys'

export const useUpdateBanner = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateBannerDto }) =>
      bannerService.update({ path: { id }, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all })
    },
  })
}
