import { type AdminPermissionsControllerFindAllData } from '@/api/main'

type PermissionListQuery = AdminPermissionsControllerFindAllData['query']

export const permissionKeys = {
  all: ['permissions'] as const,
  list: (query?: PermissionListQuery) =>
    [...permissionKeys.all, 'list', query] as const,
  allRaw: () => [...permissionKeys.all, 'all-raw'] as const,
  meta: () => [...permissionKeys.all, 'meta'] as const,
  detail: (id: string) => [...permissionKeys.all, id] as const,
}
