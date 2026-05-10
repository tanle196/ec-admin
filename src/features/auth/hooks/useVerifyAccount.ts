import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/api/authService'

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: authService.verifyAccount,
  })
}
