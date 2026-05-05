import {
  type UserListQueryDto,
  usersControllerFindAll,
  usersControllerGetProfile,
} from '@/api/main'
import { apiClient } from '@/lib/api/client'

export const userService = {
  getList: (query: UserListQueryDto) =>
    usersControllerFindAll({ query, client: apiClient }),

  getProfile:()=> usersControllerGetProfile({ client: apiClient }),
}
