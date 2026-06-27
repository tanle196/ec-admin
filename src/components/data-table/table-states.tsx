interface TableLoadingProps {
  label: string
}

export function TableLoading({ label }: TableLoadingProps) {
  return (
    <div className='flex h-24 items-center justify-center text-muted-foreground'>
      Loading {label}...
    </div>
  )
}

interface TableErrorProps {
  label: string
  error: unknown
}

export function TableError({ label, error }: TableErrorProps) {
  const msg =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null
        ? JSON.stringify(error)
        : 'Unknown error'

  return (
    <div className='flex h-24 items-center justify-center text-sm text-destructive'>
      Failed to load {label}: {msg}
    </div>
  )
}
