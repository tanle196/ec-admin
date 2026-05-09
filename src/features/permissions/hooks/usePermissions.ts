import { useQuery } from '@tanstack/react-query'
import { permissionService } from '../api/permissionService'
import { permissionKeys } from '../queryKeys'

export const usePermissions = () => {
  return useQuery({
    queryKey: permissionKeys.list(),
    queryFn: ({ signal }) => permissionService.getList({ signal }),
  })
}
