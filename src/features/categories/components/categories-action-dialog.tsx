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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { SelectDropdown } from '@/components/select-dropdown'
import { useCategories } from '../hooks'
import { useCreateCategory, useUpdateCategory } from '../hooks'
import { type Category } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required.'),
  slug: z.string().optional(),
  parent_id: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

type CategoryForm = z.infer<typeof formSchema>

type CategoriesActionDialogProps = {
  currentRow?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoriesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: CategoriesActionDialogProps) {
  const isEdit = !!currentRow
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory()
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory()
  const isPending = isCreating || isUpdating

  const { data: categoriesData } = useCategories()

  const parentOptions = (categoriesData?.data ?? [])
    .filter((c) => c.id !== currentRow?.id)
    .map((c) => ({ label: c.name, value: c.id }))

  const getParentId = (row?: Category) => {
    const pid = row?.parent_id
    if (!pid || typeof pid === 'object') return ''
    return pid
  }

  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name ?? '',
      slug: currentRow?.slug ?? '',
      parent_id: getParentId(currentRow),
      description: typeof currentRow?.description === 'string' ? currentRow.description : '',
      image: typeof currentRow?.image === 'string' ? currentRow.image : '',
      sortOrder: currentRow?.sortOrder ?? 0,
      isActive: currentRow?.isActive ?? true,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: currentRow?.name ?? '',
        slug: currentRow?.slug ?? '',
        parent_id: getParentId(currentRow),
        description: typeof currentRow?.description === 'string' ? currentRow.description : '',
        image: typeof currentRow?.image === 'string' ? currentRow.image : '',
        sortOrder: currentRow?.sortOrder ?? 0,
        isActive: currentRow?.isActive ?? true,
      })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: CategoryForm) => {
    const body = {
      name: values.name,
      ...(values.slug && { slug: values.slug }),
      ...(values.parent_id && { parent_id: values.parent_id }),
      ...(values.description && { description: values.description }),
      ...(values.image && { image: values.image }),
      sortOrder: values.sortOrder,
      isActive: values.isActive,
    }

    if (isEdit) {
      updateCategory(
        { id: currentRow.id, body },
        {
          onSuccess: () => {
            toast.success('Category updated successfully.')
            onOpenChange(false)
          },
          onError: () => toast.error('Failed to update category.'),
        }
      )
    } else {
      createCategory(body, {
        onSuccess: () => {
          toast.success('Category created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create category.'),
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
          <DialogTitle>{isEdit ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the category here. ' : 'Create new category here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3 max-h-[60vh]'>
          <Form {...form}>
            <form
              id='category-form'
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
                        placeholder='Electronics'
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
                name='slug'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='electronics (auto-generated)'
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
                name='parent_id'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Parent</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='None (root category)'
                      className='col-span-4'
                      items={parentOptions}
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
                name='image'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://...'
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
                name='sortOrder'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Sort Order</FormLabel>
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
                name='isActive'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Active</FormLabel>
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
          <Button type='submit' form='category-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
