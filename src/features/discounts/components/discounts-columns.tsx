import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Discount } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const formatValue = (discount: Discount) => {
  if (discount.type === 'percent') return `${discount.value}%`
  return `${discount.value.toLocaleString('vi-VN')} VND`
}

const toNumber = (v: unknown): number | null => {
  if (typeof v === 'number') return v
  return null
}

const toDate = (v: unknown): Date | null => {
  if (v instanceof Date) return v
  return null
}

export const discountsColumns: ColumnDef<Discount>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Code' />,
    cell: ({ row }) => (
      <LongText className='max-w-40 font-mono font-semibold uppercase'>
        {row.getValue('code')}
      </LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant='outline'>
          {type === 'percent' ? 'Percent' : 'Fixed'}
        </Badge>
      )
    },
    meta: { className: 'w-24' },
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Value' />,
    cell: ({ row }) => (
      <span className='font-medium'>{formatValue(row.original)}</span>
    ),
    meta: { className: 'w-32' },
  },
  {
    accessorKey: 'minOrderValue',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Min Order' />,
    cell: ({ row }) => {
      const val = toNumber(row.getValue('minOrderValue'))
      return (
        <span className='text-sm text-muted-foreground'>
          {val != null ? `${val.toLocaleString('vi-VN')} VND` : '—'}
        </span>
      )
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'usageLimit',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Limit' />,
    cell: ({ row }) => {
      const limit = toNumber(row.getValue('usageLimit'))
      const used = row.original.usedCount
      return (
        <span className='text-sm text-muted-foreground'>
          {used} / {limit != null ? limit : '∞'}
        </span>
      )
    },
    meta: { className: 'w-24' },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    meta: { className: 'w-24' },
  },
  {
    accessorKey: 'expiresAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Expires At' />,
    cell: ({ row }) => {
      const date = toDate(row.getValue('expiresAt'))
      return (
        <span className='text-sm text-muted-foreground'>
          {date ? format(date, 'dd/MM/yyyy') : '—'}
        </span>
      )
    },
    meta: { className: 'w-32' },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return (
        <span className='text-sm text-muted-foreground'>
          {format(date, 'dd/MM/yyyy')}
        </span>
      )
    },
    meta: { className: 'w-32' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
