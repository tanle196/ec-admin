export const discountKeys = {
  all: ['discounts'] as const,
  list: (query?: object) => [...discountKeys.all, 'list', query] as const,
  detail: (id: string) => [...discountKeys.all, id] as const,
}
