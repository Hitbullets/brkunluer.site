'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  dark?: boolean
  badge?: string | number
}

export function NavLink({ href, children, className, dark = false, badge }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-1.5 border-b px-3 py-2 text-sm font-medium transition-colors duration-200',
        isActive
          ? dark
            ? 'text-white bg-white/10'
            : 'border-accent text-foreground'
          : dark
            ? 'text-white/50 hover:text-white hover:bg-white/10'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {children}
      {badge && (
        <span className='inline-flex items-center justify-center rounded-full bg-current/10 px-1.5 py-0.5 text-[10px] font-medium'>
          {badge}
        </span>
      )}
    </Link>
  )
}

interface MobileNavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
  badge?: string | number
}

export function MobileNavLink({ href, children, onClick, className, badge }: MobileNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center justify-between rounded-[2px] border-l-2 px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'border-accent bg-secondary text-foreground'
          : 'border-transparent text-foreground/70 hover:bg-secondary hover:text-foreground',
        className,
      )}
    >
      <span className='flex items-center gap-2'>{children}</span>
      {badge && (
        <span className='inline-flex items-center justify-center rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent'>
          {badge}
        </span>
      )}
    </Link>
  )
}
