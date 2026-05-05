import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { setCookie } from '@/lib/cookies'
import { sleep } from '@/lib/utils'
import { REFRESH_TOKEN } from '@/constants/cookies'
import { useProfile } from '@/features/users/hooks/useProfile'
import { useLogin } from './useLogin'

export const useAuthActions = () => {
  const { mutateAsync: login } = useLogin()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const { refetch: getUserProfile } = useProfile({ enabled: false })

  const handleLogin = async (
    data: { email: string; password: string },
    redirectTo?: string
  ) => {
    toast.promise(sleep(0), {
      loading: 'Signing in...',
      success: async () => {
        try {
          setIsLoading(true)
          const loginResponse = await login(data)
          const { accessToken, refreshToken } = loginResponse.data ?? {}
          if (accessToken) {
            auth.setAccessToken(accessToken)
          }

          if (refreshToken) {
            setCookie(REFRESH_TOKEN, JSON.stringify(refreshToken))
          }

          await getUserProfile()

          // Redirect to the stored location or default to dashboard
          const targetPath = redirectTo || '/'
          navigate({ to: targetPath, replace: true })

          return `Welcome back, ${data.email}!`
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          //noop
        } finally {
          setIsLoading(false)
        }
      },
      error: 'Error',
    })
  }

  const handleLogout = () => {
    auth.reset()
    navigate({ to: '/sign-in' })
  }

  return {
    handleLogin,
    handleLogout,
    isLoading,
  }
}
