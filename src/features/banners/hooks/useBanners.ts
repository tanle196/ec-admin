import { useQuery } from '@tanstack/react-query'
import { bannerService } from '../api/bannerService'
import { type BannerPosition } from '../data/schema'
import { bannerKeys } from '../queryKeys'

type BannerListQuery = {
  position?: BannerPosition
}

export const useBanners = (query?: BannerListQuery) => {
  return useQuery({
    queryKey: bannerKeys.list(query),
    queryFn: () => bannerService.getList({ query }),
  })
}
