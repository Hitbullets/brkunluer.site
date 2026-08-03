'use client'

import Link from 'next/link'
import { useState, useSyncExternalStore } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SiteConfig } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { MobileNavLink, NavLink } from '@/components/ui/nav-link'

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark')
}

export function Header() {
  const { setTheme } = useTheme()
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const themeLabel = isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md'>
      <nav className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8' aria-label='Ana menü'>
        <div className='flex h-16 items-center justify-between'>
          <Link href='/' className='group flex items-center gap-3' aria-label='Burak Ünlüer ana sayfa'>
            <span className='grid h-7 w-7 place-items-center border border-foreground font-mono text-[10px] font-semibold transition-colors group-hover:bg-foreground group-hover:text-background'>BÜ</span>
            <span className='text-sm font-semibold tracking-[-0.02em]'>Burak Ünlüer</span>
          </Link>

          <div className='hidden items-center gap-1 md:flex'>
            {SiteConfig.nav.map((item) => <NavLink key={item.href} href={item.href}>{item.label}</NavLink>)}
            <Button variant='ghost' size='icon-sm' aria-label={themeLabel} onClick={() => setTheme(isDark ? 'light' : 'dark')} className='ml-2'>
              {isDark ? <Sun /> : <Moon />}
            </Button>
          </div>

          <div className='flex items-center gap-1 md:hidden'>
            <Button variant='ghost' size='icon-sm' aria-label={themeLabel} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
              {isDark ? <Sun /> : <Moon />}
            </Button>
            <Button variant='ghost' size='icon-sm' aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className='border-t border-border bg-background md:hidden'>
          <div className='mx-auto max-w-[1240px] space-y-1 px-4 py-4'>
            {SiteConfig.nav.map((item) => (
              <MobileNavLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
