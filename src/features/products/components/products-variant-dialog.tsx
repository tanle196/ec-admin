'use client'

import { useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Pencil,
  Plus,
  Trash2,
  Check,
  X,
  ImageIcon,
  UploadCloud,
  Star,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  type ProductImageResponseDto,
  type ProductVariantResponseDto,
} from '@/api/main'
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
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Product } from '../data/schema'
import {
  useProduct,
  useAddProductVariant,
  useRemoveProductVariant,
  useUpdateProductVariant,
  useAddProductImage,
  useUploadProductImage,
  useRemoveProductImage,
} from '../hooks'

// ── Shared schema ──────────────────────────────────────────────────────────────
const variantSchema = z.object({
  name: z.string().min(1, 'Variant name is required.'),
  sku: z.string().min(1, 'SKU is required.'),
  price: z.coerce.number().min(0, 'Price must be non-negative.'),
  stock: z.coerce
    .number()
    .int()
    .min(0, 'Stock must be non-negative.')
    .optional(),
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
                  <Input
                    placeholder='e.g. 128GB / Black'
                    className='h-8 text-sm'
                    autoComplete='off'
                    {...field}
                  />
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
                  <Input
                    placeholder='VAR-001'
                    className='h-8 font-mono text-xs'
                    autoComplete='off'
                    {...field}
                  />
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
                  <Input
                    type='number'
                    min={0}
                    step='0.01'
                    className='h-8 text-sm'
                    {...field}
                  />
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
                  <Input
                    type='number'
                    min={0}
                    className='h-8 text-sm'
                    {...field}
                  />
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
        <div className='space-y-3 rounded-md border bg-muted/40 p-3'>
          <div className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Name</FormLabel>
                  <FormControl>
                    <Input
                      className='h-8 text-sm'
                      autoComplete='off'
                      {...field}
                    />
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
                    <Input
                      className='h-8 font-mono text-xs'
                      autoComplete='off'
                      {...field}
                    />
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
                    <Input
                      type='number'
                      min={0}
                      step='0.01'
                      className='h-8 text-sm'
                      {...field}
                    />
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
                    <Input
                      type='number'
                      min={0}
                      className='h-8 text-sm'
                      {...field}
                    />
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

// ── Variant images panel ───────────────────────────────────────────────────────
const imageUploadSchema = z.object({
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
})

const imageUrlSchema = z.object({
  url: z.string().url('Must be a valid URL.').min(1, 'Image URL is required.'),
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
})

type ImageUploadForm = z.infer<typeof imageUploadSchema>
type ImageUrlForm = z.infer<typeof imageUrlSchema>

function VariantImagesPanel({
  productId,
  variant,
  images,
  onDone,
}: {
  productId: string
  variant: ProductVariantResponseDto
  images: ProductImageResponseDto[]
  onDone: () => void
}) {
  const { mutate: addImage, isPending: isAdding } = useAddProductImage()
  const { mutate: uploadImage, isPending: isUploading } =
    useUploadProductImage()
  const { mutate: removeImage, isPending: isRemoving } = useRemoveProductImage()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadForm = useForm<ImageUploadForm>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: { alt: '', isPrimary: false },
  })
  const urlForm = useForm<ImageUrlForm>({
    resolver: zodResolver(imageUrlSchema),
    defaultValues: { url: '', alt: '', isPrimary: false },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleClearFile = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmitUpload = (values: ImageUploadForm) => {
    if (!imageFile) {
      toast.error('Please select a file.')
      return
    }
    uploadImage(
      {
        id: productId,
        file: imageFile,
        variant_id: variant.id,
        ...(values.alt && { alt: values.alt }),
        isPrimary: values.isPrimary,
      },
      {
        onSuccess: () => {
          toast.success('Image uploaded.')
          uploadForm.reset({ alt: '', isPrimary: false })
          handleClearFile()
        },
        onError: () => toast.error('Failed to upload image.'),
      }
    )
  }

  const onSubmitUrl = (values: ImageUrlForm) => {
    addImage(
      {
        id: productId,
        body: {
          url: values.url,
          variant_id: variant.id,
          ...(values.alt && { alt: values.alt }),
          isPrimary: values.isPrimary,
        },
      },
      {
        onSuccess: () => {
          toast.success('Image added.')
          urlForm.reset({ url: '', alt: '', isPrimary: false })
        },
        onError: () => toast.error('Failed to add image.'),
      }
    )
  }

  const handleRemove = (imageId: string) => {
    setRemovingId(imageId)
    removeImage(
      { id: productId, imageId },
      {
        onSuccess: () => toast.success('Image removed.'),
        onError: () => toast.error('Failed to remove image.'),
        onSettled: () => setRemovingId(null),
      }
    )
  }

  return (
    <div className='space-y-3 rounded-md border bg-muted/40 p-3'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium'>
          Images —{' '}
          <span className='font-normal text-muted-foreground'>
            {variant.name}
          </span>
        </p>
        <Button type='button' variant='ghost' size='sm' onClick={onDone}>
          <X size={14} className='mr-1' />
          Close
        </Button>
      </div>

      {images.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {images.map((img) => (
            <div key={img.id} className='relative w-fit'>
              <img
                src={img.url}
                alt={typeof img.alt === 'string' ? img.alt : ''}
                className='h-16 w-16 rounded-md border bg-muted object-cover'
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              {img.isPrimary && (
                <Badge
                  variant='secondary'
                  className='absolute -top-2 -left-2 gap-0.5 px-1 py-0 text-xs'
                >
                  <Star size={10} />
                </Badge>
              )}
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute -top-2 -right-2 h-5 w-5 rounded-full'
                disabled={isRemoving && removingId === img.id}
                onClick={() => handleRemove(img.id)}
              >
                <Trash2 size={11} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {images.length === 0 && (
        <p className='text-xs text-muted-foreground'>
          No images for this variant yet.
        </p>
      )}

      <Tabs defaultValue='upload'>
        <TabsList className='mb-2 h-8'>
          <TabsTrigger value='upload' className='text-xs'>
            <UploadCloud size={12} className='mr-1' />
            Upload
          </TabsTrigger>
          <TabsTrigger value='url' className='text-xs'>
            <Plus size={12} className='mr-1' />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value='upload'>
          <Form {...uploadForm}>
            <form
              onSubmit={uploadForm.handleSubmit(onSubmitUpload)}
              className='space-y-2'
            >
              <div className='flex items-center gap-2'>
                {imagePreview ? (
                  <div className='relative w-fit'>
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='h-12 w-12 rounded-md border bg-muted object-cover'
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='absolute -top-2 -right-2 h-5 w-5 rounded-full'
                      onClick={handleClearFile}
                    >
                      <Trash2 size={11} />
                    </Button>
                  </div>
                ) : (
                  <div className='flex h-12 w-12 items-center justify-center rounded-md border border-dashed bg-muted text-muted-foreground'>
                    <ImageIcon size={18} />
                  </div>
                )}
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
                  {imageFile ? 'Change file' : 'Choose file'}
                </Button>
              </div>
              <div className='flex items-center gap-3'>
                <FormField
                  control={uploadForm.control}
                  name='alt'
                  render={({ field }) => (
                    <FormItem className='flex-1 space-y-0'>
                      <FormControl>
                        <Input
                          placeholder='Alt text'
                          className='h-8 text-xs'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={uploadForm.control}
                  name='isPrimary'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-1.5 space-y-0'>
                      <FormLabel className='text-xs'>Primary</FormLabel>
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
              </div>
              <div className='flex justify-end'>
                <Button
                  type='submit'
                  size='sm'
                  disabled={isUploading || !imageFile}
                >
                  <UploadCloud size={14} className='mr-1' />
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value='url'>
          <Form {...urlForm}>
            <form
              onSubmit={urlForm.handleSubmit(onSubmitUrl)}
              className='space-y-2'
            >
              <FormField
                control={urlForm.control}
                name='url'
                render={({ field }) => (
                  <FormItem className='space-y-0'>
                    <FormControl>
                      <Input
                        placeholder='https://example.com/image.jpg'
                        className='h-8 text-xs'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-3'>
                <FormField
                  control={urlForm.control}
                  name='alt'
                  render={({ field }) => (
                    <FormItem className='flex-1 space-y-0'>
                      <FormControl>
                        <Input
                          placeholder='Alt text'
                          className='h-8 text-xs'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={urlForm.control}
                  name='isPrimary'
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-1.5 space-y-0'>
                      <FormLabel className='text-xs'>Primary</FormLabel>
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
              </div>
              <div className='flex justify-end'>
                <Button type='submit' size='sm' disabled={isAdding}>
                  <Plus size={14} className='mr-1' />
                  {isAdding ? 'Adding...' : 'Add'}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
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
  const { mutate: removeVariant, isPending: isRemoving } =
    useRemoveProductVariant()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imagesId, setImagesId] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const variants = product?.variants ?? []
  const images = product?.images ?? []

  const variantImages = (variantId: string) =>
    images.filter(
      (img) =>
        typeof img.variant_id === 'string' && img.variant_id === variantId
    )

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
        if (!state) {
          setEditingId(null)
          setImagesId(null)
        }
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

        <div className='max-h-[65vh] w-[calc(100%+0.75rem)] space-y-4 overflow-y-auto py-1 pe-3'>
          {/* Variant list */}
          <div className='space-y-2'>
            {isLoading && (
              <p className='text-sm text-muted-foreground'>
                Loading variants...
              </p>
            )}
            {!isLoading && variants.length === 0 && (
              <p className='text-sm text-muted-foreground'>No variants yet.</p>
            )}
            {variants.map((variant) => {
              if (editingId === variant.id) {
                return (
                  <EditVariantRow
                    key={variant.id}
                    productId={currentRow.id}
                    variant={variant}
                    onDone={() => setEditingId(null)}
                  />
                )
              }
              if (imagesId === variant.id) {
                return (
                  <VariantImagesPanel
                    key={variant.id}
                    productId={currentRow.id}
                    variant={variant}
                    images={variantImages(variant.id)}
                    onDone={() => setImagesId(null)}
                  />
                )
              }
              const thumb =
                variantImages(variant.id).find((img) => img.isPrimary) ??
                variantImages(variant.id)[0]
              return (
                <div
                  key={variant.id}
                  className='flex items-center gap-3 rounded-md border p-3'
                >
                  {thumb ? (
                    <img
                      src={thumb.url}
                      alt=''
                      className='h-10 w-10 shrink-0 rounded bg-muted object-cover'
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).style.display =
                          'none'
                      }}
                    />
                  ) : (
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded border border-dashed bg-muted text-muted-foreground'>
                      <ImageIcon size={16} />
                    </div>
                  )}
                  <div className='min-w-0 flex-1 space-y-0.5'>
                    <div className='flex items-center gap-2'>
                      <span className='truncate text-sm font-medium'>
                        {variant.name}
                      </span>
                      <Badge
                        variant={variant.isActive ? 'default' : 'secondary'}
                        className='px-1.5 py-0 text-xs'
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
                  <div className='flex flex-shrink-0 items-center gap-1'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => setImagesId(variant.id)}
                    >
                      <ImageIcon size={14} />
                    </Button>
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
            })}
          </div>

          <Separator />

          {/* Add variant form */}
          <div>
            <p className='mb-3 text-sm font-medium'>Add Variant</p>
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
