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
import { useAddToWishlist } from '../hooks'

const formSchema = z.object({
  product_id: z.string().min(1, 'Product ID is required'),
})

type FormValues = z.infer<typeof formSchema>

type WishlistAddProductDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WishlistAddProductDialog({ open, onOpenChange }: WishlistAddProductDialogProps) {
  const { mutate: addProduct, isPending } = useAddToWishlist()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { product_id: '' },
  })

  const onSubmit = (values: FormValues) => {
    addProduct(values.product_id, {
      onSuccess: () => {
        toast.success('Product added to wishlist.')
        form.reset()
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to add product.'),
    })
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
          <DialogTitle>Add Product to Wishlist</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id='wishlist-add-product-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='product_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product ID' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='wishlist-add-product-form' disabled={isPending}>
            {isPending ? 'Adding...' : 'Add Product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
