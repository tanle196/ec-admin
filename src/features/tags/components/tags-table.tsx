import { useState } from 'react'
import {
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTags } from '../hooks'
import { tagsColumns as columns } from './tags-columns'

export function TagsTable() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const { data, isLoading, isError, error } = useTags()

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className='flex h-24 items-center justify-center text-muted-foreground'>
        Loading tags...
      </div>
    )
  }

  if (isError) {
    const msg =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null
          ? JSON.stringify(error)
          : 'Unknown error'
    return (
      <div className='flex h-24 items-center justify-center text-sm text-destructive'>
        Failed to load tags: {msg}
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='group/row'>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    'bg-background group-hover/row:bg-muted',
                    header.column.columnDef.meta?.className,
                    header.column.columnDef.meta?.thClassName
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='group/row'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.tdClassName
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No tags found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
