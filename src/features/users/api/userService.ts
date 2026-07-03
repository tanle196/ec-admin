import {
  usersControllerFindAll,
  usersControllerFindOne,
  usersControllerGetProfile,
  usersControllerUpdate,
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
  updateProfile: (id: string, body: { fullName: string }) =>
    mainService.request(usersControllerUpdate)({
      path: { id },
      // The OpenAPI spec omits the body type for this endpoint; cast to satisfy TS
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: body as any,
    }),
}
