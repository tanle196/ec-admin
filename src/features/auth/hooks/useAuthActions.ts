import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { sleep } from '@/lib/utils'
import { useLogin } from './useLogin'
import { useProfile } from './useProfile'

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync: login } = useLogin()
  const { refetch: getProfile } = useProfile()
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const handleLogin = async (
    data: { email: string; password: string },
    redirectTo?: string
  ) => {
    try {
      toast.promise(sleep(1000), {
        loading: 'Signing in...',
        success: async () => {
          setIsLoading(true)
          const loginResponse = await login(data)
          const { accessToken, refreshToken } = loginResponse.data ?? {}
          const profile = await getProfile()

          if (accessToken) {
            auth.setAccessToken(accessToken)
          }

          if (refreshToken) {
            auth.setRefreshToken(refreshToken)
          }

          if (profile.data?.data) {
            const { email, roles } = profile.data.data
            auth.setUser({
              email,
              role: roles,
              accountNo: '123',
              exp: 123,
            })
          }

          // Redirect to the stored location or default to dashboard
          const targetPath = redirectTo || '/'
          navigate({ to: targetPath, replace: true })

          return `Welcome back, ${data.email}!`
        },
        error: 'Error',
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //noop
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleLogin,
    isLoading,
  }
}
