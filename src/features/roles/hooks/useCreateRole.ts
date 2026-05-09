import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateRoleDto } from '@/api/main'
import { roleService } from '../api/roleService'
import { roleKeys } from '../queryKeys'

export const useCreateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateRoleDto) => roleService.create({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all })
    },
  })
}
