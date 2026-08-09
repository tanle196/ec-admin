export const paymentKeys = {
  all: ['payments'] as const,
  list: (query?: object) => [...paymentKeys.all, 'list', query] as const,
  detail: (id: string) => [...paymentKeys.all, id] as const,
  refunds: (id: string) => [...paymentKeys.all, id, 'refunds'] as const,
}
