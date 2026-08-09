'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useRejectRefundRequest } from '../hooks'
import { type RefundRequestListItem } from '../data/schema'

type RefundRequestsRejectDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: RefundRequestListItem
}

export function RefundRequestsRejectDialog({ open, onOpenChange, currentRow }: RefundRequestsRejectDialogProps) {
  const [note, setNote] = useState('')
  const { mutate: rejectRefundRequest, isPending } = useRejectRefundRequest()

  const handleReject = () => {
    if (!note.trim()) return
    rejectRefundRequest(
      { id: currentRow.id, note: note.trim() },
      {
        onSuccess: () => {
          toast.success('Refund request rejected.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to reject refund request.'),
      }
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setNote('')
        onOpenChange(state)
      }}
      handleConfirm={handleReject}
      disabled={!note.trim()}
      isLoading={isPending}
      title={<span className='text-destructive'>Reject Refund Request</span>}
      desc={
        <div className='space-y-4'>
          <p>Are you sure you want to reject this refund request?</p>
          <Label className='block space-y-2'>
            <span>Reason for rejection</span>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Enter a reason'
              autoFocus
            />
          </Label>
        </div>
      }
      confirmText='Reject'
      destructive
    />
  )
}
