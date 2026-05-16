'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteDiscount } from '../hooks'
import { type Discount } from '../data/schema'

type DiscountsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Discount
}

export function DiscountsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: DiscountsDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { mutate: deleteDiscount, isPending } = useDeleteDiscount()

  const handleDelete = () => {
    if (value.trim().toUpperCase() !== currentRow.code.toUpperCase()) return
    deleteDiscount(currentRow.id, {
      onSuccess: () => {
        toast.success('Discount deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete discount.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setValue('')
        onOpenChange(state)
      }}
      form='discounts-delete-form'
      disabled={value.trim().toUpperCase() !== currentRow.code.toUpperCase()}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Discount
        </span>
      }
      desc={
        <form
          id='discounts-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            Are you sure you want to delete discount{' '}
            <span className='font-bold font-mono'>{currentRow.code}</span>?
            <br />
            This action cannot be undone.
          </p>
          <Label className='my-2'>
            Discount code:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter discount code to confirm deletion.'
              className='font-mono uppercase'
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
