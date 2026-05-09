import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roleService } from '../api/roleService'
import { roleKeys } from '../queryKeys'

export const useDeleteRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => roleService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all })
    },
  })
}
