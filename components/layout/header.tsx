'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useSyncExternalStore } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { SiteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { NavLink, MobileNavLink } from '@/components/ui/nav-link'

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark')
}

function getServerThemeSnapshot() {
  return false
}

export function Header() {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const themeLabel = isDark ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'
  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 backdrop-blur-md transition-all duration-300',
        scrolled || !isHome
          ? 'bg-background/90 border-b border-border/50 shadow-sm'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className='max-w-5xl mx-auto' aria-label='Ana Menü'>
        <div className='flex h-14 items-center justify-between px-4 sm:px-6'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-2.5 group'
          >
            <span aria-hidden='true' className='h-7 w-7 rounded-lg bg-brand-700 flex items-center justify-center text-white text-xs font-bold group-hover:bg-brand-800 dark:bg-brand-500 dark:text-brand-950 dark:group-hover:bg-brand-400 transition-colors'>
              b
            </span>
            <span className={cn(
              'text-sm font-semibold tracking-tight transition-colors',
              scrolled || !isHome ? 'text-foreground' : 'text-white',
            )}>
              Burak Ünlüler
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-1'>
            <div className={cn(
              'flex items-center gap-0.5 rounded-full p-0.5 transition-colors',
              scrolled || !isHome ? 'bg-secondary/50' : 'bg-white/5',
            )}>
              {SiteConfig.nav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  dark={!scrolled && isHome}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <Button
              variant='ghost'
              size='icon-sm'
              aria-label={themeLabel}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={cn(
                'ml-1',
                !scrolled && isHome && 'text-white/60 hover:text-white hover:bg-white/10',
              )}
            >
              <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            </Button>
          </div>

          {/* Mobile */}
          <div className='flex items-center gap-1 md:hidden'>
            <Button
              variant='ghost'
              size='icon-sm'
              aria-label={themeLabel}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={!scrolled && isHome ? 'text-white/60' : ''}
            >
              <Sun className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon-sm'
              aria-label={mobileOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={!scrolled && isHome ? 'text-white/60' : ''}
            >
              {mobileOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className='md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md'>
          <div className='px-4 py-4 space-y-1'>
            {SiteConfig.nav.map((item) => (
              <MobileNavLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </MobileNavLink>
            ))}
            <div className='pt-4 mt-4 border-t border-border/50'>
              <Button
                variant='outline'
                size='sm'
                className='w-full justify-center'
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
              >
                {isDark ? <Sun className='mr-2 h-4 w-4' /> : <Moon className='mr-2 h-4 w-4' />}
                {isDark ? 'Aydınlık Mod' : 'Karanlık Mod'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
