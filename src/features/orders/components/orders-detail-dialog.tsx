import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrder } from '../hooks'
import { type OrderListItem, type OrderStatus } from '../data/schema'

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  confirmed: 'default',
  processing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
  refunded: 'outline',
}

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

type OrdersDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: OrderListItem
}

export function OrdersDetailDialog({ open, onOpenChange, currentRow }: OrdersDetailDialogProps) {
  const { data: order, isLoading } = useOrder(open ? currentRow.id : null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Order #{currentRow.orderNumber}</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className='flex h-24 items-center justify-center text-muted-foreground'>
            Loading order details...
          </div>
        )}

        {order && (
          <div className='space-y-4 overflow-y-auto max-h-[70vh] pe-1'>
            <div className='grid grid-cols-2 gap-3 text-sm'>
              <div>
                <p className='text-muted-foreground'>Status</p>
                <Badge variant={statusVariant[order.status]} className='mt-1 capitalize'>
                  {order.status}
                </Badge>
              </div>
              <div>
                <p className='text-muted-foreground'>Created</p>
                <p className='mt-1 font-medium'>{format(order.createdAt, 'dd/MM/yyyy HH:mm')}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>User ID</p>
                <p className='mt-1 font-mono text-xs'>{order.user_id}</p>
              </div>
              {order.notes && (
                <div>
                  <p className='text-muted-foreground'>Notes</p>
                  <p className='mt-1'>{String(order.notes)}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className='mb-2 text-sm font-semibold'>Items</h4>
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className='w-20 text-right'>Qty</TableHead>
                      <TableHead className='w-32 text-right'>Unit Price</TableHead>
                      <TableHead className='w-32 text-right'>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <p className='font-medium'>{item.productName}</p>
                          {item.variantName && (
                            <p className='text-xs text-muted-foreground'>{String(item.variantName)}</p>
                          )}
                        </TableCell>
                        <TableCell className='text-right'>{item.quantity}</TableCell>
                        <TableCell className='text-right'>{formatVND(item.unitPrice)}</TableCell>
                        <TableCell className='text-right'>{formatVND(item.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className='space-y-1 text-sm border-t pt-3'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Subtotal</span>
                <span>{formatVND(order.subtotal)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Shipping Fee</span>
                <span>{formatVND(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className='flex justify-between text-green-600'>
                  <span>Discount</span>
                  <span>-{formatVND(order.discount)}</span>
                </div>
              )}
              <div className='flex justify-between border-t pt-1 font-semibold'>
                <span>Total</span>
                <span>{formatVND(order.total)}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
