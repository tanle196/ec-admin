// hooks/auth/useProfile.ts
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { userService } from '@/features/users/api/userService'
import { userKeys } from '@/features/users/queryKeys'

export const useProfile = (options?: { enabled?: boolean }) => {
  const { auth } = useAuthStore()

  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: ({ signal }) => userService.getProfile({ signal }),
    enabled: options?.enabled ?? (!!auth.accessToken && !auth.user),
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
