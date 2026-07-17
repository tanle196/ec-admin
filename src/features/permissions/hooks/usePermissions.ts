import { useQuery } from '@tanstack/react-query'
import { type AdminPermissionsControllerFindAllData } from '@/api/main'
import { permissionService } from '../api/permissionService'
import { permissionKeys } from '../queryKeys'

export const usePermissions = (
  query?: AdminPermissionsControllerFindAllData['query']
) => {
  return useQuery({
    queryKey: permissionKeys.list(query),
    queryFn: ({ signal }) => permissionService.getList({ query, signal }),
  })
}
