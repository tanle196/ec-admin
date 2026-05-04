import { client } from '@/lib/api/client'
import { getCookie } from '@/lib/cookies'
import { ACCESS_TOKEN } from '@/constants/cookies'

client.instance.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})
