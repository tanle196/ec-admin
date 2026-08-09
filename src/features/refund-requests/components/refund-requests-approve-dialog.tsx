'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useApproveRefundRequest } from '../hooks'
import { type RefundRequestListItem } from '../data/schema'

type RefundRequestsApproveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: RefundRequestListItem
}

export function RefundRequestsApproveDialog({ open, onOpenChange, currentRow }: RefundRequestsApproveDialogProps) {
  const [note, setNote] = useState('')
  const { mutate: approveRefundRequest, isPending } = useApproveRefundRequest()

  const handleApprove = () => {
    approveRefundRequest(
      { id: currentRow.id, orderId: currentRow.order_id, paymentId: currentRow.payment_id, note: note.trim() || undefined },
      {
        onSuccess: () => {
          toast.success('Refund request approved.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to approve refund request.'),
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
      handleConfirm={handleApprove}
      isLoading={isPending}
      title='Approve Refund Request'
      desc={
        <div className='space-y-4'>
          <p>
            This will create and execute a refund for order{' '}
            <span className='font-mono text-xs'>{currentRow.order_id}</span>. This action cannot be undone.
          </p>
          <Label className='block space-y-2'>
            <span>Admin note (optional)</span>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Enter an optional note'
            />
          </Label>
        </div>
      }
      confirmText='Approve'
    />
  )
}
