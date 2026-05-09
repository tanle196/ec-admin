import {
  rolesControllerFindAll,
  rolesControllerCreateRole,
  rolesControllerFindOne,
  rolesControllerUpdate,
  rolesControllerRemove,
  rolesControllerAssignPermissions,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const roleService = {
  getList: mainService.request(rolesControllerFindAll),
  findOne: mainService.request(rolesControllerFindOne),
  create: mainService.request(rolesControllerCreateRole),
  update: mainService.request(rolesControllerUpdate),
  remove: mainService.request(rolesControllerRemove),
  assignPermissions: mainService.request(rolesControllerAssignPermissions),
}
