import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBannersContext } from './banners-provider'

export function BannersPrimaryButtons() {
  const { setOpen } = useBannersContext()
  return (
    <Button onClick={() => setOpen('add')}>
      <PlusCircle className='mr-2 h-4 w-4' />
      Add Banner
    </Button>
  )
}
