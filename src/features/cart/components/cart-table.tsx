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
import { useCart, useClearCart } from '../hooks'
import { cartColumns as columns } from './cart-columns'
import { useCartContext } from './cart-provider'

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

export function CartTable() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const { data: cart, isLoading, isError, error } = useCart()
  const { mutate: clearCart, isPending: isClearing } = useClearCart()
  const { setOpen } = useCartContext()

  const items = cart?.items ?? []
  const total = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  )

  const table = useReactTable({
    data: items,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleClearCart = () => {
    clearCart(undefined, {
      onSuccess: () => toast.success('Cart cleared.'),
      onError: () => toast.error('Failed to clear cart.'),
    })
  }

  if (isLoading) {
    return (
      <div className='flex h-24 items-center justify-center text-muted-foreground'>
        Loading cart...
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
        Failed to load cart: {msg}
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {items.length} item{items.length !== 1 ? 's' : ''} in cart
        </p>
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => setOpen('add-item')}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Item
          </Button>
          <Button
            size='sm'
            variant='destructive'
            onClick={handleClearCart}
            disabled={isClearing || items.length === 0}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Clear Cart
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
                  Cart is empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {items.length > 0 && (
        <div className='flex justify-end border-t pt-3'>
          <div className='text-sm space-y-1 text-right'>
            <p className='text-muted-foreground'>
              Total ({items.length} item{items.length !== 1 ? 's' : ''})
            </p>
            <p className='text-lg font-semibold'>{formatVND(total)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
