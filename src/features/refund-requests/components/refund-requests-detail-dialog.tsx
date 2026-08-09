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
import { useRefundRequest } from '../hooks'
import { type RefundRequestListItem, type RefundRequestStatus } from '../data/schema'

const statusVariant: Record<RefundRequestStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
}

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

type RefundRequestsDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: RefundRequestListItem
}

export function RefundRequestsDetailDialog({ open, onOpenChange, currentRow }: RefundRequestsDetailDialogProps) {
  const { data: refundRequest, isLoading } = useRefundRequest(open ? currentRow.id : null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Refund Request Detail</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className='flex h-24 items-center justify-center text-muted-foreground'>
            Loading refund request details...
          </div>
        )}

        {refundRequest && (
          <div className='space-y-4 text-sm'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p className='text-muted-foreground'>Request ID</p>
                <p className='mt-1 font-mono text-xs break-all'>{refundRequest.id}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Order ID</p>
                <p className='mt-1 font-mono text-xs break-all'>{refundRequest.order_id}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Payment ID</p>
                <p className='mt-1 font-mono text-xs break-all'>{refundRequest.payment_id}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Status</p>
                <Badge variant={statusVariant[refundRequest.status]} className='mt-1 capitalize'>
                  {refundRequest.status}
                </Badge>
              </div>
              <div>
                <p className='text-muted-foreground'>Amount</p>
                <p className='mt-1 font-semibold'>{formatVND(refundRequest.amount)}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Requested At</p>
                <p className='mt-1'>{format(refundRequest.createdAt, 'dd/MM/yyyy HH:mm')}</p>
              </div>
              <div className='col-span-2'>
                <p className='text-muted-foreground'>Reason</p>
                <p className='mt-1'>{refundRequest.reason}</p>
              </div>
              {refundRequest.adminNote != null && (
                <div className='col-span-2'>
                  <p className='text-muted-foreground'>Admin Note</p>
                  <p className='mt-1'>{String(refundRequest.adminNote)}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className='mb-2 text-sm font-semibold'>Items</h4>
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Item ID</TableHead>
                      <TableHead className='w-20 text-right'>Qty</TableHead>
                      <TableHead className='w-32 text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundRequest.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className='font-mono text-xs'>{item.order_item_id}</TableCell>
                        <TableCell className='text-right'>{item.quantity}</TableCell>
                        <TableCell className='text-right'>{formatVND(item.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
