import {
  type UserListQueryDto,
  usersControllerFindAll,
  usersControllerGetProfile,
} from '@/api/main'

export const getUserList = (query: UserListQueryDto) => {
  return usersControllerFindAll({ query })
}

export const getProfile = () => {
  return usersControllerGetProfile()
}
