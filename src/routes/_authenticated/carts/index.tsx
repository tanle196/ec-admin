import { createFileRoute } from '@tanstack/react-router'
import { Cart } from '@/features/cart'

export const Route = createFileRoute('/_authenticated/carts/')({
  component: Cart,
})
