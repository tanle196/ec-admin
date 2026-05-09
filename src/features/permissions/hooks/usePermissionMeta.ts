import { useQuery } from '@tanstack/react-query'
import { permissionService } from '../api/permissionService'
import { permissionKeys } from '../queryKeys'

export const usePermissionMeta = () => {
  return useQuery({
    queryKey: permissionKeys.meta(),
    queryFn: ({ signal }) => permissionService.getMeta({ signal }),
  })
}
