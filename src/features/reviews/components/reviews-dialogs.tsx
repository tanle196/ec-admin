import { useReviewsContext } from './reviews-provider'
import { ReviewsApproveDialog } from './reviews-approve-dialog'

export function ReviewsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useReviewsContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      {currentRow && (
        <ReviewsApproveDialog
          key={`review-approve-${currentRow.id}`}
          open={open === 'approve'}
          onOpenChange={closeWithRow}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
