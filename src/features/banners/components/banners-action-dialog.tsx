'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { type UpdateBannerDto } from '@/api/main'
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
import { Switch } from '@/components/ui/switch'
import { SelectDropdown } from '@/components/select-dropdown'
import {
  type Banner,
  type BannerLinkType,
  asDate,
  asString,
  bannerLinkTypes,
  bannerPositions,
} from '../data/schema'
import {
  useCreateBanner,
  useUpdateBanner,
  useUploadBannerImage,
} from '../hooks'
import { BannerImageField } from './banner-image-field'

const formSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required.'),
    subtitle: z.string().optional(),
    position: z.enum(['hero', 'promo_strip', 'mid_page', 'popup']),
    linkType: z.enum(['url', 'product', 'category', 'discount']),
    linkValue: z.string().optional(),
    sortOrder: z.coerce.number<number>().int().min(0, 'Must be 0 or more.'),
    isActive: z.boolean(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
  })
  .refine(
    (v) =>
      !v.startsAt || !v.endsAt || new Date(v.endsAt) > new Date(v.startsAt),
    { path: ['endsAt'], message: 'End must be after start.' }
  )

type BannerForm = z.infer<typeof formSchema>

const linkValuePlaceholder: Record<BannerLinkType, string> = {
  url: '/products?tag=sale or https://…',
  product: 'Product ID or slug',
  category: 'Category ID or slug',
  discount: 'Discount code',
}

const toDatetimeLocal = (v: unknown): string => {
  const d = asDate(v)
  return d ? format(d, "yyyy-MM-dd'T'HH:mm") : ''
}

type BannersActionDialogProps = {
  currentRow?: Banner
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BannersActionDialog({
  currentRow,
  open,
  onOpenChange,
}: BannersActionDialogProps) {
  const isEdit = !!currentRow
  const { mutateAsync: createBanner, isPending: isCreating } = useCreateBanner()
  const { mutateAsync: updateBanner, isPending: isUpdating } = useUpdateBanner()
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadBannerImage()
  const isPending = isCreating || isUpdating || isUploading

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageMobileFile, setImageMobileFile] = useState<File | null>(null)
  const [imageError, setImageError] = useState<string>()

  const defaultValues = (): BannerForm => ({
    title: currentRow?.title ?? '',
    subtitle: asString(currentRow?.subtitle) ?? '',
    position: currentRow?.position ?? 'hero',
    linkType: currentRow?.linkType ?? 'url',
    linkValue: asString(currentRow?.linkValue) ?? '',
    sortOrder: currentRow?.sortOrder ?? 0,
    isActive: currentRow?.isActive ?? true,
    startsAt: toDatetimeLocal(currentRow?.startsAt),
    endsAt: toDatetimeLocal(currentRow?.endsAt),
  })

  const form = useForm<BannerForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues(),
  })
  const linkType = useWatch({ control: form.control, name: 'linkType' })

  // Reset local image state whenever the dialog opens or the row changes.
  // Done during render (not in an effect) to avoid a cascading re-render.
  const [prevOpen, setPrevOpen] = useState(open)
  const [prevRow, setPrevRow] = useState(currentRow)
  if (open !== prevOpen || currentRow !== prevRow) {
    setPrevOpen(open)
    setPrevRow(currentRow)
    if (open) {
      setImageFile(null)
      setImageMobileFile(null)
      setImageError(undefined)
    }
  }

  useEffect(() => {
    if (open) form.reset(defaultValues())
  }, [open, currentRow]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: BannerForm) => {
    if (!isEdit && !imageFile) {
      setImageError('Desktop image is required.')
      return
    }

    try {
      if (isEdit) {
        // Empty strings / null clear previously set values on update.
        const body: UpdateBannerDto = {
          title: values.title,
          subtitle: values.subtitle ?? '',
          position: values.position,
          linkType: values.linkType,
          linkValue: values.linkValue ?? '',
          sortOrder: values.sortOrder,
          isActive: values.isActive,
          startsAt: (values.startsAt
            ? new Date(values.startsAt)
            : null) as unknown as Date,
          endsAt: (values.endsAt
            ? new Date(values.endsAt)
            : null) as unknown as Date,
        }
        await updateBanner({ id: currentRow.id, body })
        if (imageFile) await uploadImage({ id: currentRow.id, file: imageFile })
        if (imageMobileFile)
          await uploadImage({
            id: currentRow.id,
            file: imageMobileFile,
            isMobile: true,
          })
        toast.success('Banner updated successfully.')
      } else {
        await createBanner({
          body: {
            title: values.title,
            ...(values.subtitle && { subtitle: values.subtitle }),
            position: values.position,
            linkType: values.linkType,
            ...(values.linkValue && { linkValue: values.linkValue }),
            sortOrder: values.sortOrder,
            isActive: values.isActive,
            ...(values.startsAt && { startsAt: new Date(values.startsAt) }),
            ...(values.endsAt && { endsAt: new Date(values.endsAt) }),
          },
          imageFile,
          imageMobileFile,
        })
        toast.success('Banner created successfully.')
      }
      onOpenChange(false)
    } catch {
      toast.error(
        isEdit ? 'Failed to update banner.' : 'Failed to create banner.'
      )
    }
  }

  const row = 'grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the banner here. ' : 'Create a new banner here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[65vh] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='banner-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Flash Sale 6.6'
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
                name='subtitle'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Subtitle
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Optional'
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
                name='position'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Position
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select position'
                      className='col-span-4'
                      items={bannerPositions}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <BannerImageField
                label='Desktop image'
                currentUrl={currentRow?.imageUrl ?? null}
                file={imageFile}
                onFileChange={(f) => {
                  setImageFile(f)
                  if (f) setImageError(undefined)
                }}
                aspectClassName='h-24 w-48'
                error={imageError}
              />
              <BannerImageField
                label='Mobile image'
                currentUrl={asString(currentRow?.imageMobileUrl)}
                file={imageMobileFile}
                onFileChange={setImageMobileFile}
                aspectClassName='h-28 w-20'
              />

              <FormField
                control={form.control}
                name='linkType'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Link type
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select link type'
                      className='col-span-4'
                      items={bannerLinkTypes}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='linkValue'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Link value
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={linkValuePlaceholder[linkType]}
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
                name='sortOrder'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Sort order
                    </FormLabel>
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
                name='startsAt'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Starts at
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='datetime-local'
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
                name='endsAt'
                render={({ field }) => (
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Ends at
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='datetime-local'
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
                  <FormItem className={row}>
                    <FormLabel className='col-span-2 text-end'>
                      Active
                    </FormLabel>
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
          <Button type='submit' form='banner-form' disabled={isPending}>
            {isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
