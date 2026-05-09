import { type UserListQueryDto } from '@/api/main'

export const userKeys = {
  all: ['users'] as const,
  list: (query: UserListQueryDto) => [...userKeys.all, query] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
  profile: () => ['profile'] as const,
}
