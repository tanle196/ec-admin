import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Product } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const statusVariant: Record<Product['status'], 'default' | 'secondary' | 'outline'> = {
  published: 'default',
  draft: 'secondary',
  archived: 'outline',
}

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48 font-medium'>{row.getValue('name')}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 font-mono text-xs text-muted-foreground'>
        {row.getValue('sku')}
      </LongText>
    ),
  },
  {
    accessorKey: 'basePrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      const price = row.getValue('basePrice') as number
      return (
        <span className='text-sm font-medium'>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
        </span>
      )
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as Product['status']
      return (
        <Badge variant={statusVariant[status]} className='capitalize'>
          {status}
        </Badge>
      )
    },
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'isFeatured',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Featured' />
    ),
    cell: ({ row }) => {
      const isFeatured = row.getValue('isFeatured') as boolean
      return (
        <Badge variant={isFeatured ? 'default' : 'secondary'}>
          {isFeatured ? 'Yes' : 'No'}
        </Badge>
      )
    },
    meta: { className: 'w-24' },
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
          {format(date, 'dd/MM/yyyy')}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
