import {
  adminCategoriesControllerFindAll,
  adminCategoriesControllerFindTree,
  adminCategoriesControllerFindOne,
  adminCategoriesControllerCreate,
  adminCategoriesControllerUpdate,
  adminCategoriesControllerRemove,
  adminCategoriesControllerUploadImage,
  adminCategoriesControllerRemoveImage,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const categoryService = {
  getList: mainService.request(adminCategoriesControllerFindAll),
  getTree: mainService.request(adminCategoriesControllerFindTree),
  findOne: mainService.request(adminCategoriesControllerFindOne),
  create: mainService.request(adminCategoriesControllerCreate),
  update: mainService.request(adminCategoriesControllerUpdate),
  remove: mainService.request(adminCategoriesControllerRemove),
  uploadImage: mainService.request(adminCategoriesControllerUploadImage),
  removeImage: mainService.request(adminCategoriesControllerRemoveImage),
}
