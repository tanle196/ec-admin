import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type UpdateRoleDto } from '@/api/main'
import { roleService } from '../api/roleService'
import { roleKeys } from '../queryKeys'

export const useUpdateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateRoleDto }) =>
      roleService.update({ path: { id }, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all })
    },
  })
}
