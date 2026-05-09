'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteRole } from '../hooks'
import { type Role } from '../data/schema'

type RolesDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Role
}

export function RolesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: RolesDeleteDialogProps) {
  const [value, setValue] = useState('')
  const { mutate: deleteRole, isPending } = useDeleteRole()

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return
    deleteRole(currentRow.id, {
      onSuccess: () => {
        toast.success('Role deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete role.'),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setValue('')
        onOpenChange(state)
      }}
      form='roles-delete-form'
      disabled={value.trim() !== currentRow.name}
      isLoading={isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Role
        </span>
      }
      desc={
        <form
          id='roles-delete-form'
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
            Role name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter role name to confirm deletion.'
              autoFocus
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </form>
      }
      confirmText='Delete'
      destructive
    />
  )
}
