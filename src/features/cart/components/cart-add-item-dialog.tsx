import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { useAddCartItem } from '../hooks'

const formSchema = z.object({
  variant_id: z.string().min(1, 'Variant ID is required'),
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
})

type FormValues = z.infer<typeof formSchema>

type CartAddItemDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartAddItemDialog({ open, onOpenChange }: CartAddItemDialogProps) {
  const { mutate: addItem, isPending } = useAddCartItem()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { variant_id: '', quantity: 1 },
  })

  const onSubmit = (values: FormValues) => {
    addItem(
      { variant_id: values.variant_id, quantity: values.quantity },
      {
        onSuccess: () => {
          toast.success('Item added to cart.')
          form.reset()
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to add item.'),
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
          <DialogTitle>Add Item to Cart</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id='cart-add-item-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='variant_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant ID</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter variant ID' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <Button type='submit' form='cart-add-item-form' disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
