import { RolesActionDialog } from './roles-action-dialog'
import { RolesAssignPermissionsDialog } from './roles-assign-permissions-dialog'
import { RolesDeleteDialog } from './roles-delete-dialog'
import { useRolesContext } from './roles-provider'

export function RolesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRolesContext()

  const closeWithRow = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null)
      setTimeout(() => setCurrentRow(null), 500)
    }
  }

  return (
    <>
      <RolesActionDialog
        key='role-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
      />

      {currentRow && (
        <>
          <RolesActionDialog
            key={`role-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <RolesAssignPermissionsDialog
            key={`role-assign-${currentRow.id}`}
            open={open === 'assign'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />

          <RolesDeleteDialog
            key={`role-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={closeWithRow}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
