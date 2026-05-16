import {
  discountsControllerFindAll,
  discountsControllerCreate,
  discountsControllerFindOne,
  discountsControllerUpdate,
  discountsControllerRemove,
  discountsControllerValidate,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const discountService = {
  getList: mainService.request(discountsControllerFindAll),
  findOne: mainService.request(discountsControllerFindOne),
  create: mainService.request(discountsControllerCreate),
  update: mainService.request(discountsControllerUpdate),
  remove: mainService.request(discountsControllerRemove),
  validate: mainService.request(discountsControllerValidate),
}
