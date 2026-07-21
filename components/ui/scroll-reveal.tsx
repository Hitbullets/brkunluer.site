'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Tier = 'micro' | 'interaction' | 'reveal'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  tier?: Tier
}

const tierStyles: Record<Tier, string> = {
  micro: 'transition-all duration-150 ease-out',
  interaction: 'transition-all duration-300 ease-out',
  reveal: 'transition-all duration-700',
}

export function ScrollReveal({ children, className, delay = 0, tier = 'reveal' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        tierStyles[tier],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        className
      )}
      style={{ transitionDelay: delay + 'ms' }}
    >
      {children}
    </div>
  )
}