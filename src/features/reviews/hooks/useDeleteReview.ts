import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '../api/reviewService'
import { reviewKeys } from '../queryKeys'

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => reviewService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all })
    },
  })
}
