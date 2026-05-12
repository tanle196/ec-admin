import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProductsContext } from './products-provider'

export function ProductsPrimaryButtons() {
  const { setOpen } = useProductsContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Product
    </Button>
  )
}
