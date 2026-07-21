import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  src?: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  aspectRatio?: string
}

export function ImageWrapper({ 
  src, 
  alt, 
  width = 1200, 
  height = 630, 
  fill = false, 
  className, 
  sizes, 
  priority = false,
  aspectRatio = '16/9',
}: Props) {
  // If no src or src is a placeholder path, show gradient placeholder
  if (!src || src.startsWith('/images/')) {
    return (
      <div 
        className={cn(
          'relative overflow-hidden rounded-xl border border-border/60 placeholder-gradient',
          fill ? 'w-full h-full' : 'w-full',
          className,
        )}
        style={!fill ? { aspectRatio } : undefined}
        aria-label={alt}
        role='img'
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center px-6'>
            <div className='w-12 h-12 mx-auto rounded-full bg-brand-500/10 flex items-center justify-center mb-3'>
              <svg className='w-5 h-5 text-brand-400/50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z' />
              </svg>
            </div>
            <p className='text-xs text-muted-foreground/50 font-medium'>{alt || 'Gorsel yukleniyor'}</p>
          </div>
        </div>
      </div>
    )
  }

  // Check if it's an external URL or internal path
  const isExternal = src.startsWith('http')
  
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn('object-cover', className)}
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        priority={priority}
      />
    )
  }

  if (isExternal) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('w-full h-auto', className)}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('w-full h-auto', className)}
      sizes={sizes}
      priority={priority}
    />
  )
}