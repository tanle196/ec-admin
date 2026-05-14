import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type OrderListItem, type OrderStatus } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  confirmed: 'default',
  processing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
  refunded: 'outline',
}

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
}

export const ordersColumns: ColumnDef<OrderListItem>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order #' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs font-medium'>{row.getValue('orderNumber')}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as OrderStatus
      return (
        <Badge variant={statusVariant[status]}>
          {statusLabel[status]}
        </Badge>
      )
    },
    meta: { className: 'w-32' },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const total = row.getValue('total') as number
      return (
        <span className='text-sm font-medium'>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
        </span>
      )
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'user_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User ID' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs text-muted-foreground'>{row.getValue('user_id')}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return (
        <span className='text-sm text-muted-foreground'>
          {format(date, 'dd/MM/yyyy HH:mm')}
        </span>
      )
    },
    meta: { className: 'w-40' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
