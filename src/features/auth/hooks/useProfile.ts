import { useQuery } from '@tanstack/react-query'
import { getProfileService } from '@/services/userService'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileService,
    enabled: false, // thường chỉ gọi sau khi login
  })
}
