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
import { Input } from '@/components/ui/input'
import { useUpdatePaymentStatus } from '../hooks'
import { PAYMENT_STATUSES, type PaymentListItem, type PaymentStatus } from '../data/schema'

const formSchema = z.object({
  status: z.enum(PAYMENT_STATUSES),
  transactionId: z.string().optional(),
})

type StatusForm = z.infer<typeof formSchema>

const statusLabel: Record<PaymentStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
}

type PaymentsStatusDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: PaymentListItem
}

export function PaymentsStatusDialog({ open, onOpenChange, currentRow }: PaymentsStatusDialogProps) {
  const { mutate: updateStatus, isPending } = useUpdatePaymentStatus()

  const form = useForm<StatusForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: currentRow.status, transactionId: '' },
  })

  useEffect(() => {
    if (open) {
      form.reset({ status: currentRow.status, transactionId: '' })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: StatusForm) => {
    updateStatus(
      {
        id: currentRow.id,
        status: values.status,
        transactionId: values.transactionId || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Payment status updated successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to update payment status.'),
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
          <DialogTitle>Update Payment Status</DialogTitle>
          <DialogDescription>
            Payment ID: <span className='font-mono text-xs'>{currentRow.id}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='payment-status-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                      {PAYMENT_STATUSES.map((s) => (
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
            <FormField
              control={form.control}
              name='transactionId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID <span className='text-muted-foreground'>(optional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder='Enter transaction ID' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='payment-status-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
