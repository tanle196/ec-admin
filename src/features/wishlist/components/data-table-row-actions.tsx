import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRemoveFromWishlist } from '../hooks'
import { type WishlistItem } from '../data/schema'

type DataTableRowActionsProps = {
  row: Row<WishlistItem>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { mutate: removeProduct, isPending } = useRemoveFromWishlist()

  const handleRemove = () => {
    removeProduct(row.original.product_id, {
      onSuccess: () => toast.success('Product removed from wishlist.'),
      onError: () => toast.error('Failed to remove product.'),
    })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-44'>
        <DropdownMenuItem
          onClick={handleRemove}
          disabled={isPending}
          className='text-destructive focus:text-destructive'
        >
          Remove
          <Trash2 size={16} className='ml-auto' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
