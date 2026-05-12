'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Switch } from '@/components/ui/switch'
import { SelectDropdown } from '@/components/select-dropdown'
import { useCategories } from '@/features/categories/hooks'
import { useTags } from '@/features/tags/hooks'
import { useCreateProduct, useUpdateProduct } from '../hooks'
import { type Product } from '../data/schema'

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const formSchema = z.object({
  name: z.string().min(1, 'Product name is required.'),
  slug: z.string().optional(),
  category_id: z.string().min(1, 'Category is required.'),
  description: z.string().optional(),
  basePrice: z.coerce.number().min(0, 'Price must be a non-negative number.'),
  sku: z.string().min(1, 'SKU is required.'),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  isFeatured: z.boolean().optional(),
  tagIds: z.array(z.string()).optional(),
})

type ProductForm = z.infer<typeof formSchema>

type ProductsActionDialogProps = {
  currentRow?: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ProductsActionDialogProps) {
  const isEdit = !!currentRow
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct()
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()
  const isPending = isCreating || isUpdating

  const { data: categoriesData } = useCategories()
  const categoryOptions = (categoriesData?.data ?? []).map((c) => ({
    label: c.name,
    value: c.id,
  }))

  const { data: tagsData } = useTags()
  const allTags = tagsData ?? []

  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name ?? '',
      slug: currentRow?.slug ?? '',
      category_id: currentRow?.category_id ?? '',
      description: '',
      basePrice: currentRow?.basePrice ?? 0,
      sku: currentRow?.sku ?? '',
      status: currentRow?.status ?? 'draft',
      isFeatured: currentRow?.isFeatured ?? false,
      tagIds: currentRow?.tags?.map((t) => t.id) ?? [],
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: currentRow?.name ?? '',
        slug: currentRow?.slug ?? '',
        category_id: currentRow?.category_id ?? '',
        description: '',
        basePrice: currentRow?.basePrice ?? 0,
        sku: currentRow?.sku ?? '',
        status: currentRow?.status ?? 'draft',
        isFeatured: currentRow?.isFeatured ?? false,
        tagIds: currentRow?.tags?.map((t) => t.id) ?? [],
      })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: ProductForm) => {
    const body = {
      name: values.name,
      category_id: values.category_id,
      basePrice: values.basePrice,
      sku: values.sku,
      ...(values.slug && { slug: values.slug }),
      ...(values.description && { description: values.description }),
      status: values.status,
      isFeatured: values.isFeatured,
      tagIds: values.tagIds ?? [],
    }

    if (isEdit) {
      updateProduct(
        { id: currentRow.id, body },
        {
          onSuccess: () => {
            toast.success('Product updated successfully.')
            onOpenChange(false)
          },
          onError: () => toast.error('Failed to update product.'),
        }
      )
    } else {
      createProduct(body, {
        onSuccess: () => {
          toast.success('Product created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create product.'),
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the product here. ' : 'Create new product here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3 max-h-[60vh]'>
          <Form {...form}>
            <form
              id='product-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='iPhone 15 Pro'
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
                name='sku'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>SKU</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='IPH-15-PRO'
                        className='col-span-4 font-mono text-sm'
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
                name='slug'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='iphone-15-pro (auto-generated)'
                        className='col-span-4 font-mono text-sm'
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
                name='category_id'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Category</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select category'
                      className='col-span-4'
                      items={categoryOptions}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='basePrice'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Base Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        step='0.01'
                        placeholder='0'
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
                name='status'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Status</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select status'
                      className='col-span-4'
                      items={statusOptions}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 pt-2 text-end'>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Optional description...'
                        className='col-span-4 resize-none'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tagIds'
                render={({ field }) => {
                  const selectedIds: string[] = field.value ?? []
                  const toggle = (id: string) => {
                    field.onChange(
                      selectedIds.includes(id)
                        ? selectedIds.filter((x) => x !== id)
                        : [...selectedIds, id]
                    )
                  }
                  return (
                    <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 pt-1.5 text-end'>Tags</FormLabel>
                      <div className='col-span-4 flex flex-wrap gap-1.5'>
                        {allTags.length === 0 && (
                          <span className='text-xs text-muted-foreground'>No tags available.</span>
                        )}
                        {allTags.map((tag) => {
                          const selected = selectedIds.includes(tag.id)
                          return (
                            <Badge
                              key={tag.id}
                              variant={selected ? 'default' : 'outline'}
                              className='cursor-pointer select-none gap-1'
                              onClick={() => toggle(tag.id)}
                            >
                              {tag.name}
                              {selected && <X size={10} />}
                            </Badge>
                          )
                        })}
                      </div>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Featured</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='product-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
