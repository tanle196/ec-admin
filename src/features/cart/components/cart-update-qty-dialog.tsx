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
import { Input } from '@/components/ui/input'
import { useUpdateCartItem } from '../hooks'
import { type CartItem } from '../data/schema'

const formSchema = z.object({
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
})

type FormValues = z.infer<typeof formSchema>

type CartUpdateQtyDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: CartItem
}

export function CartUpdateQtyDialog({
  open,
  onOpenChange,
  currentRow,
}: CartUpdateQtyDialogProps) {
  const { mutate: updateItem, isPending } = useUpdateCartItem()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { quantity: currentRow.quantity },
  })

  useEffect(() => {
    if (open) {
      form.reset({ quantity: currentRow.quantity })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: FormValues) => {
    updateItem(
      { itemId: currentRow.id, quantity: values.quantity },
      {
        onSuccess: () => {
          toast.success('Quantity updated.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to update quantity.'),
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
          <DialogTitle>Update Quantity</DialogTitle>
          <DialogDescription>{currentRow.variant.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='cart-update-qty-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type='number' min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type='submit'
            form='cart-update-qty-form'
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
