import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tagService } from '../api/tagService'
import { tagKeys } from '../queryKeys'

export const useDeleteTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tagService.remove({ path: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.all })
    },
  })
}
