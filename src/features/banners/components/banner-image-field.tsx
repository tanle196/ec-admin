import { useEffect, useMemo, useRef } from 'react'
import { ImageIcon, UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type BannerImageFieldProps = {
  label: string
  currentUrl: string | null
  file: File | null
  onFileChange: (file: File | null) => void
  aspectClassName: string
  error?: string
}

export function BannerImageField({
  label,
  currentUrl,
  file,
  onFileChange,
  aspectClassName,
  error,
}: BannerImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  )

  useEffect(() => {
    if (!preview) return
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  const displayed = preview ?? currentUrl

  return (
    <div className='grid grid-cols-6 items-start gap-x-4 gap-y-1'>
      <span className='col-span-2 pt-2 text-end text-sm font-medium'>
        {label}
      </span>
      <div className='col-span-4 space-y-2'>
        {displayed ? (
          <div className='relative w-fit'>
            <img
              src={displayed}
              alt={label}
              className={`${aspectClassName} rounded-md border bg-muted object-cover`}
            />
            {file && (
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute -top-2 -right-2 h-6 w-6 rounded-full'
                onClick={() => {
                  onFileChange(null)
                  if (inputRef.current) inputRef.current.value = ''
                }}
              >
                <X size={12} />
                <span className='sr-only'>Discard selected image</span>
              </Button>
            )}
          </div>
        ) : (
          <div
            className={`${aspectClassName} flex items-center justify-center rounded-md border border-dashed bg-muted text-muted-foreground`}
          >
            <ImageIcon size={24} />
          </div>
        )}
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud size={14} className='mr-1.5' />
          {displayed ? 'Change image' : 'Upload image'}
        </Button>
        {error && (
          <p className='text-sm font-medium text-destructive'>{error}</p>
        )}
      </div>
    </div>
  )
}
