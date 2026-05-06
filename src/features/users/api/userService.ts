import { usersControllerFindAll, usersControllerGetProfile } from '@/api/main'
import { mainService } from '@/lib/api/client'

export const userService = {
  getList: mainService.request(usersControllerFindAll),
  getProfile: mainService.request(usersControllerGetProfile),
}
