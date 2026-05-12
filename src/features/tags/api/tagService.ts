import {
  tagsControllerFindAllTags,
  tagsControllerCreateTag,
  tagsControllerRemoveTag,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const tagService = {
  getList: mainService.request(tagsControllerFindAllTags),
  create: mainService.request(tagsControllerCreateTag),
  remove: mainService.request(tagsControllerRemoveTag),
}
