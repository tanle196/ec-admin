'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteCategory } from '../hooks'
import { type Category } from '../data/schema'

type CategoriesDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Category
}

export function CategoriesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: CategoriesDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { mutate: deleteCategory, isPending } = useDeleteCategory()

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return
    deleteCategory(currentRow.id, {
      onSuccess: () => {
        toast.success('Category deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete category. Make sure it has no sub-categories.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setValue('')
        onOpenChange(state)
      }}
      form='categories-delete-form'
      disabled={value.trim() !== currentRow.name}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Category
        </span>
      }
      desc={
        <form
          id='categories-delete-form'
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
            Category name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter category name to confirm deletion.'
              autoFocus
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Category must have no sub-categories before it can be deleted.
            </AlertDescription>
          </Alert>
        </form>
      }
      confirmText='Delete'
      destructive
    />
  )
}
