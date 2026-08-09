import { RefundRequestsApproveDialog } from './refund-requests-approve-dialog'
import { RefundRequestsDetailDialog } from './refund-requests-detail-dialog'
import { useRefundRequestsContext } from './refund-requests-provider'
import { RefundRequestsRejectDialog } from './refund-requests-reject-dialog'

export function RefundRequestsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRefundRequestsContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      {currentRow && (
        <>
          <RefundRequestsDetailDialog
            key={`refund-request-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <RefundRequestsApproveDialog
            key={`refund-request-approve-${currentRow.id}`}
            open={open === 'approve'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <RefundRequestsRejectDialog
            key={`refund-request-reject-${currentRow.id}`}
            open={open === 'reject'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
