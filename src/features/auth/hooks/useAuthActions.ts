import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { setCookie } from '@/lib/cookies'
import { REFRESH_TOKEN } from '@/constants/cookies'
import { useProfile } from '@/features/users/hooks/useProfile'
import { userKeys } from '@/features/users/queryKeys'
import { useLogin } from './useLogin'

export const useAuthActions = () => {
  const { mutateAsync: login, isPending } = useLogin()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { auth } = useAuthStore()
  const { refetch: getUserProfile, isFetching: isFetchingProfile } = useProfile({ enabled: false })
  const setUser = useAuthStore((s) => s.auth.setUser)

  const isLoading = isPending || isFetchingProfile

  const handleLogin = async (
    data: { email: string; password: string },
    redirectTo?: string
  ) => {
    const loginFlow = (async () => {
      const { accessToken, refreshToken } = await login({ body: data })

      if (accessToken) {
        auth.setAccessToken(accessToken)
      }
      if (refreshToken) {
        setCookie(REFRESH_TOKEN, JSON.stringify(refreshToken))
      }

      try {
        const { data: profile } = await getUserProfile()
        if (profile) {
          setUser({ name: profile.name, email: profile.email, role: profile.roles })
        }
      } catch {
        auth.reset()
        throw new Error('Failed to load user profile')
      }
    })()

    toast.promise(loginFlow, {
      id: 'login',
      loading: 'Signing in...',
      success: 'Welcome back!',
      error: 'Login failed',
    })

    try {
      await loginFlow
      navigate({ to: redirectTo || '/', replace: true })
    } catch {
      //noop - toast.promise handles error display
    }
  }

  const handleLogout = () => {
    auth.reset()
    queryClient.removeQueries({ queryKey: userKeys.profile() })
    navigate({ to: '/sign-in' })
  }

  return {
    handleLogin,
    handleLogout,
    isLoading,
  }
}
