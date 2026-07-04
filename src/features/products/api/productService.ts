import {
  adminProductsControllerFindAll,
  adminProductsControllerFindOne,
  adminProductsControllerCreate,
  adminProductsControllerUpdate,
  adminProductsControllerRemove,
  adminProductsControllerAddImage,
  adminProductsControllerUploadImage,
  adminProductsControllerRemoveImage,
  adminProductsControllerAddVariant,
  adminProductsControllerRemoveVariant,
  adminProductsControllerUpdateVariant,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const productService = {
  getList: mainService.request(adminProductsControllerFindAll),
  findOne: mainService.request(adminProductsControllerFindOne),
  create: mainService.request(adminProductsControllerCreate),
  update: mainService.request(adminProductsControllerUpdate),
  remove: mainService.request(adminProductsControllerRemove),
  addImage: mainService.request(adminProductsControllerAddImage),
  uploadImage: mainService.request(adminProductsControllerUploadImage),
  removeImage: mainService.request(adminProductsControllerRemoveImage),
  addVariant: mainService.request(adminProductsControllerAddVariant),
  removeVariant: mainService.request(adminProductsControllerRemoveVariant),
  updateVariant: mainService.request(adminProductsControllerUpdateVariant),
}
