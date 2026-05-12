'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Pencil, Plus, Trash2, Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  useProduct,
  useAddProductVariant,
  useRemoveProductVariant,
  useUpdateProductVariant,
} from '../hooks'
import { type Product } from '../data/schema'
import { type ProductVariantResponseDto } from '@/api/main'

// ── Shared schema ──────────────────────────────────────────────────────────────
const variantSchema = z.object({
  name: z.string().min(1, 'Variant name is required.'),
  sku: z.string().min(1, 'SKU is required.'),
  price: z.coerce.number().min(0, 'Price must be non-negative.'),
  stock: z.coerce.number().int().min(0, 'Stock must be non-negative.').optional(),
  isActive: z.boolean().optional(),
})

type VariantForm = z.infer<typeof variantSchema>

// ── Add form ───────────────────────────────────────────────────────────────────
function AddVariantForm({
  productId,
  onAdded,
}: {
  productId: string
  onAdded: () => void
}) {
  const { mutate: addVariant, isPending } = useAddProductVariant()

  const form = useForm<VariantForm>({
    resolver: zodResolver(variantSchema),
    defaultValues: { name: '', sku: '', price: 0, stock: 0, isActive: true },
  })

  const onSubmit = (values: VariantForm) => {
    addVariant(
      { id: productId, body: values },
      {
        onSuccess: () => {
          toast.success('Variant added.')
          form.reset({ name: '', sku: '', price: 0, stock: 0, isActive: true })
          onAdded()
        },
        onError: () => toast.error('Failed to add variant.'),
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Name</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. 128GB / Black' className='h-8 text-sm' autoComplete='off' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>SKU</FormLabel>
                <FormControl>
                  <Input placeholder='VAR-001' className='h-8 font-mono text-xs' autoComplete='off' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Price</FormLabel>
                <FormControl>
                  <Input type='number' min={0} step='0.01' className='h-8 text-sm' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Stock</FormLabel>
                <FormControl>
                  <Input type='number' min={0} className='h-8 text-sm' {...field} />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex items-center justify-between'>
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2 space-y-0'>
                <FormLabel className='text-xs'>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='scale-90'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' size='sm' disabled={isPending}>
            <Plus size={14} className='mr-1' />
            {isPending ? 'Adding...' : 'Add Variant'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

// ── Edit inline form ───────────────────────────────────────────────────────────
function EditVariantRow({
  productId,
  variant,
  onDone,
}: {
  productId: string
  variant: ProductVariantResponseDto
  onDone: () => void
}) {
  const { mutate: updateVariant, isPending } = useUpdateProductVariant()

  const form = useForm<VariantForm>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      name: variant.name,
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      isActive: variant.isActive,
    },
  })

  const onSubmit = (values: VariantForm) => {
    updateVariant(
      { id: productId, variantId: variant.id, body: values },
      {
        onSuccess: () => {
          toast.success('Variant updated.')
          onDone()
        },
        onError: () => toast.error('Failed to update variant.'),
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='rounded-md border bg-muted/40 p-3 space-y-3'>
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Name</FormLabel>
                  <FormControl>
                    <Input className='h-8 text-sm' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sku'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>SKU</FormLabel>
                  <FormControl>
                    <Input className='h-8 font-mono text-xs' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Price</FormLabel>
                  <FormControl>
                    <Input type='number' min={0} step='0.01' className='h-8 text-sm' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Stock</FormLabel>
                  <FormControl>
                    <Input type='number' min={0} className='h-8 text-sm' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-between'>
            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex items-center gap-2 space-y-0'>
                  <FormLabel className='text-xs'>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='scale-90'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
              <Button type='button' variant='ghost' size='sm' onClick={onDone}>
                <X size={14} className='mr-1' />
                Cancel
              </Button>
              <Button type='submit' size='sm' disabled={isPending}>
                <Check size={14} className='mr-1' />
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

// ── Main dialog ────────────────────────────────────────────────────────────────
type ProductsVariantDialogProps = {
  currentRow: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductsVariantDialog({
  currentRow,
  open,
  onOpenChange,
}: ProductsVariantDialogProps) {
  const { data: product, isLoading } = useProduct(currentRow.id)
  const { mutate: removeVariant, isPending: isRemoving } = useRemoveProductVariant()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const variants = product?.variants ?? []

  const handleRemove = (variantId: string) => {
    setRemovingId(variantId)
    removeVariant(
      { id: currentRow.id, variantId },
      {
        onSuccess: () => toast.success('Variant removed.'),
        onError: () => toast.error('Failed to remove variant.'),
        onSettled: () => setRemovingId(null),
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setEditingId(null)
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader className='text-start'>
          <DialogTitle>Manage Variants</DialogTitle>
          <DialogDescription>
            {currentRow.name} — add, edit, or remove product variants.
          </DialogDescription>
        </DialogHeader>

        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3 max-h-[65vh] space-y-4'>
          {/* Variant list */}
          <div className='space-y-2'>
            {isLoading && (
              <p className='text-sm text-muted-foreground'>Loading variants...</p>
            )}
            {!isLoading && variants.length === 0 && (
              <p className='text-sm text-muted-foreground'>No variants yet.</p>
            )}
            {variants.map((variant) =>
              editingId === variant.id ? (
                <EditVariantRow
                  key={variant.id}
                  productId={currentRow.id}
                  variant={variant}
                  onDone={() => setEditingId(null)}
                />
              ) : (
                <div
                  key={variant.id}
                  className='flex items-center gap-3 rounded-md border p-3'
                >
                  <div className='flex-1 min-w-0 space-y-0.5'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium truncate'>{variant.name}</span>
                      <Badge
                        variant={variant.isActive ? 'default' : 'secondary'}
                        className='text-xs px-1.5 py-0'
                      >
                        {variant.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                      <span className='font-mono'>{variant.sku}</span>
                      <span>${variant.price.toLocaleString()}</span>
                      <span>{variant.stock} in stock</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-1 flex-shrink-0'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => setEditingId(variant.id)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-destructive hover:text-destructive'
                      disabled={isRemoving && removingId === variant.id}
                      onClick={() => handleRemove(variant.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>

          <Separator />

          {/* Add variant form */}
          <div>
            <p className='text-sm font-medium mb-3'>Add Variant</p>
            <AddVariantForm
              productId={currentRow.id}
              onAdded={() => setEditingId(null)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
