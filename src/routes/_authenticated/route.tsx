import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.auth.accessToken) {
      throw redirect({ to: '/sign-in' })
    }
  },
  component: AuthenticatedLayout,
})
