import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddressesContext } from './addresses-provider'

export function AddressesPrimaryButtons() {
  const { setOpen } = useAddressesContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Address
    </Button>
  )
}
