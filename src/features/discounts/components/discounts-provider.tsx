import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Discount } from '../data/schema'

type DiscountsDialogType = 'add' | 'edit' | 'delete'

type DiscountsContextType = {
  open: DiscountsDialogType | null
  setOpen: (str: DiscountsDialogType | null) => void
  currentRow: Discount | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Discount | null>>
}

const DiscountsContext = React.createContext<DiscountsContextType | null>(null)

export function DiscountsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<DiscountsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Discount | null>(null)

  return (
    <DiscountsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </DiscountsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDiscountsContext = () => {
  const ctx = React.useContext(DiscountsContext)
  if (!ctx) throw new Error('useDiscountsContext must be used within <DiscountsProvider>')
  return ctx
}
