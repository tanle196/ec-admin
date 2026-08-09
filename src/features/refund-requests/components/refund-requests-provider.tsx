import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type RefundRequestListItem } from '../data/schema'

type RefundRequestsDialogType = 'view' | 'approve' | 'reject'

type RefundRequestsContextType = {
  open: RefundRequestsDialogType | null
  setOpen: (str: RefundRequestsDialogType | null) => void
  currentRow: RefundRequestListItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<RefundRequestListItem | null>>
}

const RefundRequestsContext = React.createContext<RefundRequestsContextType | null>(null)

export function RefundRequestsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<RefundRequestsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<RefundRequestListItem | null>(null)

  return (
    <RefundRequestsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RefundRequestsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRefundRequestsContext = () => {
  const ctx = React.useContext(RefundRequestsContext)
  if (!ctx) throw new Error('useRefundRequestsContext must be used within <RefundRequestsProvider>')
  return ctx
}
