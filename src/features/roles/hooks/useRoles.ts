import { useQuery } from '@tanstack/react-query'
import { roleService } from '../api/roleService'
import { roleKeys } from '../queryKeys'

export const useRoles = () => {
  return useQuery({
    queryKey: roleKeys.list(),
    queryFn: () => roleService.getList(),
  })
}
