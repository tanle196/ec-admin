import {
  adminUsersControllerFindAll,
  adminUsersControllerFindOne,
  adminUsersControllerUpdate,
  adminUsersControllerRemove,
  adminUsersControllerAssignRoles,
  adminAuthControllerMe,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const userService = {
  getList: mainService.request(adminUsersControllerFindAll),
  getProfile: mainService.request(adminAuthControllerMe),
  findOne: mainService.request(adminUsersControllerFindOne),
  remove: mainService.request(adminUsersControllerRemove),
  assignRoles: mainService.request(adminUsersControllerAssignRoles),
  updateProfile: (id: string, body: { fullName: string }) =>
    mainService.request(adminUsersControllerUpdate)({
      path: { id },
      // The OpenAPI spec omits the body type for this endpoint; cast to satisfy TS
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: body as any,
    }),
}
