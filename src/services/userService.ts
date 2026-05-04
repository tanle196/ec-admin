import {
  type UserListQueryDto,
  usersControllerFindAll,
  usersControllerGetProfile,
} from '@/api/main'

export const getUserListService = (query: UserListQueryDto) => {
  return usersControllerFindAll({ query })
}

export const getProfileService = () => {
  return usersControllerGetProfile()
}
