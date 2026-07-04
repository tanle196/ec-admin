import {
  adminPermissionsControllerFindAll,
  adminPermissionsControllerCreate,
  adminPermissionsControllerFindOne,
  adminPermissionsControllerUpdate,
  adminPermissionsControllerRemove,
  adminPermissionsControllerGetMeta,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const permissionService = {
  getList: mainService.request(adminPermissionsControllerFindAll),
  getMeta: mainService.request(adminPermissionsControllerGetMeta),
  findOne: mainService.request(adminPermissionsControllerFindOne),
  create: mainService.request(adminPermissionsControllerCreate),
  update: mainService.request(adminPermissionsControllerUpdate),
  remove: mainService.request(adminPermissionsControllerRemove),
}
