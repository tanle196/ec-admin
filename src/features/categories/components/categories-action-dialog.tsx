'use client'

import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ImageIcon, Trash2, UploadCloud } from 'lucide-react'
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
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useUploadCategoryImage,
  useRemoveCategoryImage,
} from '../hooks'
import { type Category } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required.'),
  slug: z.string().optional(),
  parent_id: z.string().optional(),
  description: z.string().optional(),
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
  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory()
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory()
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadCategoryImage()
  const { mutateAsync: removeImage, isPending: isRemoving } = useRemoveCategoryImage()
  const isPending = isCreating || isUpdating || isUploading || isRemoving

  const { data: categoriesData } = useCategories()

  const parentOptions = (categoriesData?.data ?? [])
    .filter((c) => c.id !== currentRow?.id)
    .map((c) => ({ label: c.name, value: c.id }))

  const getParentId = (row?: Category) => {
    const pid = row?.parent_id
    if (!pid || typeof pid === 'object') return ''
    return pid
  }

  const currentImageUrl =
    typeof currentRow?.image === 'string' ? currentRow.image : null

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name ?? '',
      slug: currentRow?.slug ?? '',
      parent_id: getParentId(currentRow),
      description: typeof currentRow?.description === 'string' ? currentRow.description : '',
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
        sortOrder: currentRow?.sortOrder ?? 0,
        isActive: currentRow?.isActive ?? true,
      })
      setImageFile(null)
      setImagePreview(null)
      setShouldRemoveImage(false)
    }
  }, [open, currentRow, form])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setShouldRemoveImage(false)
  }

  const handleClearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (isEdit && currentImageUrl) setShouldRemoveImage(true)
  }

  const displayedImage = imagePreview ?? (shouldRemoveImage ? null : currentImageUrl)

  const onSubmit = async (values: CategoryForm) => {
    const body = {
      name: values.name,
      ...(values.slug && { slug: values.slug }),
      ...(values.parent_id && { parent_id: values.parent_id }),
      ...(values.description && { description: values.description }),
      sortOrder: values.sortOrder,
      isActive: values.isActive,
    }

    try {
      if (isEdit) {
        await updateCategory({ id: currentRow.id, body })
        if (imageFile) {
          await uploadImage({ id: currentRow.id, file: imageFile })
        } else if (shouldRemoveImage) {
          await removeImage({ id: currentRow.id })
        }
        toast.success('Category updated successfully.')
      } else {
        const created = await createCategory(body)
        if (imageFile && created?.id) {
          await uploadImage({ id: created.id, file: imageFile })
        }
        toast.success('Category created successfully.')
      }
      onOpenChange(false)
    } catch {
      toast.error(isEdit ? 'Failed to update category.' : 'Failed to create category.')
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

              {/* Image upload section */}
              <div className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                <span className='col-span-2 pt-2 text-end text-sm font-medium'>
                  Image
                </span>
                <div className='col-span-4 space-y-2'>
                  {displayedImage ? (
                    <div className='relative w-fit'>
                      <img
                        src={displayedImage}
                        alt='Category image'
                        className='h-24 w-24 rounded-md object-cover border bg-muted'
                        onError={(e) => {
                          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      <Button
                        type='button'
                        variant='destructive'
                        size='icon'
                        className='absolute -top-2 -right-2 h-6 w-6 rounded-full'
                        onClick={handleClearImage}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  ) : (
                    <div className='flex h-24 w-24 items-center justify-center rounded-md border border-dashed bg-muted text-muted-foreground'>
                      <ImageIcon size={28} />
                    </div>
                  )}
                  <div>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={handleFileChange}
                    />
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud size={14} className='mr-1.5' />
                      {displayedImage ? 'Change image' : 'Upload image'}
                    </Button>
                  </div>
                </div>
              </div>

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
