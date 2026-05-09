export const permissionKeys = {
  all: ['permissions'] as const,
  list: () => [...permissionKeys.all, 'list'] as const,
  meta: () => [...permissionKeys.all, 'meta'] as const,
  detail: (id: string) => [...permissionKeys.all, id] as const,
}
