import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Review } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}
        />
      ))}
      <span className='ml-1 text-xs text-muted-foreground'>{rating}</span>
    </div>
  )
}

export const reviewsColumns: ColumnDef<Review>[] = [
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
    accessorKey: 'product_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product ID' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-xs text-muted-foreground'>{row.getValue('product_id')}</span>
    ),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rating' />
    ),
    cell: ({ row }) => <StarRating rating={row.getValue('rating')} />,
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      const title = row.getValue('title')
      const text = title ? String(title) : '—'
      return <span className='text-sm'>{text}</span>
    },
  },
  {
    accessorKey: 'isApproved',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Approved' />
    ),
    cell: ({ row }) => {
      const approved = row.getValue('isApproved') as boolean
      return (
        <Badge variant={approved ? 'default' : 'secondary'}>
          {approved ? 'Approved' : 'Pending'}
        </Badge>
      )
    },
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'isVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Verified' />
    ),
    cell: ({ row }) => {
      const verified = row.getValue('isVerified') as boolean
      return (
        <Badge variant={verified ? 'outline' : 'secondary'}>
          {verified ? 'Verified' : 'Unverified'}
        </Badge>
      )
    },
    meta: { className: 'w-28' },
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
