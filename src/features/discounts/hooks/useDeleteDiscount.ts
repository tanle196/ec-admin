import { useMutation, useQueryClient } from '@tanstack/react-query'
import { discountService } from '../api/discountService'
import { discountKeys } from '../queryKeys'

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => discountService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountKeys.all })
    },
  })
}
