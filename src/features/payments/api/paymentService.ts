import {
  paymentsControllerFindAll,
  paymentsControllerFindOne,
  paymentsControllerUpdateStatus,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const paymentService = {
  getList: mainService.request(paymentsControllerFindAll),
  findOne: mainService.request(paymentsControllerFindOne),
  updateStatus: mainService.request(paymentsControllerUpdateStatus),
}
