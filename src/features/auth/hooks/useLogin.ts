// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query'
import { loggedInService } from '@/services/authService'

// login
export const useLogin = () => {
  return useMutation({
    mutationFn: loggedInService,
  })
}
