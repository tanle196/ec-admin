'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { useCreatePermission, usePermissionMeta } from '../hooks'

const ACTION_OPTIONS = [
  { label: 'Create', value: 'create' },
  { label: 'Read', value: 'read' },
  { label: 'Update', value: 'update' },
  { label: 'Delete', value: 'delete' },
  { label: 'Cancel', value: 'cancel' },
  { label: 'Publish', value: 'publish' },
  { label: 'Assign Role', value: 'assign.role' },
] as const

const formSchema = z.object({
  module: z.string().min(1, 'Module is required.'),
  action: z.enum([
    'create',
    'read',
    'update',
    'delete',
    'cancel',
    'publish',
    'assign.role',
  ]),
  description: z.string().optional(),
})

type PermissionForm = z.infer<typeof formSchema>

type PermissionsActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PermissionsActionDialog({
  open,
  onOpenChange,
}: PermissionsActionDialogProps) {
  const { mutate: createPermission, isPending } = useCreatePermission()
  const { data: meta } = usePermissionMeta()

  const moduleOptions = (meta?.modules ?? []).map((m) => ({
    label: m,
    value: m,
  }))

  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      module: '',
      action: 'read',
      description: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({ module: '', action: 'read', description: '' })
    }
  }, [open, form])

  const onSubmit = (values: PermissionForm) => {
    createPermission(values, {
      onSuccess: () => {
        toast.success('Permission created successfully.')
        onOpenChange(false)
      },
      onError: () => toast.error('Failed to create permission.'),
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-start'>
          <DialogTitle>Add New Permission</DialogTitle>
          <DialogDescription>
            Create a new permission by selecting a module and action.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='permission-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='module'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module</FormLabel>
                  {moduleOptions.length > 0 ? (
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a module'
                      items={moduleOptions}
                    />
                  ) : (
                    <FormControl>
                      <Input placeholder='e.g., users' {...field} />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='action'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select an action'
                    items={ACTION_OPTIONS.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Optional description...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='permission-form' disabled={isPending}>
            {isPending ? 'Creating...' : 'Create permission'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
