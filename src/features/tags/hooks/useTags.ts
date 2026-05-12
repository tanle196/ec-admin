import { useQuery } from '@tanstack/react-query'
import { tagService } from '../api/tagService'
import { tagKeys } from '../queryKeys'

export const useTags = () => {
  return useQuery({
    queryKey: tagKeys.list(),
    queryFn: () => tagService.getList(),
  })
}
