import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roleService } from '../api/roleService'
import { roleKeys } from '../queryKeys'

export const useAssignRolePermissions = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, permissionIds }: { id: string; permissionIds: string[] }) =>
      roleService.assignPermissions({ path: { id }, body: { permissionIds } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all })
    },
  })
}
