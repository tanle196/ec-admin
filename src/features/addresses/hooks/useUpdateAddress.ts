import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateAddressDto } from '@/api/main'
import { addressService } from '../api/addressService'
import { addressKeys } from '../queryKeys'

export const useUpdateAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateAddressDto }) =>
      addressService.update({ path: { id }, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}
