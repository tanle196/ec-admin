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
import { usePayment, useRefunds } from '../hooks'
import {
  type PaymentListItem,
  type PaymentStatus,
  type PaymentMethod,
  type RefundStatus,
} from '../data/schema'

const statusVariant: Record<PaymentStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  completed: 'default',
  failed: 'destructive',
  partially_refunded: 'outline',
  refunded: 'outline',
}

const refundStatusVariant: Record<RefundStatus, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  succeeded: 'default',
  failed: 'destructive',
}

const methodLabel: Record<PaymentMethod, string> = {
  cod: 'COD',
  vnpay: 'VNPay',
  momo: 'MoMo',
  zalopay: 'ZaloPay',
  stripe: 'Stripe',
  bank_transfer: 'Bank Transfer',
}

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

type PaymentsDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: PaymentListItem
}

export function PaymentsDetailDialog({ open, onOpenChange, currentRow }: PaymentsDetailDialogProps) {
  const { data: payment, isLoading } = usePayment(open ? currentRow.id : null)
  const { data: refunds } = useRefunds(open ? currentRow.id : null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Payment Detail</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className='flex h-24 items-center justify-center text-muted-foreground'>
            Loading payment details...
          </div>
        )}

        {payment && (
          <div className='space-y-3 text-sm'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p className='text-muted-foreground'>Payment ID</p>
                <p className='mt-1 font-mono text-xs break-all'>{payment.id}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Order ID</p>
                <p className='mt-1 font-mono text-xs break-all'>{payment.order_id}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Status</p>
                <Badge variant={statusVariant[payment.status]} className='mt-1 capitalize'>
                  {payment.status}
                </Badge>
              </div>
              <div>
                <p className='text-muted-foreground'>Method</p>
                <p className='mt-1 font-medium'>{methodLabel[payment.method]}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Amount</p>
                <p className='mt-1 font-semibold'>{formatVND(payment.amount)}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Created At</p>
                <p className='mt-1'>{format(payment.createdAt, 'dd/MM/yyyy HH:mm')}</p>
              </div>
              {payment.paidAt && (
                <div>
                  <p className='text-muted-foreground'>Paid At</p>
                  <p className='mt-1'>{String(payment.paidAt)}</p>
                </div>
              )}
              {payment.transactionId && (
                <div className='col-span-2'>
                  <p className='text-muted-foreground'>Transaction ID</p>
                  <p className='mt-1 font-mono text-xs break-all'>{String(payment.transactionId)}</p>
                </div>
              )}
            </div>

            {refunds && refunds.length > 0 && (
              <div>
                <h4 className='mb-2 text-sm font-semibold'>Refund History</h4>
                <div className='rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reason</TableHead>
                        <TableHead className='w-28 text-right'>Amount</TableHead>
                        <TableHead className='w-28'>Status</TableHead>
                        <TableHead className='w-32'>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {refunds.map((refund) => (
                        <TableRow key={refund.id}>
                          <TableCell className='max-w-48 truncate'>{refund.reason}</TableCell>
                          <TableCell className='text-right'>{formatVND(refund.amount)}</TableCell>
                          <TableCell>
                            <Badge variant={refundStatusVariant[refund.status]} className='capitalize'>
                              {refund.status}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-xs text-muted-foreground'>
                            {format(refund.createdAt, 'dd/MM/yyyy HH:mm')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
