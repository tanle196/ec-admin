import { useState } from 'react'
import {
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TableError, TableLoading } from '@/components/data-table'
import { useWishlist, useClearWishlist } from '../hooks'
import { wishlistColumns as columns } from './wishlist-columns'
import { useWishlistContext } from './wishlist-provider'

export function WishlistTable() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const { data: wishlist, isLoading, isError, error } = useWishlist()
  const { mutate: clearWishlist, isPending: isClearing } = useClearWishlist()
  const { setOpen } = useWishlistContext()

  const items = wishlist?.items ?? []

  const table = useReactTable({
    data: items,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleClearWishlist = () => {
    clearWishlist(undefined, {
      onSuccess: () => toast.success('Wishlist cleared.'),
      onError: () => toast.error('Failed to clear wishlist.'),
    })
  }

  if (isLoading) return <TableLoading label='wishlist' />
  if (isError) return <TableError label='wishlist' error={error} />

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {items.length} item{items.length !== 1 ? 's' : ''} in wishlist
        </p>
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => setOpen('add-product')}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Product
          </Button>
          <Button
            size='sm'
            variant='destructive'
            onClick={handleClearWishlist}
            disabled={isClearing || items.length === 0}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Clear Wishlist
          </Button>
        </div>
      </div>

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
                  Wishlist is empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
