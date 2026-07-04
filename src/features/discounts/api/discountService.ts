import {
  adminDiscountsControllerFindAll,
  adminDiscountsControllerCreate,
  adminDiscountsControllerFindOne,
  adminDiscountsControllerUpdate,
  adminDiscountsControllerRemove,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const discountService = {
  getList: mainService.request(adminDiscountsControllerFindAll),
  findOne: mainService.request(adminDiscountsControllerFindOne),
  create: mainService.request(adminDiscountsControllerCreate),
  update: mainService.request(adminDiscountsControllerUpdate),
  remove: mainService.request(adminDiscountsControllerRemove),
}
