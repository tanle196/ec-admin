export const tagKeys = {
  all: ['tags'] as const,
  list: () => [...tagKeys.all, 'list'] as const,
  detail: (id: string) => [...tagKeys.all, id] as const,
}
