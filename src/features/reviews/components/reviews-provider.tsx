import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Review } from '../data/schema'

type ReviewsDialogType = 'approve' | 'delete'

type ReviewsContextType = {
  open: ReviewsDialogType | null
  setOpen: (str: ReviewsDialogType | null) => void
  currentRow: Review | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Review | null>>
}

const ReviewsContext = React.createContext<ReviewsContextType | null>(null)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ReviewsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Review | null>(null)

  return (
    <ReviewsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ReviewsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useReviewsContext = () => {
  const ctx = React.useContext(ReviewsContext)
  if (!ctx) throw new Error('useReviewsContext must be used within <ReviewsProvider>')
  return ctx
}
