import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTagsContext } from './tags-provider'

export function TagsPrimaryButtons() {
  const { setOpen } = useTagsContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Tag
    </Button>
  )
}
