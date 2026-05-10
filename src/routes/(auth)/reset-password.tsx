import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { ResetPassword } from '@/features/auth/reset-password'

const searchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: searchSchema,
  component: function ResetPasswordRoute() {
    const { token } = Route.useSearch()
    return <ResetPassword token={token} />
  },
})
