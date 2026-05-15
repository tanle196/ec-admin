import { CartAddItemDialog } from './cart-add-item-dialog'
import { CartUpdateQtyDialog } from './cart-update-qty-dialog'
import { useCartContext } from './cart-provider'

export function CartDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCartContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <CartAddItemDialog
        open={open === 'add-item'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null)
        }}
      />

      {currentRow && (
        <CartUpdateQtyDialog
          key={`cart-update-qty-${currentRow.id}`}
          open={open === 'update-qty'}
          onOpenChange={closeWithRow}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
