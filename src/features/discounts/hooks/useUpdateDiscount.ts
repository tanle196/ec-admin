import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateDiscountDto } from '@/api/main'
import { discountService } from '../api/discountService'
import { discountKeys } from '../queryKeys'

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateDiscountDto }) =>
      discountService.update({ path: { id }, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountKeys.all })
    },
  })
}
