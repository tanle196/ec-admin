import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Permission } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const ACTION_BADGE_COLORS: Record<string, string> = {
  create: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  read: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  update: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  delete: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  cancel: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  publish: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'assign.role':
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
}

export const permissionsColumns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'module',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Module' />
    ),
    cell: ({ row }) => (
      <span className='font-mono text-sm font-medium'>{row.getValue('module')}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'action',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Action' />
    ),
    cell: ({ row }) => {
      const action = row.getValue('action') as string
      const colorClass = ACTION_BADGE_COLORS[action] ?? ''
      return (
        <Badge
          variant='outline'
          className={`font-mono capitalize ${colorClass}`}
        >
          {action}
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string | undefined
      return (
        <span className='text-sm text-muted-foreground'>
          {description ?? '—'}
        </span>
      )
    },
  },
  {
    accessorKey: 'isSystem',
    header: 'Type',
    cell: ({ row }) => {
      const isSystem = row.getValue('isSystem') as boolean
      return isSystem ? (
        <div className='flex items-center gap-1 text-muted-foreground'>
          <Lock size={12} />
          <span className='text-xs'>System</span>
        </div>
      ) : (
        <span className='text-xs text-muted-foreground'>Custom</span>
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
