import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2, MailCheck } from 'lucide-react'
import { toast } from 'sonner'
import { cn, getErrorMessage } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgotPassword } from '../../hooks/useForgotPassword'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email.' : undefined),
  }),
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [emailSent, setEmailSent] = useState(false)
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const flow = forgotPassword({ body: { email: data.email } })

    toast.promise(flow, {
      loading: 'Sending email...',
      success: `Reset link sent to ${data.email}`,
      error: (err) => getErrorMessage(err, 'Failed to send reset email. Please try again.'),
    })

    try {
      await flow
      setEmailSent(true)
    } catch {
      //noop - toast.promise handles error display
    }
  }

  if (emailSent) {
    return (
      <div className='flex flex-col items-center gap-4 py-4 text-center'>
        <MailCheck className='h-12 w-12 text-primary' />
        <p className='text-sm text-muted-foreground'>
          We've sent a password reset link to your email. Please check your
          inbox and follow the instructions.
        </p>
        <Button
          variant='outline'
          className='mt-2 w-full'
          onClick={() => setEmailSent(false)}
        >
          Send again
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-2', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isPending}>
          Continue
          {isPending ? <Loader2 className='animate-spin' /> : <ArrowRight />}
        </Button>
      </form>
    </Form>
  )
}
