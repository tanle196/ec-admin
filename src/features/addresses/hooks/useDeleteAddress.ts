import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addressService } from '../api/addressService'
import { addressKeys } from '../queryKeys'

export const useDeleteAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => addressService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all })
    },
  })
}
