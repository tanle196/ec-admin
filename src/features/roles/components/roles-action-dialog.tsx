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
import { Textarea } from '@/components/ui/textarea'
import { type Role } from '../data/schema'
import { useCreateRole, useUpdateRole } from '../hooks'

const formSchema = z.object({
  name: z.string().min(1, 'Role name is required.'),
  description: z.string().optional(),
})

type RoleForm = z.infer<typeof formSchema>

type RolesActionDialogProps = {
  currentRow?: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RolesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: RolesActionDialogProps) {
  const isEdit = !!currentRow
  const { mutate: createRole, isPending: isCreating } = useCreateRole()
  const { mutate: updateRole, isPending: isUpdating } = useUpdateRole()
  const isPending = isCreating || isUpdating

  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name ?? '',
      description: currentRow?.description ?? '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: currentRow?.name ?? '',
        description: currentRow?.description ?? '',
      })
    }
  }, [open, currentRow, form])

  const onSubmit = (values: RoleForm) => {
    if (isEdit) {
      updateRole(
        { id: currentRow.id, body: values },
        {
          onSuccess: () => {
            toast.success('Role updated successfully.')
            onOpenChange(false)
          },
          onError: () => toast.error('Failed to update role.'),
        }
      )
    } else {
      createRole(values, {
        onSuccess: () => {
          toast.success('Role created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create role.'),
      })
    }
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
          <DialogTitle>{isEdit ? 'Edit Role' : 'Add New Role'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the role details.' : 'Create a new role.'} Click
            save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='role-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., manager' {...field} />
                  </FormControl>
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
                    <Textarea
                      placeholder='Describe the role...'
                      className='resize-none'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='role-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
