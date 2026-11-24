import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Category } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'image',
    header: () => null,
    cell: ({ row }) => {
      const image = row.getValue('image')
      const src = typeof image === 'string' ? image : null
      return src ? (
        <img
          src={src}
          alt={row.getValue('name')}
          className='h-9 w-9 shrink-0 rounded-md bg-muted object-cover'
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground'>
          <ImageIcon size={14} />
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
    meta: { className: 'w-14' },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48 font-medium'>
        {row.getValue('name')}
      </LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Slug' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48 font-mono text-xs text-muted-foreground'>
        {row.getValue('slug')}
      </LongText>
    ),
  },
  {
    accessorKey: 'sortOrder',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order' />
    ),
    cell: ({ row }) => (
      <span className='text-sm text-muted-foreground'>
        {row.getValue('sortOrder')}
      </span>
    ),
    meta: { className: 'w-20' },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
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
