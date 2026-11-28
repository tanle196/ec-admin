import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bannerService } from '../api/bannerService'
import { bannerKeys } from '../queryKeys'

export const useDeleteBanner = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => bannerService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all })
    },
  })
}
