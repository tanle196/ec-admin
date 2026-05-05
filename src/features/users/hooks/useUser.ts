import { useQuery } from '@tanstack/react-query'
import { type UserListQueryDto } from '@/api/main'
import { userService } from '@/features/users/api/userService'

export const useUsers = (query: UserListQueryDto) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => userService.getList(query),
  })
}
