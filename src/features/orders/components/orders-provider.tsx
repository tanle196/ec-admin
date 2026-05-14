import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type OrderListItem } from '../data/schema'

type OrdersDialogType = 'view' | 'update-status'

type OrdersContextType = {
  open: OrdersDialogType | null
  setOpen: (str: OrdersDialogType | null) => void
  currentRow: OrderListItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<OrderListItem | null>>
}

const OrdersContext = React.createContext<OrdersContextType | null>(null)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<OrdersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<OrderListItem | null>(null)

  return (
    <OrdersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </OrdersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrdersContext = () => {
  const ctx = React.useContext(OrdersContext)
  if (!ctx) throw new Error('useOrdersContext must be used within <OrdersProvider>')
  return ctx
}
