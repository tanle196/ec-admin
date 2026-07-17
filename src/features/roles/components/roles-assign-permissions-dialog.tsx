'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { usePermissionsAllRaw } from '@/features/permissions/hooks'
import { type Role } from '../data/schema'
import { useAssignRolePermissions } from '../hooks'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Role
}

const ACTION_LABEL: Record<string, string> = {
  create: 'Create',
  read: 'Read',
  update: 'Update',
  delete: 'Delete',
  cancel: 'Cancel',
  publish: 'Publish',
  'assign.role': 'Assign Role',
}

export function RolesAssignPermissionsDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const { data: permissionsRaw, isLoading } = usePermissionsAllRaw()
  const { mutate: assignPermissions, isPending } = useAssignRolePermissions()

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (open) {
      setSelectedIds(new Set(currentRow.permissions?.map((p) => p.id) ?? []))
    }
  }, [open, currentRow])

  const allPermissions = permissionsRaw ?? []

  const grouped = allPermissions.reduce<Record<string, typeof allPermissions>>(
    (acc, p) => {
      if (!acc[p.module]) acc[p.module] = []
      acc[p.module].push(p)
      return acc
    },
    {}
  )

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleModule = (ids: string[], allChecked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allChecked) {
        ids.forEach((id) => next.delete(id))
      } else {
        ids.forEach((id) => next.add(id))
      }
      return next
    })
  }

  const onSubmit = () => {
    assignPermissions(
      { id: currentRow.id, permissionIds: [...selectedIds] },
      {
        onSuccess: () => {
          toast.success('Permissions assigned successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to assign permissions.'),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-3xl'>
        <DialogHeader className='px-6 pt-6 pb-4'>
          <DialogTitle>Assign Permissions</DialogTitle>
          <DialogDescription>
            Select permissions for role{' '}
            <span className='font-semibold text-foreground'>
              {currentRow.name}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {isLoading ? (
          <div className='flex h-48 items-center justify-center text-muted-foreground'>
            Loading permissions...
          </div>
        ) : (
          <ScrollArea className='flex-1 overflow-y-auto'>
            <div className='grid grid-cols-1 gap-4 p-6 md:grid-cols-2'>
              {Object.entries(grouped).map(([module, permissions]) => {
                const ids = permissions.map((p) => p.id)
                const checkedCount = ids.filter((id) =>
                  selectedIds.has(id)
                ).length
                const allChecked = checkedCount === ids.length
                const someChecked = checkedCount > 0 && !allChecked

                return (
                  <div key={module} className='rounded-lg border bg-card'>
                    {/* Module header */}
                    <div className='flex items-center justify-between rounded-t-lg bg-muted/50 px-4 py-3'>
                      <div className='flex items-center gap-2'>
                        <Checkbox
                          id={`module-${module}`}
                          checked={allChecked}
                          data-state={someChecked ? 'indeterminate' : undefined}
                          onCheckedChange={() => toggleModule(ids, allChecked)}
                          className='mt-px'
                        />
                        <label
                          htmlFor={`module-${module}`}
                          className='cursor-pointer text-sm font-semibold capitalize'
                        >
                          {module}
                        </label>
                      </div>
                      <Badge
                        variant={checkedCount > 0 ? 'default' : 'secondary'}
                        className='text-xs'
                      >
                        {checkedCount}/{ids.length}
                      </Badge>
                    </div>

                    {/* Permissions list */}
                    <div className='divide-y px-4 py-2'>
                      {permissions.map((p) => (
                        <div key={p.id} className='flex items-start gap-3 py-2'>
                          <Checkbox
                            id={p.id}
                            checked={selectedIds.has(p.id)}
                            onCheckedChange={() => toggle(p.id)}
                            className='mt-0.5'
                          />
                          <label
                            htmlFor={p.id}
                            className='flex cursor-pointer flex-col'
                          >
                            <span className='text-sm font-medium'>
                              {ACTION_LABEL[p.action] ?? p.action}
                            </span>
                            {p.description && (
                              <span className='text-xs text-muted-foreground'>
                                {p.description}
                              </span>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}

        <Separator />

        <DialogFooter className='items-center px-6 py-4'>
          <span className='mr-auto text-sm text-muted-foreground'>
            {selectedIds.size} permission{selectedIds.size !== 1 ? 's' : ''}{' '}
            selected
          </span>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending || isLoading}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
