import {
  adminPaymentsControllerCreateRefund,
  adminPaymentsControllerFindAll,
  adminPaymentsControllerFindOne,
  adminPaymentsControllerFindRefunds,
  adminPaymentsControllerUpdateStatus,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const paymentService = {
  getList: mainService.request(adminPaymentsControllerFindAll),
  findOne: mainService.request(adminPaymentsControllerFindOne),
  updateStatus: mainService.request(adminPaymentsControllerUpdateStatus),
  findRefunds: mainService.request(adminPaymentsControllerFindRefunds),
  createRefund: mainService.request(adminPaymentsControllerCreateRefund),
}
