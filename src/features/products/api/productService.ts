import {
  productsControllerFindAll,
  productsControllerFindOne,
  productsControllerCreate,
  productsControllerUpdate,
  productsControllerRemove,
  productsControllerAddImage,
  productsControllerRemoveImage,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const productService = {
  getList: mainService.request(productsControllerFindAll),
  findOne: mainService.request(productsControllerFindOne),
  create: mainService.request(productsControllerCreate),
  update: mainService.request(productsControllerUpdate),
  remove: mainService.request(productsControllerRemove),
  addImage: mainService.request(productsControllerAddImage),
  removeImage: mainService.request(productsControllerRemoveImage),
}
