import { authControllerLogin, type LoginDto } from '@/api/main'

export const loggedInService = async (body: LoginDto) => {
  return authControllerLogin({ body })
}
