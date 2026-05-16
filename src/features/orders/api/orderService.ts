import {
  ordersControllerCancel,
  ordersControllerFindAll,
  ordersControllerFindOne,
  ordersControllerUpdateStatus,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const orderService = {
  getList: mainService.request(ordersControllerFindAll),
  findOne: mainService.request(ordersControllerFindOne),
  updateStatus: mainService.request(ordersControllerUpdateStatus),
  cancel: mainService.request(ordersControllerCancel),
}
