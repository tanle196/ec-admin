import { useQuery } from '@tanstack/react-query'
import { type UserListQueryDto } from '@/api/main'
import { orderService } from '@/features/orders/api/orderService'
import { type OrderListItem } from '@/features/orders/data/schema'
import { orderKeys } from '@/features/orders/queryKeys'
import { userService } from '@/features/users/api/userService'
import { userKeys } from '@/features/users/queryKeys'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function buildMonthlyRevenue(orders: OrderListItem[]) {
  const currentYear = new Date().getFullYear()
  const map = new Map<number, number>(MONTHS.map((_, i) => [i, 0]))

  for (const order of orders) {
    const d = new Date(order.createdAt)
    if (d.getFullYear() === currentYear) {
      map.set(d.getMonth(), (map.get(d.getMonth()) ?? 0) + order.total)
    }
  }
  return MONTHS.map((name, i) => ({ name, total: map.get(i) ?? 0 }))
}

export function getRevenueChange(orders: OrderListItem[]): number | null {
  const now = new Date()
  const cm = now.getMonth()
  const cy = now.getFullYear()
  const prevDate = new Date(cy, cm - 1)
  const pm = prevDate.getMonth()
  const py = prevDate.getFullYear()

  const sum = (m: number, y: number) =>
    orders
      .filter((o) => {
        const d = new Date(o.createdAt)
        return d.getMonth() === m && d.getFullYear() === y
      })
      .reduce((s, o) => s + o.total, 0)

  const thisMonth = sum(cm, cy)
  const lastMonth = sum(pm, py)
  if (lastMonth === 0) return null
  return ((thisMonth - lastMonth) / lastMonth) * 100
}

export function useDashboard() {
  const recentOrdersQuery = useQuery({
    queryKey: orderKeys.list({ limit: 5 }),
    queryFn: () => orderService.getList({ query: { limit: 5 } }),
  })

  const pendingQuery = useQuery({
    queryKey: orderKeys.list({ status: 'pending', limit: 1 }),
    queryFn: () =>
      orderService.getList({ query: { status: 'pending', limit: 1 } }),
  })

  const deliveredQuery = useQuery({
    queryKey: orderKeys.list({ status: 'delivered', limit: 100 }),
    queryFn: () =>
      orderService.getList({ query: { status: 'delivered', limit: 100 } }),
  })

  const usersQuery = useQuery({
    queryKey: userKeys.list({} as UserListQueryDto),
    queryFn: () => userService.getList({ query: {} as UserListQueryDto }),
  })

  const delivered = deliveredQuery.data?.data ?? []

  return {
    recentOrders: recentOrdersQuery.data?.data ?? [],
    totalOrders: recentOrdersQuery.data?.total ?? 0,
    pendingCount: pendingQuery.data?.total ?? 0,
    totalRevenue: delivered.reduce((s, o) => s + o.total, 0),
    revenueChange: deliveredQuery.isSuccess
      ? getRevenueChange(delivered)
      : null,
    monthlyRevenue: deliveredQuery.isSuccess
      ? buildMonthlyRevenue(delivered)
      : [],
    totalUsers: usersQuery.data?.total ?? 0,
    isLoading:
      recentOrdersQuery.isLoading ||
      deliveredQuery.isLoading ||
      usersQuery.isLoading,
  }
}
