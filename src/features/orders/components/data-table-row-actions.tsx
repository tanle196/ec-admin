import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Eye, RefreshCw, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type OrderListItem } from '../data/schema'
import { useCancelOrder } from '../hooks'
import { useOrdersContext } from './orders-provider'

type DataTableRowActionsProps = {
  row: Row<OrderListItem>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useOrdersContext()
  const { mutate: cancelOrder, isPending } = useCancelOrder()

  const order = row.original
  const canCancel = !['cancelled', 'refunded', 'delivered'].includes(order.status)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-44'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(order)
            setOpen('view')
          }}
        >
          View Detail
          <DropdownMenuShortcut>
            <Eye size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(order)
            setOpen('update-status')
          }}
        >
          Update Status
          <DropdownMenuShortcut>
            <RefreshCw size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {canCancel && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive focus:text-destructive'
              disabled={isPending}
              onClick={() =>
                cancelOrder(order.id, {
                  onSuccess: () => toast.success(`Order #${order.orderNumber} cancelled.`),
                  onError: () => toast.error('Failed to cancel order.'),
                })
              }
            >
              Cancel Order
              <DropdownMenuShortcut>
                <XCircle size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
