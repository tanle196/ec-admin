import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import {
  type Banner,
  type BannerStatus,
  asDate,
  asString,
  getBannerStatus,
  linkTypeLabel,
  positionLabel,
} from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const statusConfig: Record<
  BannerStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
  }
> = {
  active: { label: 'Active', variant: 'default' },
  scheduled: { label: 'Scheduled', variant: 'outline' },
  expired: { label: 'Expired', variant: 'destructive' },
  inactive: { label: 'Inactive', variant: 'secondary' },
}

const formatDate = (v: unknown) => {
  const d = asDate(v)
  return d ? format(d, 'dd/MM/yyyy HH:mm') : null
}

export const bannersColumns: ColumnDef<Banner>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const url = row.original.imageUrl
      return url ? (
        <img
          src={url}
          alt={row.original.title}
          className='h-12 w-24 rounded border bg-muted object-cover'
        />
      ) : (
        <div className='flex h-12 w-24 items-center justify-center rounded border border-dashed bg-muted text-muted-foreground'>
          <ImageIcon size={18} />
        </div>
      )
    },
    enableSorting: false,
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      const subtitle = asString(row.original.subtitle)
      return (
        <div className='flex flex-col'>
          <LongText className='max-w-56 font-medium'>
            {row.original.title}
          </LongText>
          {subtitle && (
            <LongText className='max-w-56 text-xs text-muted-foreground'>
              {subtitle}
            </LongText>
          )}
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => (
      <Badge variant='outline'>{positionLabel(row.original.position)}</Badge>
    ),
    meta: { className: 'w-28' },
  },
  {
    accessorKey: 'linkType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Link' />
    ),
    cell: ({ row }) => {
      const value = asString(row.original.linkValue)
      return (
        <div className='flex flex-col'>
          <span className='text-sm'>
            {linkTypeLabel(row.original.linkType)}
          </span>
          {value && (
            <LongText className='max-w-40 font-mono text-xs text-muted-foreground'>
              {value}
            </LongText>
          )}
        </div>
      )
    },
    meta: { className: 'w-44' },
  },
  {
    accessorKey: 'sortOrder',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order' />
    ),
    cell: ({ row }) => (
      <span className='text-sm tabular-nums'>{row.original.sortOrder}</span>
    ),
    meta: { className: 'w-20' },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { label, variant } = statusConfig[getBannerStatus(row.original)]
      return <Badge variant={variant}>{label}</Badge>
    },
    meta: { className: 'w-28' },
  },
  {
    id: 'schedule',
    header: 'Schedule',
    cell: ({ row }) => {
      const start = formatDate(row.original.startsAt)
      const end = formatDate(row.original.endsAt)
      if (!start && !end)
        return <span className='text-sm text-muted-foreground'>Always</span>
      return (
        <div className='flex flex-col text-xs text-muted-foreground'>
          <span>From: {start ?? '—'}</span>
          <span>To: {end ?? '—'}</span>
        </div>
      )
    },
    meta: { className: 'w-40' },
  },
  {
    accessorKey: 'clickCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Clicks' />
    ),
    cell: ({ row }) => (
      <span className='text-sm tabular-nums'>
        {row.original.clickCount.toLocaleString('vi-VN')}
      </span>
    ),
    meta: { className: 'w-20' },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
]
