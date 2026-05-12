import { TagsActionDialog } from './tags-action-dialog'
import { TagsDeleteDialog } from './tags-delete-dialog'
import { useTagsContext } from './tags-provider'

export function TagsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTagsContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <TagsActionDialog
        key='tag-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
      />

      {currentRow && (
        <TagsDeleteDialog
          key={`tag-delete-${currentRow.id}`}
          open={open === 'delete'}
          onOpenChange={closeWithRow}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
