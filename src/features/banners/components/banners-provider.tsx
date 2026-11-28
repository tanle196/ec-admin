import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Banner } from '../data/schema'

type BannersDialogType = 'add' | 'edit' | 'delete'

type BannersContextType = {
  open: BannersDialogType | null
  setOpen: (str: BannersDialogType | null) => void
  currentRow: Banner | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Banner | null>>
}

const BannersContext = React.createContext<BannersContextType | null>(null)

export function BannersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<BannersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Banner | null>(null)

  return (
    <BannersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </BannersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBannersContext = () => {
  const ctx = React.useContext(BannersContext)
  if (!ctx)
    throw new Error('useBannersContext must be used within <BannersProvider>')
  return ctx
}
