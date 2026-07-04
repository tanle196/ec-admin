import {
  type TagResponseDto,
  adminTagsControllerCreateTag,
  adminTagsControllerRemoveTag,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const tagService = {
  // Blocked: the admin API has no list endpoint for tags yet (only create/remove).
  getList: async (..._args: unknown[]): Promise<TagResponseDto[]> => {
    throw new Error('Listing tags is not available in the admin API yet')
  },
  create: mainService.request(adminTagsControllerCreateTag),
  remove: mainService.request(adminTagsControllerRemoveTag),
}
