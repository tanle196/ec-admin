import { ProductsActionDialog } from './products-action-dialog'
import { ProductsDeleteDialog } from './products-delete-dialog'
import { useProductsContext } from './products-provider'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProductsContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <ProductsActionDialog
        key='product-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
      />

      {currentRow && (
        <>
          <ProductsActionDialog
            key={`product-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <ProductsDeleteDialog
            key={`product-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
