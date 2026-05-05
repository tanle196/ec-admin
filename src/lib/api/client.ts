import { createClient } from '@/api/main/client'
import { getCookie } from '@/lib/cookies'
import { ACCESS_TOKEN } from '@/constants/cookies'

const getToken = () => {
  const token = getCookie(ACCESS_TOKEN)
  if (!token) return undefined

  try {
    return JSON.parse(token) // bỏ dấu "" nếu có
  } catch {
    return token // không có dấu "" thì dùng thẳng
  }
}

export const createApiClient = () => {
  const client = createClient({
    baseURL: import.meta.env.VITE_API_URL,
  })

  client.instance.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
  })

  return client
}

export const apiClient = createApiClient()
