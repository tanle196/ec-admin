import { useQuery } from '@tanstack/react-query'
import { reviewService } from '../api/reviewService'
import { reviewKeys } from '../queryKeys'

type ReviewListQuery = {
  page?: number
  limit?: number
}

export const useReviews = (query?: ReviewListQuery) => {
  return useQuery({
    queryKey: reviewKeys.list(query),
    queryFn: () => reviewService.getList({ query }),
  })
}
