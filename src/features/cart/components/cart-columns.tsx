import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { type CartItem } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

export const cartColumns: ColumnDef<CartItem>[] = [
  {
    accessorKey: 'variant.name',
    id: 'variantName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Variant' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.variant.name}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'variant.sku',
    id: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs text-muted-foreground'>
        {row.original.variant.sku}
      </span>
    ),
  },
  {
    accessorKey: 'variant.price',
    id: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit Price' />
    ),
    cell: ({ row }) => (
      <span className='text-sm'>{formatVND(row.original.variant.price)}</span>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qty' />
    ),
    cell: ({ row }) => (
      <span className='text-sm font-medium'>{row.getValue('quantity')}</span>
    ),
    meta: { className: 'w-20' },
  },
  {
    id: 'subtotal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Subtotal' />
    ),
    cell: ({ row }) => {
      const subtotal = row.original.variant.price * row.original.quantity
      return <span className='text-sm font-medium'>{formatVND(subtotal)}</span>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'variant.stock',
    id: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ row }) => (
      <span className='text-sm text-muted-foreground'>
        {row.original.variant.stock}
      </span>
    ),
    meta: { className: 'w-20' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
