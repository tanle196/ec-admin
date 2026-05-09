import { useMutation, useQueryClient } from '@tanstack/react-query'
import { permissionService } from '../api/permissionService'
import { permissionKeys } from '../queryKeys'

export const useDeletePermission = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => permissionService.remove({ path: { id } }),
    meta: { suppressErrorToast: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.all })
    },
  })
}
