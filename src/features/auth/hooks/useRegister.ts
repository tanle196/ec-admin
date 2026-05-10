import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/api/authService'

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  })
}
