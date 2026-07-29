import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { adminAuthControllerRefresh } from '@/api/main'
import { createClient } from '@/api/main/client'
import { getCookie, setCookie } from '@/lib/cookies'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/cookies'
import { useAuthStore } from '@/stores/auth-store'

const REFRESH_URL = '/admin/auth/refresh'

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

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

  // Single-flight refresh: concurrent 401s share one in-flight refresh call
  // instead of each firing their own request against the refresh endpoint.
  let refreshPromise: Promise<string | undefined> | null = null

  const performRefresh = async (): Promise<string | undefined> => {
    const refreshToken = getCookie(REFRESH_TOKEN)
    if (!refreshToken) return undefined

    const res = await adminAuthControllerRefresh({
      client,
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    if (!res.data?.accessToken) return undefined

    useAuthStore.getState().auth.setAccessToken(res.data.accessToken)
    if (res.data.refreshToken) {
      setCookie(REFRESH_TOKEN, res.data.refreshToken)
    }
    return res.data.accessToken
  }

  const refreshAccessToken = () => {
    refreshPromise ??= performRefresh().finally(() => {
      refreshPromise = null
    })
    return refreshPromise
  }

  client.instance.interceptors.request.use((config) => {
    // Don't override an Authorization header a caller already set explicitly
    // (e.g. the refresh call itself, which authenticates with the refresh token).
    if (!config.headers.get('Authorization')) {
      const token = getToken()
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
    }

    return config
  })

  client.instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined
      const isRefreshCall = originalRequest?.url?.includes(REFRESH_URL)

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isRefreshCall
      ) {
        originalRequest._retry = true

        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`)
          return client.instance(originalRequest)
        }
      }

      return Promise.reject(error)
    }
  )

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
