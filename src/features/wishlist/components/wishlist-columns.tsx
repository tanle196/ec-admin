import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type WishlistItem } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  published: 'default',
  draft: 'secondary',
  archived: 'outline',
}

export const wishlistColumns: ColumnDef<WishlistItem>[] = [
  {
    accessorKey: 'product.name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.product.name}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'product.sku',
    id: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs text-muted-foreground'>
        {row.original.product.sku}
      </span>
    ),
  },
  {
    accessorKey: 'product.basePrice',
    id: 'basePrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => (
      <span className='text-sm'>{formatVND(row.original.product.basePrice)}</span>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'product.status',
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.original.product.status
      return (
        <Badge variant={statusVariant[status] ?? 'outline'} className='capitalize'>
          {status}
        </Badge>
      )
    },
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Added' />
    ),
    cell: ({ row }) => (
      <span className='text-sm text-muted-foreground'>
        {row.original.createdAt.toLocaleDateString()}
      </span>
    ),
    meta: { className: 'w-32' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
