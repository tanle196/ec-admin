export const productKeys = {
  all: ['products'] as const,
  list: (query?: object) => [...productKeys.all, 'list', query] as const,
  detail: (id: string) => [...productKeys.all, id] as const,
}
