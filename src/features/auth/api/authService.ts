import {
  adminAuthControllerActive,
  adminAuthControllerForgotPassword,
  adminAuthControllerLogin,
  adminAuthControllerResetPassword,
} from '@/api/main'
import { mainService } from '@/lib/api/client'

export const authService = {
  login: mainService.request(adminAuthControllerLogin),
  // Self-registration has no admin API endpoint; admins are provisioned another way.
  register: async (_options: { body: { email: string; password: string } }): Promise<never> => {
    throw new Error('Self-registration is not available for the admin panel')
  },
  verifyAccount: mainService.request(adminAuthControllerActive),
  forgetPassword: mainService.request(adminAuthControllerForgotPassword),
  resetPassword: mainService.request(adminAuthControllerResetPassword),
}
