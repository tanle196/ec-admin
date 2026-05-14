export const orderKeys = {
  all: ['orders'] as const,
  list: (query?: object) => [...orderKeys.all, 'list', query] as const,
  detail: (id: string) => [...orderKeys.all, id] as const,
}
