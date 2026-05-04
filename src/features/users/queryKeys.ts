import { type UserListQueryDto } from '@/api/main'

// queryKeys.ts
export const userKeys = {
  all: ['users'] as const,
  list: (query: UserListQueryDto) => [...userKeys.all, query] as const,
  profile: () => ['profile'] as const,
}
