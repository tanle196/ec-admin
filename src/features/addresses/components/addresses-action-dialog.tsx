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
import { useCreateAddress, useUpdateAddress } from '../hooks'
import { type Address } from '../data/schema'

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  phone: z.string().min(1, 'Phone is required.'),
  addressLine1: z.string().min(1, 'Address is required.'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required.'),
  province: z.string().min(1, 'Province is required.'),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  isDefault: z.boolean().optional(),
})

type AddressForm = z.infer<typeof formSchema>

type AddressesActionDialogProps = {
  currentRow?: Address
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddressesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: AddressesActionDialogProps) {
  const isEdit = !!currentRow
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress()
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress()
  const isPending = isCreating || isUpdating

  const form = useForm<AddressForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: currentRow?.fullName ?? '',
      phone: currentRow?.phone ?? '',
      addressLine1: currentRow?.addressLine1 ?? '',
      addressLine2: currentRow?.addressLine2 ?? '',
      city: currentRow?.city ?? '',
      province: currentRow?.province ?? '',
      country: currentRow?.country ?? '',
      postalCode: currentRow?.postalCode ?? '',
      isDefault: currentRow?.isDefault ?? false,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        fullName: currentRow?.fullName ?? '',
        phone: currentRow?.phone ?? '',
        addressLine1: currentRow?.addressLine1 ?? '',
        addressLine2: currentRow?.addressLine2 ?? '',
        city: currentRow?.city ?? '',
        province: currentRow?.province ?? '',
        country: currentRow?.country ?? '',
        postalCode: currentRow?.postalCode ?? '',
        isDefault: currentRow?.isDefault ?? false,
      })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: AddressForm) => {
    const body = {
      fullName: values.fullName,
      phone: values.phone,
      addressLine1: values.addressLine1,
      ...(values.addressLine2 && { addressLine2: values.addressLine2 }),
      city: values.city,
      province: values.province,
      ...(values.country && { country: values.country }),
      ...(values.postalCode && { postalCode: values.postalCode }),
      isDefault: values.isDefault,
    }

    if (isEdit) {
      updateAddress(
        { id: currentRow.id, body },
        {
          onSuccess: () => {
            toast.success('Address updated successfully.')
            onOpenChange(false)
          },
          onError: () => toast.error('Failed to update address.'),
        }
      )
    } else {
      createAddress(body, {
        onSuccess: () => {
          toast.success('Address created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create address.'),
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
          <DialogTitle>{isEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the address here. ' : 'Create new address here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3 max-h-[60vh]'>
          <Form {...form}>
            <form
              id='address-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nguyen Van A'
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
                name='phone'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='0901234567'
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
                name='addressLine1'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='123 Nguyen Hue St'
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
                name='addressLine2'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Address 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Apt 4B (optional)'
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
                name='city'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ho Chi Minh City'
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
                name='province'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Province</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ho Chi Minh'
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
                name='country'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Vietnam'
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
                name='postalCode'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='700000 (optional)'
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
                name='isDefault'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Default</FormLabel>
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
          <Button type='submit' form='address-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
