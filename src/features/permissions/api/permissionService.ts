import {
  permissionsControllerFindAll,
  permissionsControllerCreate,
  permissionsControllerFindOne,
  permissionsControllerUpdate,
  permissionsControllerRemove,
  permissionsControllerGetMeta,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const permissionService = {
  getList: mainService.request(permissionsControllerFindAll),
  getMeta: mainService.request(permissionsControllerGetMeta),
  findOne: mainService.request(permissionsControllerFindOne),
  create: mainService.request(permissionsControllerCreate),
  update: mainService.request(permissionsControllerUpdate),
  remove: mainService.request(permissionsControllerRemove),
}
