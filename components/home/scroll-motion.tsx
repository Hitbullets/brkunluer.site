'use client'

import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'

type ScrollProps = {
  children: ReactNode
  className?: string
}

export function ScrollScene({ children, className = '' }: ScrollProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0
    const update = () => {
      frame = 0
      const bounds = node.getBoundingClientRect()
      const travel = Math.max(node.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(1, Math.max(0, -bounds.top / travel))
      node.dataset.progress = String(progress.toFixed(3))
      node.style.setProperty('--scene-rotate-x', (9 - progress * 18) + 'deg')
      node.style.setProperty('--scene-rotate-y', (-12 + progress * 24) + 'deg')
      node.style.setProperty('--scene-rotate-z', (-3 + progress * 6) + 'deg')
      node.style.setProperty('--scene-lift', (progress * -26) + 'px')
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <section ref={ref} className={className}>{children}</section>
}

export function ScrollProcess({ children, className = '', stepCount }: ScrollProps & { stepCount: number }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0
    const update = () => {
      frame = 0
      const bounds = node.getBoundingClientRect()
      const travel = Math.max(node.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(1, Math.max(0, -bounds.top / travel))
      const step = Math.min(stepCount - 1, Math.floor(progress * stepCount))
      node.dataset.step = String(step)
      node.style.setProperty('--process-scale', String(progress))
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [stepCount])

  return <section ref={ref} className={className} data-step='0'>{children}</section>
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      node.dataset.visible = 'true'
      return
    }

    node.dataset.ready = 'true'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.dataset.visible = 'true'
          observer.unobserve(node)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style = delay ? ({ transitionDelay: delay + 'ms' } as CSSProperties) : undefined
  return <div ref={ref} className={'motion-reveal ' + className} style={style}>{children}</div>
}

export function TiltCard({ children, className = '' }: ScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node || event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = node.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    node.style.setProperty('--tilt-x', ((0.5 - y) * 7).toFixed(2) + 'deg')
    node.style.setProperty('--tilt-y', ((x - 0.5) * 9).toFixed(2) + 'deg')
  }

  const handlePointerLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--tilt-x', '0deg')
    node.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div ref={ref} className={'motion-tilt ' + className} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {children}
    </div>
  )
}
