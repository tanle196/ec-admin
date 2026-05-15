import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useApproveReview } from '../hooks'
import { type Review } from '../data/schema'

type ReviewsApproveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Review
}

export function ReviewsApproveDialog({ open, onOpenChange, currentRow }: ReviewsApproveDialogProps) {
  const { mutate: approve, isPending } = useApproveReview()

  const handleApprove = () => {
    approve(currentRow.id, {
      onSuccess: () => {
        toast.success('Review approved successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to approve review.'),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>Approve Review</DialogTitle>
          <DialogDescription>
            Approve this review so it becomes publicly visible on the product page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleApprove} disabled={isPending}>
            {isPending ? 'Approving...' : 'Approve'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
