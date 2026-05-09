import {
  usersControllerFindAll,
  usersControllerFindOne,
  usersControllerGetProfile,
  usersControllerRemove,
  usersControllerAssignRoles,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const userService = {
  getList: mainService.request(usersControllerFindAll),
  getProfile: mainService.request(usersControllerGetProfile),
  findOne: mainService.request(usersControllerFindOne),
  remove: mainService.request(usersControllerRemove),
  assignRoles: mainService.request(usersControllerAssignRoles),
}
