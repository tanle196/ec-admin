import { createFileRoute } from '@tanstack/react-router'
import { Discounts } from '@/features/discounts'

export const Route = createFileRoute('/_authenticated/discounts/')({
  component: Discounts,
})
