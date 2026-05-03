import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/services/userService'

export const useProfile = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isLoggedIn,
  })
}
