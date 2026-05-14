import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type PaymentListItem } from '../data/schema'

type PaymentsDialogType = 'view' | 'update-status'

type PaymentsContextType = {
  open: PaymentsDialogType | null
  setOpen: (str: PaymentsDialogType | null) => void
  currentRow: PaymentListItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<PaymentListItem | null>>
}

const PaymentsContext = React.createContext<PaymentsContextType | null>(null)

export function PaymentsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<PaymentsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<PaymentListItem | null>(null)

  return (
    <PaymentsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PaymentsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePaymentsContext = () => {
  const ctx = React.useContext(PaymentsContext)
  if (!ctx) throw new Error('usePaymentsContext must be used within <PaymentsProvider>')
  return ctx
}
