import {
  addressesControllerFindAll,
  addressesControllerCreate,
  addressesControllerUpdate,
  addressesControllerRemove,
  addressesControllerSetDefault,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const addressService = {
  getList: mainService.request(addressesControllerFindAll),
  create: mainService.request(addressesControllerCreate),
  update: mainService.request(addressesControllerUpdate),
  remove: mainService.request(addressesControllerRemove),
  setDefault: mainService.request(addressesControllerSetDefault),
}
