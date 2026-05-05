import { authControllerLogin, type LoginDto } from '@/api/main'
import { apiClient } from '@/lib/api/client'

export const authService = {
  login: async (body: LoginDto) =>
    authControllerLogin({ body, client: apiClient }),
}
