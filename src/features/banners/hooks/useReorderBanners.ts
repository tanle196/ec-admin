import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type BannerOrderItemDto } from '@/api/main'
import { bannerService } from '../api/bannerService'
import { bannerKeys } from '../queryKeys'

export const useReorderBanners = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (items: BannerOrderItemDto[]) =>
      bannerService.reorder({ body: { items } }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all })
    },
  })
}
