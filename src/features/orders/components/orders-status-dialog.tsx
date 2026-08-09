'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateOrderStatus } from '../hooks'
import { ORDER_STATUSES, type OrderListItem, type OrderStatus } from '../data/schema'

const formSchema = z.object({
  status: z.enum(ORDER_STATUSES),
})

type StatusForm = z.infer<typeof formSchema>

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  partially_refunded: 'Partially Refunded',
  refunded: 'Refunded',
}

type OrdersStatusDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: OrderListItem
}

export function OrdersStatusDialog({ open, onOpenChange, currentRow }: OrdersStatusDialogProps) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus()

  const form = useForm<StatusForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: currentRow.status },
  })

  useEffect(() => {
    if (open) {
      form.reset({ status: currentRow.status })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: StatusForm) => {
    updateStatus(
      { id: currentRow.id, status: values.status },
      {
        onSuccess: () => {
          toast.success('Order status updated successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to update order status.'),
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Order #{currentRow.orderNumber}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='order-status-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {statusLabel[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='order-status-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
