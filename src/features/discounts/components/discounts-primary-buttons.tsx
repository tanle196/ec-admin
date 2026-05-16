import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDiscountsContext } from './discounts-provider'

export function DiscountsPrimaryButtons() {
  const { setOpen } = useDiscountsContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Discount
    </Button>
  )
}
