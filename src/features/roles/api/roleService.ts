import {
  adminRolesControllerFindAll,
  adminRolesControllerCreateRole,
  adminRolesControllerFindOne,
  adminRolesControllerUpdate,
  adminRolesControllerRemove,
  adminRolesControllerAssignPermissions,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const roleService = {
  getList: mainService.request(adminRolesControllerFindAll),
  findOne: mainService.request(adminRolesControllerFindOne),
  create: mainService.request(adminRolesControllerCreateRole),
  update: mainService.request(adminRolesControllerUpdate),
  remove: mainService.request(adminRolesControllerRemove),
  assignPermissions: mainService.request(adminRolesControllerAssignPermissions),
}
