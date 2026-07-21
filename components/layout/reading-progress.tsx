'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='fixed top-16 left-0 right-0 z-40 h-1 bg-border' role='progressbar' aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label='Reading progress'>
      <div
        className='h-full bg-brand-600 dark:bg-brand-400 transition-all duration-150 ease-out'
        style={{ width: progress + '%' }}
      />
    </div>
  )
}
