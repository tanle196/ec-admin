import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '../api/reviewService'
import { reviewKeys } from '../queryKeys'

export const useApproveReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => reviewService.approve({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all })
    },
  })
}
