import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateDiscountDto } from '@/api/main'
import { discountService } from '../api/discountService'
import { discountKeys } from '../queryKeys'

export const useCreateDiscount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateDiscountDto) => discountService.create({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountKeys.all })
    },
  })
}
