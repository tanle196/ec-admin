import {
  adminRefundRequestsControllerApprove,
  adminRefundRequestsControllerFindAll,
  adminRefundRequestsControllerFindOne,
  adminRefundRequestsControllerReject,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const refundRequestService = {
  getList: mainService.request(adminRefundRequestsControllerFindAll),
  findOne: mainService.request(adminRefundRequestsControllerFindOne),
  approve: mainService.request(adminRefundRequestsControllerApprove),
  reject: mainService.request(adminRefundRequestsControllerReject),
}
