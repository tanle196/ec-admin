import {
  adminBannersControllerFindAll,
  adminBannersControllerCreate,
  adminBannersControllerUpdate,
  adminBannersControllerRemove,
  adminBannersControllerUploadImage,
  adminBannersControllerReorder,
  adminMediaControllerUploadOne,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const bannerService = {
  getList: mainService.request(adminBannersControllerFindAll),
  create: mainService.request(adminBannersControllerCreate),
  update: mainService.request(adminBannersControllerUpdate),
  uploadImage: mainService.request(adminBannersControllerUploadImage),
  // 204 No Content endpoints
  remove: mainService.requestVoid(adminBannersControllerRemove),
  reorder: mainService.requestVoid(adminBannersControllerReorder),
  uploadMedia: mainService.request(adminMediaControllerUploadOne),
}
