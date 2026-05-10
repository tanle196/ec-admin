import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { authService } from '@/features/auth/api/authService'
import { AuthLayout } from '@/features/auth/auth-layout'
import { VerifyEmail } from '@/features/auth/verify-email'

const searchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ token: search.token }),
  loader: async ({ deps: { token } }) => {
    try {
      await authService.verifyAccount({ body: { token } })
      return { verified: true }
    } catch {
      return { verified: false }
    }
  },
  pendingMs: 0,
  pendingComponent: () => (
    <AuthLayout>
      <div className='flex flex-col items-center gap-4 py-8'>
        <Loader2 className='h-12 w-12 animate-spin text-primary' />
        <p className='text-sm text-muted-foreground'>Verifying your account...</p>
      </div>
    </AuthLayout>
  ),
  component: function VerifyEmailRoute() {
    const { verified } = Route.useLoaderData()
    return <VerifyEmail verified={verified} />
  },
})
