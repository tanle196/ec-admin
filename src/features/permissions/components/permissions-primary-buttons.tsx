import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePermissionsContext } from './permissions-provider'

export function PermissionsPrimaryButtons() {
  const { setOpen } = usePermissionsContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Permission
    </Button>
  )
}
