'use client'

import Link from 'next/link'
import { useState, useSyncExternalStore } from 'react'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'
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
    <header className='studio-header sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl'>
      <nav className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8' aria-label='Ana menü'>
        <div className='flex h-[4.75rem] items-center justify-between gap-5'>
          <Link href='/' className='group flex shrink-0 items-center gap-3' aria-label='Burak Ünlüer ana sayfa'>
            <span className='grid h-11 w-11 place-items-center rounded-sm bg-[#B4472D] font-mono text-sm font-bold tracking-tighter text-[#FFFAF3] transition-transform group-hover:rotate-[-6deg]'>BÜ</span>
            <span>
              <span className='block text-sm font-semibold tracking-[-0.02em]'>Burak Ünlüer</span>
              <span className='mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground'>AI Factory / Studio</span>
            </span>
          </Link>

          <div className='hidden items-center gap-1 xl:flex'>
            {SiteConfig.nav.map((item) => <NavLink key={item.href} href={item.href}>{item.label}</NavLink>)}
            <Link href='/ai-is-akisi-sprinti' className='studio-header-cta ml-3 inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-semibold'>
              Sprinti keşfet <ArrowRight className='h-3.5 w-3.5' />
            </Link>
            <Button variant='ghost' size='icon-sm' aria-label={themeLabel} onClick={() => setTheme(isDark ? 'light' : 'dark')} className='ml-1 text-foreground hover:bg-muted'>
              {isDark ? <Sun /> : <Moon />}
            </Button>
          </div>

          <div className='flex items-center gap-1 xl:hidden'>
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
        <div className='border-t border-border bg-background text-foreground xl:hidden'>
          <div className='mx-auto max-w-[1320px] space-y-1 px-4 py-4 sm:px-6 lg:px-8'>
            {SiteConfig.nav.map((item) => (
              <MobileNavLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</MobileNavLink>
            ))}
            <Link href='/ai-is-akisi-sprinti' onClick={() => setMobileOpen(false)} className='studio-header-mobile-cta mt-3 flex items-center justify-between rounded-sm px-4 py-3 text-sm font-semibold'>
              3 günlük AI İş Akışı Sprinti <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
