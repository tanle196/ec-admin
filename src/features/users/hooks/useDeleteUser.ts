import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../api/userService'
import { userKeys } from '../queryKeys'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => userService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
