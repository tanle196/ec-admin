import {
  categoriesControllerFindAll,
  categoriesControllerFindTree,
  categoriesControllerCreate,
  categoriesControllerFindOne,
  categoriesControllerUpdate,
  categoriesControllerRemove,
  categoriesControllerUploadImage,
  categoriesControllerRemoveImage,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const categoryService = {
  getList: mainService.request(categoriesControllerFindAll),
  getTree: mainService.request(categoriesControllerFindTree),
  findOne: mainService.request(categoriesControllerFindOne),
  create: mainService.request(categoriesControllerCreate),
  update: mainService.request(categoriesControllerUpdate),
  remove: mainService.request(categoriesControllerRemove),
  uploadImage: mainService.request(categoriesControllerUploadImage),
  removeImage: mainService.request(categoriesControllerRemoveImage),
}
