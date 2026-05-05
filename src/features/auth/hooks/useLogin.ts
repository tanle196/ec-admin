// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/api/authService'

// login
export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  })
}
