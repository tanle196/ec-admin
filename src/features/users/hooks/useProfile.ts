// hooks/auth/useProfile.ts
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { userService } from '@/features/users/api/userService'

export const useProfile = (options?: { enabled?: boolean }) => {
  const { auth } = useAuthStore()

  return useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
    enabled: options?.enabled ?? (!!auth.accessToken && !auth.user),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
