import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type CartItem } from '../data/schema'

type CartDialogType = 'update-qty' | 'add-item'

type CartContextType = {
  open: CartDialogType | null
  setOpen: (str: CartDialogType | null) => void
  currentRow: CartItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<CartItem | null>>
}

const CartContext = React.createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<CartDialogType>(null)
  const [currentRow, setCurrentRow] = useState<CartItem | null>(null)

  return (
    <CartContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CartContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within <CartProvider>')
  return ctx
}
