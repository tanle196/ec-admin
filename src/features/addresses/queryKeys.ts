export const addressKeys = {
  all: ['addresses'] as const,
  list: () => [...addressKeys.all, 'list'] as const,
  detail: (id: string) => [...addressKeys.all, id] as const,
}
