'use client'

import { useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ImageIcon, Plus, Star, Trash2, UploadCloud } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useProduct,
  useAddProductImage,
  useUploadProductImage,
  useRemoveProductImage,
} from '../hooks'
import { type Product } from '../data/schema'

const urlSchema = z.object({
  url: z.string().url('Must be a valid URL.').min(1, 'Image URL is required.'),
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
})

const uploadSchema = z.object({
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
})

type UrlForm = z.infer<typeof urlSchema>
type UploadForm = z.infer<typeof uploadSchema>

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
  const { mutate: uploadImage, isPending: isUploading } = useUploadProductImage()
  const { mutate: removeImage, isPending: isRemoving } = useRemoveProductImage()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const urlForm = useForm<UrlForm>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: '', alt: '', isPrimary: false, sortOrder: 0 },
  })

  const uploadForm = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
    defaultValues: { alt: '', isPrimary: false, sortOrder: 0 },
  })

  const images = product?.images ?? []

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

  const onSubmitUrl = (values: UrlForm) => {
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
          urlForm.reset({ url: '', alt: '', isPrimary: false, sortOrder: 0 })
        },
        onError: () => toast.error('Failed to add image.'),
      }
    )
  }

  const onSubmitUpload = (values: UploadForm) => {
    if (!imageFile) {
      toast.error('Please select a file.')
      return
    }
    uploadImage(
      {
        id: currentRow.id,
        file: imageFile,
        ...(values.alt && { alt: values.alt }),
        isPrimary: values.isPrimary,
        sortOrder: values.sortOrder,
      },
      {
        onSuccess: () => {
          toast.success('Image uploaded successfully.')
          uploadForm.reset({ alt: '', isPrimary: false, sortOrder: 0 })
          handleClearFile()
        },
        onError: () => toast.error('Failed to upload image.'),
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

  const metaFields = (control: Parameters<typeof FormField>[0]['control']) => (
    <>
      <FormField
        control={control}
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
        control={control}
        name='sortOrder'
        render={({ field }) => (
          <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
            <FormLabel className='col-span-2 text-end'>Sort order</FormLabel>
            <FormControl>
              <Input type='number' min={0} className='col-span-4' {...field} />
            </FormControl>
            <FormMessage className='col-span-4 col-start-3' />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='isPrimary'
        render={({ field }) => (
          <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
            <FormLabel className='col-span-2 text-end'>Primary</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )

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
                  className='h-12 w-12 rounded object-cover shrink-0 bg-muted'
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
                  className='h-8 w-8 text-destructive hover:text-destructive shrink-0'
                  disabled={isRemoving && removingId === img.id}
                  onClick={() => handleRemove(img.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>

          <Separator />

          {/* Add image section */}
          <div>
            <p className='text-sm font-medium mb-3'>Add Image</p>
            <Tabs defaultValue='upload'>
              <TabsList className='mb-3'>
                <TabsTrigger value='upload'>
                  <UploadCloud size={14} className='mr-1.5' />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value='url'>
                  <Plus size={14} className='mr-1.5' />
                  Enter URL
                </TabsTrigger>
              </TabsList>

              {/* Upload file tab */}
              <TabsContent value='upload'>
                <Form {...uploadForm}>
                  <form
                    onSubmit={uploadForm.handleSubmit(onSubmitUpload)}
                    className='space-y-3'
                  >
                    {/* File picker */}
                    <div className='grid grid-cols-6 items-start gap-x-4 gap-y-1'>
                      <span className='col-span-2 pt-2 text-end text-sm font-medium'>
                        File
                      </span>
                      <div className='col-span-4 space-y-2'>
                        {imagePreview ? (
                          <div className='relative w-fit'>
                            <img
                              src={imagePreview}
                              alt='Preview'
                              className='h-20 w-20 rounded-md object-cover border bg-muted'
                            />
                            <Button
                              type='button'
                              variant='destructive'
                              size='icon'
                              className='absolute -top-2 -right-2 h-6 w-6 rounded-full'
                              onClick={handleClearFile}
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        ) : (
                          <div className='flex h-20 w-20 items-center justify-center rounded-md border border-dashed bg-muted text-muted-foreground'>
                            <ImageIcon size={24} />
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
                          <UploadCloud size={14} className='mr-1.5' />
                          {imageFile ? 'Change file' : 'Choose file'}
                        </Button>
                        {imageFile && (
                          <p className='text-xs text-muted-foreground truncate max-w-40'>
                            {imageFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {metaFields(uploadForm.control)}

                    <div className='flex justify-end pt-1'>
                      <Button type='submit' size='sm' disabled={isUploading || !imageFile}>
                        <UploadCloud size={16} className='mr-1' />
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              {/* URL tab */}
              <TabsContent value='url'>
                <Form {...urlForm}>
                  <form
                    onSubmit={urlForm.handleSubmit(onSubmitUrl)}
                    className='space-y-3'
                  >
                    <FormField
                      control={urlForm.control}
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
                    {metaFields(urlForm.control)}
                    <div className='flex justify-end pt-1'>
                      <Button type='submit' size='sm' disabled={isAdding}>
                        <Plus size={16} className='mr-1' />
                        {isAdding ? 'Adding...' : 'Add Image'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
