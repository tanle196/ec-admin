'use client'

import { AlertTriangle } from 'lucide-react'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeletePermission } from '../hooks'
import { type Permission } from '../data/schema'

type PermissionsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Permission
}

export function PermissionsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: PermissionsDeleteDialogProps) {
  const { mutate: deletePermission, isPending } = useDeletePermission()

  const handleDelete = () => {
    deletePermission(currentRow.id, {
      onSuccess: () => {
        toast.success('Permission deleted successfully.')
        onOpenChange(false)
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 409) {
          toast.error('Cannot delete: this permission is assigned to one or more roles.')
        } else {
          toast.error('Failed to delete permission.')
        }
      },
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      form='permissions-delete-form'
      disabled={false}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Permission
        </span>
      }
      desc={
        <form
          id='permissions-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            Are you sure you want to delete the permission{' '}
            <span className='font-bold'>
              {currentRow.module}:{currentRow.action}
            </span>
            ?
            <br />
            This action cannot be undone.
          </p>
          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This will remove the permission from all roles that use it.
            </AlertDescription>
          </Alert>
        </form>
      }
      confirmText='Delete'
      destructive
    />
  )
}
