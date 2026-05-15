import {
  reviewsControllerFindAll,
  reviewsControllerApprove,
  reviewsControllerRemove,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const reviewService = {
  getList: mainService.request(reviewsControllerFindAll),
  approve: mainService.request(reviewsControllerApprove),
  remove: mainService.request(reviewsControllerRemove),
}
