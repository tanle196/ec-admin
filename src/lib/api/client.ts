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

const createApiClient = () => {
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

const apiClient = createApiClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFn = (params: any) => Promise<any>

const createService = (client: typeof apiClient) => ({
  request:
    <F extends ApiFn>(fn: F) =>
    async (
      options: Parameters<F>[0]
    ): Promise<NonNullable<Awaited<ReturnType<F>>['data']>> => {
      const res = await fn({
        ...options,
        client,
      })

      if (res.data) return res.data
      throw res.error
    },
})
export const mainService = createService(apiClient)
