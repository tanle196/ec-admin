import { useQuery } from '@tanstack/react-query'
import { getUserList } from '@/services/userService'
import { type UserListQueryDto } from '@/api/main'

export const useUsers = (query: UserListQueryDto) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => getUserList(query),
  })
}
