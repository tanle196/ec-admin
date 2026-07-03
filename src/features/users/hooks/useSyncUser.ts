import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useProfile } from './useProfile'

export const useSyncUser = () => {
  const setUser = useAuthStore((s) => s.auth.setUser)
  const currentUser = useAuthStore((s) => s.auth.user)
  const { data: profile, isLoading } = useProfile()

  useEffect(() => {
    if (!profile) return

    const isSynced =
      currentUser?.email === profile.email &&
      currentUser?.name === profile.name &&
      currentUser?.role.length === profile.roles.length &&
      currentUser?.role.every((r, i) => r === profile.roles[i])

    if (isSynced) return

    setUser({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (profile as any).id as string | undefined,
      userCode: profile.userCode,
      name: profile.name,
      email: profile.email,
      role: profile.roles,
    })
  }, [setUser, currentUser, profile])

  return { isLoading }
}
