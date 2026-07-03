import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/auth-store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useProfile } from '@/features/users/hooks/useProfile'
import { useUpdateProfile } from '@/features/users/hooks/useUpdateProfile'

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must not be longer than 50 characters.'),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { auth } = useAuthStore()
  const { data: profile, isLoading } = useProfile({ enabled: true })
  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { fullName: '' },
  })

  useEffect(() => {
    const name = profile?.name ?? auth.user?.name ?? ''
    if (name) form.reset({ fullName: name })
  }, [profile, auth.user, form])

  function onSubmit(data: ProfileFormValues) {
    updateProfile({ fullName: data.fullName })
  }

  const roles = profile?.roles ?? auth.user?.role ?? []
  const canUpdate = !!auth.user?.id

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                {isLoading ? (
                  <Skeleton className='h-9 w-full' />
                ) : (
                  <Input placeholder='Your full name' {...field} />
                )}
              </FormControl>
              <FormDescription>
                This is your display name visible across the platform.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Email</FormLabel>
          {isLoading ? (
            <Skeleton className='h-9 w-full' />
          ) : (
            <Input
              value={profile?.email ?? auth.user?.email ?? ''}
              readOnly
              className='bg-muted'
            />
          )}
          <FormDescription>Email cannot be changed from this page.</FormDescription>
        </FormItem>

        <FormItem>
          <FormLabel>User Code</FormLabel>
          {isLoading ? (
            <Skeleton className='h-9 w-full' />
          ) : (
            <Input
              value={auth.user?.userCode ?? ''}
              readOnly
              className='bg-muted font-mono'
            />
          )}
          <FormDescription>Your unique identifier in the system.</FormDescription>
        </FormItem>

        {roles.length > 0 && (
          <FormItem>
            <FormLabel>Roles</FormLabel>
            <div className='flex flex-wrap gap-2 pt-1'>
              {roles.map((role) => (
                <Badge key={role} variant='secondary'>
                  {role}
                </Badge>
              ))}
            </div>
            <FormDescription>Roles are managed by administrators.</FormDescription>
          </FormItem>
        )}

        <Button
          type='submit'
          disabled={
            isLoading || isPending || !form.formState.isDirty || !canUpdate
          }
        >
          {isPending ? 'Saving…' : 'Update profile'}
        </Button>
      </form>
    </Form>
  )
}
