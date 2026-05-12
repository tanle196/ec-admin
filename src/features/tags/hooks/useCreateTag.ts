import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreateTagDto } from '@/api/main'
import { tagService } from '../api/tagService'
import { tagKeys } from '../queryKeys'

export const useCreateTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateTagDto) => tagService.create({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.all })
    },
  })
}
