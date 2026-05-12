'use client'

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
import { useCreateTag } from '../hooks'

const formSchema = z.object({
  name: z.string().min(1, 'Tag name is required.'),
  slug: z.string().optional(),
})

type TagForm = z.infer<typeof formSchema>

type TagsActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TagsActionDialog({ open, onOpenChange }: TagsActionDialogProps) {
  const { mutate: createTag, isPending } = useCreateTag()

  const form = useForm<TagForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', slug: '' },
  })

  const onSubmit = (values: TagForm) => {
    createTag(
      {
        name: values.name,
        ...(values.slug && { slug: values.slug }),
      },
      {
        onSuccess: () => {
          toast.success('Tag created successfully.')
          onOpenChange(false)
        },
        onError: () => toast.error('Failed to create tag.'),
      }
    )
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
          <DialogTitle>Add New Tag</DialogTitle>
          <DialogDescription>
            Create a new tag. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='tag-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                  <FormLabel className='col-span-2 text-end'>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Electronics'
                      className='col-span-4'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                  <FormLabel className='col-span-2 text-end'>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='electronics (auto-generated)'
                      className='col-span-4 font-mono text-sm'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='tag-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
