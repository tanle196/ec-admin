import {
  cartsControllerGetCart,
  cartsControllerAddItem,
  cartsControllerRemoveItem,
  cartsControllerUpdateItem,
  cartsControllerClearCart,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const cartService = {
  getCart: mainService.request(cartsControllerGetCart),
  addItem: mainService.request(cartsControllerAddItem),
  removeItem: mainService.request(cartsControllerRemoveItem),
  updateItem: mainService.request(cartsControllerUpdateItem),
  clearCart: mainService.request(cartsControllerClearCart),
}
