export const refundRequestKeys = {
  all: ['refund-requests'] as const,
  list: (query?: object) => [...refundRequestKeys.all, 'list', query] as const,
  detail: (id: string) => [...refundRequestKeys.all, id] as const,
}
