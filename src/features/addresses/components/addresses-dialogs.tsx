import { AddressesActionDialog } from './addresses-action-dialog'
import { AddressesDeleteDialog } from './addresses-delete-dialog'
import { useAddressesContext } from './addresses-provider'

export function AddressesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAddressesContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <AddressesActionDialog
        key='address-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
      />

      {currentRow && (
        <>
          <AddressesActionDialog
            key={`address-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <AddressesDeleteDialog
            key={`address-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
