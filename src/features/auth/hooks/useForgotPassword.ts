import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/api/authService'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgetPassword,
  })
}
