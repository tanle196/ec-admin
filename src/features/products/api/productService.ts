import {
  productsControllerFindAll,
  productsControllerFindOne,
  productsControllerCreate,
  productsControllerUpdate,
  productsControllerRemove,
  productsControllerAddImage,
  productsControllerUploadImage,
  productsControllerRemoveImage,
  productsControllerAddVariant,
  productsControllerRemoveVariant,
  productsControllerUpdateVariant,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const productService = {
  getList: mainService.request(productsControllerFindAll),
  findOne: mainService.request(productsControllerFindOne),
  create: mainService.request(productsControllerCreate),
  update: mainService.request(productsControllerUpdate),
  remove: mainService.request(productsControllerRemove),
  addImage: mainService.request(productsControllerAddImage),
  uploadImage: mainService.request(productsControllerUploadImage),
  removeImage: mainService.request(productsControllerRemoveImage),
  addVariant: mainService.request(productsControllerAddVariant),
  removeVariant: mainService.request(productsControllerRemoveVariant),
  updateVariant: mainService.request(productsControllerUpdateVariant),
}
