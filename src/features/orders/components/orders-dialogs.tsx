import { OrdersDetailDialog } from './orders-detail-dialog'
import { OrdersStatusDialog } from './orders-status-dialog'
import { useOrdersContext } from './orders-provider'

export function OrdersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useOrdersContext()

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
          <OrdersDetailDialog
            key={`order-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <OrdersStatusDialog
            key={`order-status-${currentRow.id}`}
            open={open === 'update-status'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
