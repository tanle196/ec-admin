import { PaymentsDetailDialog } from './payments-detail-dialog'
import { PaymentsStatusDialog } from './payments-status-dialog'
import { usePaymentsContext } from './payments-provider'

export function PaymentsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePaymentsContext()

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
          <PaymentsDetailDialog
            key={`payment-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <PaymentsStatusDialog
            key={`payment-status-${currentRow.id}`}
            open={open === 'update-status'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
