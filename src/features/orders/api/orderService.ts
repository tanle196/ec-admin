import {
  adminOrdersControllerFindAll,
  adminOrdersControllerFindOne,
  adminOrdersControllerUpdateStatus,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const orderService = {
  getList: mainService.request(adminOrdersControllerFindAll),
  findOne: mainService.request(adminOrdersControllerFindOne),
  updateStatus: mainService.request(adminOrdersControllerUpdateStatus),
}
