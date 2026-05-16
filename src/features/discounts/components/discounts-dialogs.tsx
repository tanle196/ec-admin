import { DiscountsActionDialog } from './discounts-action-dialog'
import { DiscountsDeleteDialog } from './discounts-delete-dialog'
import { useDiscountsContext } from './discounts-provider'

export function DiscountsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDiscountsContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <DiscountsActionDialog
        key='discount-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
      />

      {currentRow && (
        <>
          <DiscountsActionDialog
            key={`discount-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <DiscountsDeleteDialog
            key={`discount-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
