import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useProfile } from './useProfile'

export const useSyncUser = () => {
  const { auth } = useAuthStore()
  const { data: profile, isLoading } = useProfile()

  useEffect(() => {
    if (!profile?.data) return
    if (auth.user?.email === profile.data.email) return

    auth.setUser({
      name: profile.data.name,
      email: profile.data.email,
      role: profile.data.roles,
      accountNo: '1111',
      exp: 123,
    })
  }, [auth, profile?.data])

  return { isLoading }
}
