import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row, type Table } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Banner } from '../data/schema'
import { useReorderBanners } from '../hooks'
import { useBannersContext } from './banners-provider'

type DataTableRowActionsProps = {
  row: Row<Banner>
  table: Table<Banner>
}

export function DataTableRowActions({ row, table }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useBannersContext()
  const { mutate: reorder, isPending } = useReorderBanners()

  const rows = table.getRowModel().rows.map((r) => r.original)
  const index = rows.findIndex((b) => b.id === row.original.id)

  // Swap with the neighbour, then renumber the visible list 0..n-1 so that
  // banners sharing the same sortOrder (the default is 0) still move.
  const move = (direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= rows.length) return
    const ordered = [...rows]
    ;[ordered[index], ordered[target]] = [ordered[target], ordered[index]]
    const items = ordered
      .map((b, i) => ({ id: b.id, sortOrder: i, prev: b.sortOrder }))
      .filter((item) => item.sortOrder !== item.prev)
      .map(({ id, sortOrder }) => ({ id, sortOrder }))
    reorder(items, {
      onError: () => toast.error('Failed to reorder banners.'),
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
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('edit')
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending || index <= 0}
          onClick={() => move(-1)}
        >
          Move up
          <DropdownMenuShortcut>
            <ArrowUp size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending || index < 0 || index >= rows.length - 1}
          onClick={() => move(1)}
        >
          Move down
          <DropdownMenuShortcut>
            <ArrowDown size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('delete')
          }}
          className='text-red-500!'
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
