import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCategoriesContext } from './categories-provider'

export function CategoriesPrimaryButtons() {
  const { setOpen } = useCategoriesContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Category
    </Button>
  )
}
