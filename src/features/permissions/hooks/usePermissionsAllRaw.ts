import { useQuery } from '@tanstack/react-query'
import { permissionService } from '../api/permissionService'
import { permissionKeys } from '../queryKeys'

export const usePermissionsAllRaw = () => {
  return useQuery({
    queryKey: permissionKeys.allRaw(),
    queryFn: ({ signal }) => permissionService.getAllRaw({ signal }),
  })
}
