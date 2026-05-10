import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/api/authService'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
  })
}
