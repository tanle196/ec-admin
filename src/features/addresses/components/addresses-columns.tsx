import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Address } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const addressesColumns: ColumnDef<Address>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Full Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 font-medium'>{row.getValue('fullName')}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    cell: ({ row }) => (
      <span className='text-sm'>{row.getValue('phone')}</span>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'addressLine1',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => {
      const line1 = row.getValue('addressLine1') as string
      const line2 = row.original.addressLine2
      return (
        <LongText className='max-w-56'>
          {line2 ? `${line1}, ${line2}` : line1}
        </LongText>
      )
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='City' />
    ),
    cell: ({ row }) => <span className='text-sm'>{row.getValue('city')}</span>,
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'province',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Province' />
    ),
    cell: ({ row }) => <span className='text-sm'>{row.getValue('province')}</span>,
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Country' />
    ),
    cell: ({ row }) => <span className='text-sm'>{row.getValue('country')}</span>,
    meta: { className: 'w-24' },
  },
  {
    accessorKey: 'isDefault',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Default' />
    ),
    cell: ({ row }) => {
      const isDefault = row.getValue('isDefault') as boolean
      return isDefault ? (
        <Badge variant='default'>Default</Badge>
      ) : null
    },
    meta: { className: 'w-24' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
