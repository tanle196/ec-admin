export const reviewKeys = {
  all: ['reviews'] as const,
  list: (query?: object) => [...reviewKeys.all, 'list', query] as const,
  detail: (id: string) => [...reviewKeys.all, id] as const,
}
