import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Check, Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type RefundRequestListItem } from '../data/schema'
import { useRefundRequestsContext } from './refund-requests-provider'

type DataTableRowActionsProps = {
  row: Row<RefundRequestListItem>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useRefundRequestsContext()
  const refundRequest = row.original
  const isPending = refundRequest.status === 'pending'

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
          onClick={() => {
            setCurrentRow(refundRequest)
            setOpen('view')
          }}
        >
          View Detail
          <DropdownMenuShortcut>
            <Eye size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!isPending}
          onClick={() => {
            setCurrentRow(refundRequest)
            setOpen('approve')
          }}
        >
          Approve
          <DropdownMenuShortcut>
            <Check size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!isPending}
          onClick={() => {
            setCurrentRow(refundRequest)
            setOpen('reject')
          }}
        >
          Reject
          <DropdownMenuShortcut>
            <X size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
