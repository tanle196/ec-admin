'use client'

import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Banner } from '../data/schema'
import { useDeleteBanner } from '../hooks'

type BannersDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Banner
}

export function BannersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: BannersDeleteDialogProps) {
  const { mutate: deleteBanner, isPending } = useDeleteBanner()

  const handleDelete = () => {
    deleteBanner(currentRow.id, {
      onSuccess: () => {
        toast.success('Banner deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete banner.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Banner
        </span>
      }
      desc={
        <p>
          Are you sure you want to delete banner{' '}
          <span className='font-bold'>{currentRow.title}</span>?
          <br />
          Its images will also be removed from storage. This action cannot be
          undone.
        </p>
      }
      confirmText='Delete'
      destructive
    />
  )
}
