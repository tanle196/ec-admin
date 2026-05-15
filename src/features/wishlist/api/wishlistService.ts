import {
  wishlistsControllerGetWishlist,
  wishlistsControllerAddProduct,
  wishlistsControllerRemoveProduct,
  wishlistsControllerClearWishlist,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const wishlistService = {
  getWishlist: mainService.request(wishlistsControllerGetWishlist),
  addProduct: mainService.request(wishlistsControllerAddProduct),
  removeProduct: mainService.request(wishlistsControllerRemoveProduct),
  clearWishlist: mainService.request(wishlistsControllerClearWishlist),
}
