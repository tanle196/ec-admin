import { useQuery } from '@tanstack/react-query'
import { type UserListQueryDto } from '@/api/main'
import { userService } from '@/features/users/api/userService'
import { userKeys } from '@/features/users/queryKeys'

export const useUsers = (query: UserListQueryDto) => {
  return useQuery({
    queryKey: userKeys.list(query),
    queryFn: () => userService.getList({ query }),
  })
}
