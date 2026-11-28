export const bannerKeys = {
  all: ['banners'] as const,
  list: (query?: object) => [...bannerKeys.all, 'list', query] as const,
}
