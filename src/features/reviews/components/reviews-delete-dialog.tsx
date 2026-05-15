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
import { useDeleteReview } from '../hooks'
import { type Review } from '../data/schema'

type ReviewsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Review
}

export function ReviewsDeleteDialog({ open, onOpenChange, currentRow }: ReviewsDeleteDialogProps) {
  const { mutate: deleteReview, isPending } = useDeleteReview()

  const handleDelete = () => {
    deleteReview(currentRow.id, {
      onSuccess: () => {
        toast.success('Review deleted successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to delete review.'),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The review will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
