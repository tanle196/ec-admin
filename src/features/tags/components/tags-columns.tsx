import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Tag } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const tagsColumns: ColumnDef<Tag>[] = [
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
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Slug' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48 text-muted-foreground font-mono text-xs'>
        {row.getValue('slug')}
      </LongText>
    ),
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
