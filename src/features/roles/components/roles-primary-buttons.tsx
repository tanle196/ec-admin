import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRolesContext } from './roles-provider'

export function RolesPrimaryButtons() {
  const { setOpen } = useRolesContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Role
    </Button>
  )
}
