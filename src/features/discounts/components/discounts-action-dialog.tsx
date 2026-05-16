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
import { Switch } from '@/components/ui/switch'
import { SelectDropdown } from '@/components/select-dropdown'
import { useCreateDiscount, useUpdateDiscount } from '../hooks'
import { type Discount } from '../data/schema'

const formSchema = z.object({
  code: z.string().min(1, 'Discount code is required.').toUpperCase(),
  type: z.enum(['percent', 'fixed']),
  value: z.coerce.number().min(0, 'Value must be positive.'),
  minOrderValue: z.coerce.number().min(0).optional(),
  usageLimit: z.coerce.number().int().min(1).optional(),
  isActive: z.boolean().optional(),
  startsAt: z.string().optional(),
  expiresAt: z.string().optional(),
})

type DiscountForm = z.infer<typeof formSchema>

type DiscountsActionDialogProps = {
  currentRow?: Discount
  open: boolean
  onOpenChange: (open: boolean) => void
}

const toDatetimeLocal = (v: unknown): string => {
  if (!v) return ''
  const d = v instanceof Date ? v : null
  if (!d || isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 16)
}

const toNumber = (v: unknown): number | undefined => {
  if (typeof v === 'number') return v
  return undefined
}

export function DiscountsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: DiscountsActionDialogProps) {
  const isEdit = !!currentRow
  const { mutate: createDiscount, isPending: isCreating } = useCreateDiscount()
  const { mutate: updateDiscount, isPending: isUpdating } = useUpdateDiscount()
  const isPending = isCreating || isUpdating

  const defaultValues = (): DiscountForm => ({
    code: currentRow?.code ?? '',
    type: currentRow?.type ?? 'percent',
    value: currentRow?.value ?? 0,
    minOrderValue: toNumber(currentRow?.minOrderValue),
    usageLimit: toNumber(currentRow?.usageLimit),
    isActive: currentRow?.isActive ?? true,
    startsAt: toDatetimeLocal(currentRow?.startsAt),
    expiresAt: toDatetimeLocal(currentRow?.expiresAt),
  })

  const form = useForm<DiscountForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues(),
  })

  useEffect(() => {
    if (open) form.reset(defaultValues())
  }, [open, currentRow]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: DiscountForm) => {
    const body = {
      code: values.code,
      type: values.type,
      value: values.value,
      ...(values.minOrderValue != null && { minOrderValue: values.minOrderValue }),
      ...(values.usageLimit != null && { usageLimit: values.usageLimit }),
      isActive: values.isActive,
      ...(values.startsAt && { startsAt: new Date(values.startsAt) }),
      ...(values.expiresAt && { expiresAt: new Date(values.expiresAt) }),
    }

    if (isEdit) {
      updateDiscount(
        { id: currentRow.id, body },
        {
          onSuccess: () => {
            toast.success('Discount updated successfully.')
            onOpenChange(false)
          },
          onError: () => toast.error('Failed to update discount.'),
        }
      )
    } else {
      createDiscount(body, {
        onSuccess: () => {
          toast.success('Discount created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create discount.'),
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
          <DialogTitle>{isEdit ? 'Edit Discount' : 'Add New Discount'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the discount here. ' : 'Create a new discount code here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3 max-h-[60vh]'>
          <Form {...form}>
            <form
              id='discount-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='SUMMER20'
                        className='col-span-4 font-mono uppercase'
                        autoComplete='off'
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Type</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select type'
                      className='col-span-4'
                      items={[
                        { label: 'Percent (%)', value: 'percent' },
                        { label: 'Fixed (VND)', value: 'fixed' },
                      ]}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='value'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Value</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        placeholder={form.watch('type') === 'percent' ? '0–100' : 'Amount in VND'}
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
                name='minOrderValue'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Min Order</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        placeholder='Minimum order value (VND)'
                        className='col-span-4'
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value === '' ? undefined : e.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='usageLimit'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Usage Limit</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        placeholder='Unlimited if empty'
                        className='col-span-4'
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value === '' ? undefined : e.target.value)
                        }
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
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Starts At</FormLabel>
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
                name='expiresAt'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Expires At</FormLabel>
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
          <Button type='submit' form='discount-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
