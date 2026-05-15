export const cartKeys = {
  all: ['cart'] as const,
  me: () => [...cartKeys.all, 'me'] as const,
}
