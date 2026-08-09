'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useOrder } from '@/features/orders/hooks'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCreateRefund } from '../hooks'
import { type PaymentListItem } from '../data/schema'

const refundItemFormSchema = z.object({
  order_item_id: z.string(),
  productName: z.string(),
  maxQuantity: z.number(),
  quantity: z.coerce.number().int().min(0),
})

const formSchema = z
  .object({
    items: z.array(refundItemFormSchema),
    reason: z.string().min(1, 'Reason is required.'),
  })
  .refine((data) => data.items.some((item) => item.quantity > 0), {
    message: 'Select at least one item to refund.',
    path: ['items'],
  })
  .refine(
    (data) => data.items.every((item) => item.quantity <= item.maxQuantity),
    {
      message: 'Quantity cannot exceed the ordered quantity.',
      path: ['items'],
    }
  )

type RefundForm = z.infer<typeof formSchema>

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)

type PaymentsRefundDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: PaymentListItem
}

export function PaymentsRefundDialog({ open, onOpenChange, currentRow }: PaymentsRefundDialogProps) {
  const { data: order, isLoading } = useOrder(open ? currentRow.order_id : null)
  const { mutate: createRefund, isPending } = useCreateRefund()

  const form = useForm<RefundForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { items: [], reason: '' },
  })

  const { fields } = useFieldArray({ control: form.control, name: 'items' })

  useEffect(() => {
    if (open && order) {
      form.reset({
        items: order.items.map((item) => ({
          order_item_id: item.id,
          productName: item.productName,
          maxQuantity: item.quantity,
          quantity: 0,
        })),
        reason: '',
      })
    }
  }, [open, order, form])

  const onSubmit = (values: RefundForm) => {
    const items = values.items
      .filter((item) => item.quantity > 0)
      .map((item) => ({ order_item_id: item.order_item_id, quantity: item.quantity }))

    createRefund(
      { paymentId: currentRow.id, orderId: currentRow.order_id, items, reason: values.reason },
      {
        onSuccess: () => {
          toast.success('Refund created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create refund.'),
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset({ items: [], reason: '' })
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>Refund Payment</DialogTitle>
          <DialogDescription>
            Payment ID: <span className='font-mono text-xs'>{currentRow.id}</span>
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className='flex h-24 items-center justify-center text-muted-foreground'>
            Loading order items...
          </div>
        )}

        {order && (
          <Form {...form}>
            <form id='payment-refund-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className='w-20 text-right'>Ordered</TableHead>
                      <TableHead className='w-24 text-right'>Refund Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell className='font-medium'>{field.productName}</TableCell>
                        <TableCell className='text-right'>{field.maxQuantity}</TableCell>
                        <TableCell className='text-right'>
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field: qtyField }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type='number'
                                    min={0}
                                    max={field.maxQuantity}
                                    className='h-8 w-20 text-right'
                                    {...qtyField}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {form.formState.errors.items?.root?.message && (
                <p className='text-sm font-medium text-destructive'>
                  {form.formState.errors.items.root.message}
                </p>
              )}

              <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Enter refund reason' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className='text-sm text-muted-foreground'>
                Payment amount: <span className='font-medium'>{formatVND(currentRow.amount)}</span>
              </p>
            </form>
          </Form>
        )}

        <DialogFooter>
          <Button type='submit' form='payment-refund-form' disabled={isPending || isLoading}>
            {isPending ? 'Processing...' : 'Confirm Refund'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
