import { BannersActionDialog } from './banners-action-dialog'
import { BannersDeleteDialog } from './banners-delete-dialog'
import { useBannersContext } from './banners-provider'

export function BannersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useBannersContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <BannersActionDialog
        key='banner-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null)
        }}
      />

      {currentRow && (
        <>
          <BannersActionDialog
            key={`banner-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <BannersDeleteDialog
            key={`banner-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
