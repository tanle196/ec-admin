import { createClient } from '@/api/main/client'

export const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
})
// src/api/clientFactory.ts

const getToken = () => getCookie(ACCESS_TOKEN)

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
