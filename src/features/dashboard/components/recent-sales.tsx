import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { type OrderListItem, type OrderStatus } from '@/features/orders/data/schema'

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  confirmed: 'default',
  processing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
  refunded: 'outline',
}

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

interface RecentOrdersProps {
  orders: OrderListItem[]
  isLoading: boolean
}

export function RecentSales({ orders, isLoading }: RecentOrdersProps) {
  if (isLoading) {
    return (
      <div className='space-y-4'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='flex items-center justify-between gap-4'>
            <div className='space-y-1.5'>
              <Skeleton className='h-3 w-28' />
              <Skeleton className='h-3 w-20' />
            </div>
            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-4 w-24' />
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <p className='py-4 text-center text-sm text-muted-foreground'>
        No recent orders.
      </p>
    )
  }

  return (
    <div className='space-y-4'>
      {orders.map((order) => (
        <div key={order.id} className='flex items-center justify-between gap-4'>
          <div className='min-w-0'>
            <p className='truncate font-mono text-sm font-medium'>
              {order.orderNumber}
            </p>
            <p className='text-xs text-muted-foreground'>
              {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
            </p>
          </div>
          <Badge variant={statusVariant[order.status]} className='shrink-0'>
            {order.status}
          </Badge>
          <span className='shrink-0 text-sm font-medium'>
            {formatVND(order.total)}
          </span>
        </div>
      ))}
    </div>
  )
}
