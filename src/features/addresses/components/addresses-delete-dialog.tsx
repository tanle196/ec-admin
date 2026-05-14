'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteAddress } from '../hooks'
import { type Address } from '../data/schema'

type AddressesDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Address
}

export function AddressesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: AddressesDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { mutate: deleteAddress, isPending } = useDeleteAddress()

  const handleDelete = () => {
    if (value.trim() !== currentRow.addressLine1) return
    deleteAddress(currentRow.id, {
      onSuccess: () => {
        toast.success('Address deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete address.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setValue('')
        onOpenChange(state)
      }}
      form='addresses-delete-form'
      disabled={value.trim() !== currentRow.addressLine1}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Address
        </span>
      }
      desc={
        <form
          id='addresses-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            Are you sure you want to delete the address for{' '}
            <span className='font-bold'>{currentRow.fullName}</span>?
            <br />
            This action cannot be undone.
          </p>

          <Label className='my-2'>
            Address:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter address line to confirm deletion.'
              autoFocus
            />
          </Label>
        </form>
      }
      confirmText='Delete'
      destructive
    />
  )
}
