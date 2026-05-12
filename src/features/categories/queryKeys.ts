export const categoryKeys = {
  all: ['categories'] as const,
  list: (query?: object) => [...categoryKeys.all, 'list', query] as const,
  tree: () => [...categoryKeys.all, 'tree'] as const,
  detail: (id: string) => [...categoryKeys.all, id] as const,
}
