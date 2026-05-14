import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Address } from '../data/schema'

type AddressesDialogType = 'add' | 'edit' | 'delete'

type AddressesContextType = {
  open: AddressesDialogType | null
  setOpen: (str: AddressesDialogType | null) => void
  currentRow: Address | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Address | null>>
}

const AddressesContext = React.createContext<AddressesContextType | null>(null)

export function AddressesProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<AddressesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Address | null>(null)

  return (
    <AddressesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </AddressesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAddressesContext = () => {
  const ctx = React.useContext(AddressesContext)
  if (!ctx) throw new Error('useAddressesContext must be used within <AddressesProvider>')
  return ctx
}
