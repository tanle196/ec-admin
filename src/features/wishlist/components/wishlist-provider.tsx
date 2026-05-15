import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type WishlistItem } from '../data/schema'

type WishlistDialogType = 'add-product'

type WishlistContextType = {
  open: WishlistDialogType | null
  setOpen: (str: WishlistDialogType | null) => void
  currentRow: WishlistItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<WishlistItem | null>>
}

const WishlistContext = React.createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<WishlistDialogType>(null)
  const [currentRow, setCurrentRow] = useState<WishlistItem | null>(null)

  return (
    <WishlistContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </WishlistContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlistContext = () => {
  const ctx = React.useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlistContext must be used within <WishlistProvider>')
  return ctx
}
