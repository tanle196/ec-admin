import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../api/userService'
import { userKeys } from '../queryKeys'

export const useAssignUserRoles = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, roleIds }: { id: string; roleIds: string[] }) =>
      userService.assignRoles({ path: { id }, body: { roleIds } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
