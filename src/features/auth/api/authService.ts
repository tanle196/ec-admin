import {
  authControllerForgotPassword,
  authControllerLogin,
  authControllerResetPassword,
  authControllerRegister,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const authService = {
  login: mainService.request(authControllerLogin),
  register: mainService.request(authControllerRegister),
  forgetPassword: mainService.request(authControllerForgotPassword),
  resetPassword: mainService.request(authControllerResetPassword),
}
