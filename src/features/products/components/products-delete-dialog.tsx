'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteProduct } from '../hooks'
import { type Product } from '../data/schema'

type ProductsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Product
}

export function ProductsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ProductsDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { mutate: deleteProduct, isPending } = useDeleteProduct()

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return
    deleteProduct(currentRow.id, {
      onSuccess: () => {
        toast.success('Product deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete product.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setValue('')
        onOpenChange(state)
      }}
      form='products-delete-form'
      disabled={value.trim() !== currentRow.name}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Product
        </span>
      }
      desc={
        <form
          id='products-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action cannot be undone.
          </p>

          <Label className='my-2'>
            Product name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter product name to confirm deletion.'
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
