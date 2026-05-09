import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreatePermissionDto } from '@/api/main'
import { permissionService } from '../api/permissionService'
import { permissionKeys } from '../queryKeys'

export const useCreatePermission = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreatePermissionDto) =>
      permissionService.create({ body }),
    meta: { suppressErrorToast: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.all })
    },
  })
}
