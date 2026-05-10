import { Link } from '@tanstack/react-router'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'

interface VerifyEmailProps {
  verified: boolean
}

export function VerifyEmail({ verified }: VerifyEmailProps) {
  return (
    <AuthLayout>
      <Card className='max-w-md gap-4'>
        <CardHeader>
          <CardTitle className='text-base tracking-tight'>
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-4 py-4'>
          {verified ? (
            <>
              <CheckCircle2 className='h-12 w-12 text-green-500' />
              <p className='text-center text-sm text-muted-foreground'>
                Your account has been successfully verified!
              </p>
              <Button asChild className='mt-2 w-full'>
                <Link to='/sign-in'>Sign in</Link>
              </Button>
            </>
          ) : (
            <>
              <XCircle className='h-12 w-12 text-destructive' />
              <p className='text-center text-sm text-muted-foreground'>
                Verification failed. The link may be invalid or expired.
              </p>
            </>
          )}
        </CardContent>
        {!verified && (
          <CardFooter>
            <p className='px-8 text-center text-sm text-muted-foreground'>
              <Link
                to='/sign-up'
                className='underline underline-offset-4 hover:text-primary'
              >
                Register again
              </Link>{' '}
              or{' '}
              <Link
                to='/sign-in'
                className='underline underline-offset-4 hover:text-primary'
              >
                sign in
              </Link>
              .
            </p>
          </CardFooter>
        )}
      </Card>
    </AuthLayout>
  )
}
