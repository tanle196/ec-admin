import { Star } from 'lucide-react'

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground/30'
          }
        />
      ))}
      <span className='ml-1 text-xs text-muted-foreground'>{rating}</span>
    </div>
  )
}
