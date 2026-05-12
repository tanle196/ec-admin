import { CategoriesActionDialog } from './categories-action-dialog'
import { CategoriesDeleteDialog } from './categories-delete-dialog'
import { useCategoriesContext } from './categories-provider'

export function CategoriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategoriesContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <CategoriesActionDialog
        key='category-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
      />

      {currentRow && (
        <>
          <CategoriesActionDialog
            key={`category-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <CategoriesDeleteDialog
            key={`category-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
