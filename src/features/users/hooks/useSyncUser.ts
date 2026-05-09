import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useProfile } from './useProfile'

export const useSyncUser = () => {
  const { auth } = useAuthStore()
  const { data: profile, isLoading } = useProfile()

  useEffect(() => {
    if (!profile) return
    if (auth.user?.email === profile.email) return

    auth.setUser({
      name: profile.name,
      email: profile.email,
      role: profile.roles,
      accountNo: '1111',
      exp: 123,
    })
  }, [auth, profile])

  return { isLoading }
}
