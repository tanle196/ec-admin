import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Role } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const rolesColumns: ColumnDef<Role>[] = [
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
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string | undefined
      return (
        <LongText className='max-w-72 text-muted-foreground'>
          {description ?? '—'}
        </LongText>
      )
    },
  },
  {
    id: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => {
      const permissions = row.original.permissions ?? []
      if (permissions.length === 0) {
        return <span className='text-muted-foreground text-sm'>None</span>
      }
      return (
        <Badge variant='secondary'>
          {permissions.length} permission{permissions.length !== 1 ? 's' : ''}
        </Badge>
      )
    },
    enableSorting: false,
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
