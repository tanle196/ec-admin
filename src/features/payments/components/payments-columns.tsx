import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type PaymentListItem, type PaymentStatus, type PaymentMethod } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const statusVariant: Record<PaymentStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  completed: 'default',
  failed: 'destructive',
  refunded: 'outline',
}

const statusLabel: Record<PaymentStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
}

const methodLabel: Record<PaymentMethod, string> = {
  cod: 'COD',
  vnpay: 'VNPay',
  momo: 'MoMo',
  zalopay: 'ZaloPay',
  stripe: 'Stripe',
  bank_transfer: 'Bank Transfer',
}

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

export const paymentsColumns: ColumnDef<PaymentListItem>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payment ID' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs text-muted-foreground'>{row.getValue('id')}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'order_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order ID' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs text-muted-foreground'>{row.getValue('order_id')}</span>
    ),
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Method' />
    ),
    cell: ({ row }) => {
      const method = row.getValue('method') as PaymentMethod
      return <span className='text-sm'>{methodLabel[method]}</span>
    },
    meta: { className: 'w-32' },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as PaymentStatus
      return (
        <Badge variant={statusVariant[status]}>
          {statusLabel[status]}
        </Badge>
      )
    },
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => (
      <span className='text-sm font-medium'>{formatVND(row.getValue('amount'))}</span>
    ),
    meta: { className: 'w-36' },
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
