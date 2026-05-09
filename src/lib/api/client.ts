import { createClient } from '@/api/main/client'
import { getCookie } from '@/lib/cookies'
import { ACCESS_TOKEN } from '@/constants/cookies'

const getToken = () => {
  const token = getCookie(ACCESS_TOKEN)
  if (!token) return undefined

  // Token may be stored as a JSON-encoded string (e.g. `"abc"`) — unwrap if so
  if (token.startsWith('"') && token.endsWith('"')) {
    return token.slice(1, -1)
  }
  return token
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

const apiClient = createApiClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFn = (params: any) => Promise<any>

const createService = (client: typeof apiClient) => ({
  request:
    <F extends ApiFn>(fn: F) =>
    async (
      ...[options]: Parameters<F>
    ): Promise<NonNullable<Awaited<ReturnType<F>>['data']>> => {
      const res = await fn({
        ...options,
        client,
      })

      if (res.data) return res.data
      throw res
    },
})

export const mainService = createService(apiClient)
