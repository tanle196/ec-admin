'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Trash2, Plus, Star } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useProduct, useAddProductImage, useRemoveProductImage } from '../hooks'
import { type Product } from '../data/schema'

const addImageSchema = z.object({
  url: z.string().url('Must be a valid URL.').min(1, 'Image URL is required.'),
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
})

type AddImageForm = z.infer<typeof addImageSchema>

type ProductsImageDialogProps = {
  currentRow: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductsImageDialog({
  currentRow,
  open,
  onOpenChange,
}: ProductsImageDialogProps) {
  const { data: product, isLoading } = useProduct(currentRow.id)
  const { mutate: addImage, isPending: isAdding } = useAddProductImage()
  const { mutate: removeImage, isPending: isRemoving } = useRemoveProductImage()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const form = useForm<AddImageForm>({
    resolver: zodResolver(addImageSchema),
    defaultValues: {
      url: '',
      alt: '',
      isPrimary: false,
      sortOrder: 0,
    },
  })

  const images = product?.images ?? []

  const onSubmit = (values: AddImageForm) => {
    addImage(
      {
        id: currentRow.id,
        body: {
          url: values.url,
          ...(values.alt && { alt: values.alt }),
          isPrimary: values.isPrimary,
          sortOrder: values.sortOrder,
        },
      },
      {
        onSuccess: () => {
          toast.success('Image added successfully.')
          form.reset({ url: '', alt: '', isPrimary: false, sortOrder: 0 })
        },
        onError: () => toast.error('Failed to add image.'),
      }
    )
  }

  const handleRemove = (imageId: string) => {
    setRemovingId(imageId)
    removeImage(
      { id: currentRow.id, imageId },
      {
        onSuccess: () => toast.success('Image removed.'),
        onError: () => toast.error('Failed to remove image.'),
        onSettled: () => setRemovingId(null),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>Manage Images</DialogTitle>
          <DialogDescription>
            {currentRow.name} — add or remove product images.
          </DialogDescription>
        </DialogHeader>

        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3 max-h-[60vh] space-y-4'>
          {/* Image list */}
          <div className='space-y-2'>
            {isLoading && (
              <p className='text-sm text-muted-foreground'>Loading images...</p>
            )}
            {!isLoading && images.length === 0 && (
              <p className='text-sm text-muted-foreground'>No images yet.</p>
            )}
            {images.map((img) => (
              <div
                key={img.id}
                className='flex items-center gap-3 rounded-md border p-2'
              >
                <img
                  src={img.url}
                  alt={typeof img.alt === 'string' ? img.alt : ''}
                  className='h-12 w-12 rounded object-cover flex-shrink-0 bg-muted'
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm truncate'>{img.url}</p>
                  <div className='flex items-center gap-1 mt-0.5'>
                    {img.isPrimary && (
                      <Badge variant='secondary' className='text-xs gap-1 px-1.5 py-0'>
                        <Star size={10} />
                        Primary
                      </Badge>
                    )}
                    <span className='text-xs text-muted-foreground'>
                      Order: {img.sortOrder}
                    </span>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-destructive hover:text-destructive flex-shrink-0'
                  disabled={isRemoving && removingId === img.id}
                  onClick={() => handleRemove(img.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>

          <Separator />

          {/* Add image form */}
          <div>
            <p className='text-sm font-medium mb-3'>Add Image</p>
            <Form {...form}>
              <form
                id='add-image-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-3'
              >
                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-end'>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://example.com/image.jpg'
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='alt'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-end'>Alt text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Image description'
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sortOrder'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-end'>Sort order</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          className='col-span-4'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='isPrimary'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-end'>Primary</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='flex justify-end pt-1'>
                  <Button type='submit' size='sm' disabled={isAdding}>
                    <Plus size={16} className='mr-1' />
                    {isAdding ? 'Adding...' : 'Add Image'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
