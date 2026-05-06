import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { setCookie } from '@/lib/cookies'
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
    try {
      setIsLoading(true)
      const loginPromise = login({ body: data })
      toast.promise(loginPromise, {
        id: 'login',
        loading: 'Signing in...',
        success: 'Welcome back!',
        error: 'Login failed',
      })
      const { accessToken, refreshToken } = await loginPromise

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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //noop
    } finally {
      setIsLoading(false)
    }
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
