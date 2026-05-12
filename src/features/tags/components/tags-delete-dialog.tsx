'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteTag } from '../hooks'
import { type Tag } from '../data/schema'

type TagsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Tag
}

export function TagsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: TagsDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { mutate: deleteTag, isPending } = useDeleteTag()

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return
    deleteTag(currentRow.id, {
      onSuccess: () => {
        toast.success('Tag deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete tag.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setValue('')
        onOpenChange(state)
      }}
      form='tags-delete-form'
      disabled={value.trim() !== currentRow.name}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Tag
        </span>
      }
      desc={
        <form
          id='tags-delete-form'
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
            Tag name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter tag name to confirm deletion.'
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
