import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateAddressDto } from '@/api/main'
import { addressService } from '../api/addressService'
import { addressKeys } from '../queryKeys'

export const useCreateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateAddressDto) => addressService.create({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}
