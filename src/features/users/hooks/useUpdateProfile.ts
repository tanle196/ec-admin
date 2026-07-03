import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { userService } from '../api/userService'
import { userKeys } from '../queryKeys'

export const useUpdateProfile = () => {
  const { auth } = useAuthStore()
  const setUser = useAuthStore((s) => s.auth.setUser)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { fullName: string }) => {
      if (!auth.user?.id) throw new Error('User ID not available')
      return userService.updateProfile(auth.user.id, {
        fullName: data.fullName,
      })
    },
    onSuccess: (_, variables) => {
      if (auth.user) {
        setUser({ ...auth.user, name: variables.fullName })
      }
      queryClient.invalidateQueries({ queryKey: userKeys.profile() })
    },
  })
}
