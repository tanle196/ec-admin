import {
  adminReviewsControllerFindAll,
  adminReviewsControllerApprove,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const reviewService = {
  getList: mainService.request(adminReviewsControllerFindAll),
  approve: mainService.request(adminReviewsControllerApprove),
}
