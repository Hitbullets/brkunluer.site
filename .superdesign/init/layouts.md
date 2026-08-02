# Ortak Yerlesimler

## metadata

- Kaynak: `app/layout.tsx`
- Aciklama: Kok belge, tema, global baslik ve altbilgi kabugu.

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SiteConfig } from '@/lib/site'
import { PersonJsonLd, WebSiteJsonLd } from '@/components/layout/json-ld'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SiteConfig.url),
  alternates: { canonical: '/' },
  title: {
    default: SiteConfig.title,
    template: '%s \u2014 ' + SiteConfig.name,
  },
  description: SiteConfig.description,
  keywords: [...SiteConfig.keywords],
  authors: [{ name: SiteConfig.name }],
  creator: SiteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SiteConfig.url,
    siteName: SiteConfig.name,
    title: SiteConfig.title,
    description: SiteConfig.description,
    images: [{ url: SiteConfig.ogImage, width: 1672, height: 948, alt: SiteConfig.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SiteConfig.title,
    description: SiteConfig.description,
    images: [SiteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='tr' suppressHydrationWarning>
      <body className={`${geistSans.className} ${geistMono.variable} min-h-dvh flex flex-col antialiased`}>
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <a
            href='#content'
            className='sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md'
          >
            İçeriğe Git
          </a>
          <Header />
          <main id='content' className='flex-1'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

## Header

- Kaynak: `components/layout/header.tsx`
- Aciklama: Yapiskan masaustu ve mobil ana navigasyon.

```tsx
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
```

## Footer

- Kaynak: `components/layout/footer.tsx`
- Aciklama: Bulten, site haritasi ve sosyal baglantilar.

```tsx
import Link from "next/link"
import { SiteConfig } from "@/lib/site"
import { Container } from "@/components/layout/container"
import { NewsletterForm } from "@/components/forms/newsletter-form"
import { Camera } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks: {
    platform: Array<{ label: string; href: string }>
    company: Array<{ label: string; href: string }>
    resources: Array<{ label: string; href: string; external?: boolean }>
  } = {
    platform: [
      { label: "Yazılar", href: "/yazilar" },
      { label: "AI Factory", href: "/ai-factory" },
      { label: "Portföy", href: "/portfolyo" },
      { label: "Metotlar", href: "/metotlar" },
    ],
    company: [
      { label: "Hakkımda", href: "/hakkinda" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Gizlilik Politikası", href: "/gizlilik" },
      { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    ],
    resources: [
      { label: "GitHub", href: SiteConfig.social.github, external: true },
      { label: "Twitter / X", href: SiteConfig.social.twitter, external: true },
      { label: "Instagram", href: SiteConfig.social.instagram, external: true },
    ],
  }

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16 lg:py-24">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl border border-border bg-muted/50 p-8 lg:p-12 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-heading-lg font-semibold tracking-tight">Haftalık AI İş Akışı Rehberleri</h2>
            <p className="mt-3 text-body text-muted-foreground">
              Her pazartesi sabahı pratik AI iş akışları, prompt şablonları ve otomasyon ipuçları e-posta kutunuzda.
            </p>
            <NewsletterForm className="mt-6 max-w-md mx-auto" />
            <p className="mt-3 text-caption text-muted-foreground">
              Gereksiz ileti yok. Yalnızca uygulamaya dönük içerikler. İstediğiniz zaman abonelikten ayrılabilirsiniz.
            </p>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight mb-4">
              <span className="text-brand-600 dark:text-brand-400">br</span>kunluer
            </Link>
            <p className="text-body-sm text-muted-foreground mb-6">
              {SiteConfig.author.bio}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SiteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href={SiteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={SiteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Camera className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <nav aria-label="Platform Bağlantıları">
            <h2 className="font-medium mb-4">Platform</h2>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Kurumsal Bağlantılar">
            <h2 className="font-medium mb-4">Kurumsal</h2>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Kaynak Bağlantıları">
            <h2 className="font-medium mb-4">Kaynaklar</h2>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-body-sm text-muted-foreground">
              &copy; {currentYear} {SiteConfig.name}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
```

## Container, Grid, Stack, Section, Divider

- Kaynak: `components/layout/container.tsx`
- Aciklama: Container, grid, stack ve section yerlesim yardimcilari.

```tsx
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full"
}

export function Container({ className, size = "default", children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-[640px]": size === "narrow",
          "max-w-[1024px]": size === "default",
          "max-w-[1280px]": size === "wide",
          "max-w-full": size === "full",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
}

export function Grid({ className, cols = { sm: 1, md: 2, lg: 3 }, gap = 6, children, ...props }: GridProps) {
  const gridCols =
    typeof cols === "number"
      ? cols
      : `grid-cols-1 ${cols.sm ? `sm:grid-cols-${cols.sm}` : ""} ${cols.md ? `md:grid-cols-${cols.md}` : ""} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ""} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ""}`

  return (
    <div className={cn("grid", gridCols, `gap-${gap}`, className)} {...props}>
      {children}
    </div>
  )
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal"
  space?: number
  wrap?: boolean
}

export function Stack({ className, direction = "vertical", space = 4, wrap = false, children, ...props }: StackProps) {
  const isHorizontal = direction === "horizontal"
  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row" : "flex-col",
        wrap && "flex-wrap",
        isHorizontal ? `gap-x-${space}` : `gap-y-${space}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

export function Section({ className, size = "lg", children, ...props }: SectionProps) {
  const padding = {
    sm: "py-12",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  }[size]

  return (
    <section className={cn(padding, className)} {...props}>
      {children}
    </section>
  )
}

export function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-border", className)} {...props} />
}
```

## Hero, SectionHero

- Kaynak: `components/layout/hero.tsx`
- Aciklama: Genel hero ve bolum hero kaliplari.

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'
import React from 'react'

interface HeroProps {
  badge?: string
  title: string
  subtitle?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  trustSignals?: Array<{ label: string; value: string }>
  backgroundImage?: string
  className?: string
}

export function Hero({
  badge,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  trustSignals,
  backgroundImage,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgroundImage && 'before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-5',
        className,
      )}
      aria-labelledby='hero-title'
    >
      {backgroundImage && (
        <div className='absolute inset-0 -z-10' aria-hidden='true'>
          <Image
            src={backgroundImage}
            alt=''
            fill
            priority
            className='object-cover'
            sizes='100vw'
          />
        </div>
      )}

      <Container className='relative py-20 sm:py-24 lg:py-32'>
        <div className='max-w-4xl mx-auto text-center'>
          {badge && (
            <span className='inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs sm:text-sm font-medium text-secondary-foreground mb-8'>
              {badge}
            </span>
          )}

          <h1 id='hero-title' className='text-display-md sm:text-display-lg font-bold tracking-tight text-foreground'>
            {title.toLocaleUpperCase('tr-TR')}
          </h1>

          {subtitle && (
            <p className='mt-4 sm:mt-6 text-body sm:text-body-lg text-muted-foreground max-w-2xl mx-auto'>
              {subtitle}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className='mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
              {primaryCTA && (
                <Button asChild size='lg' variant='primary' className='w-full sm:w-auto'>
                  <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
                  <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                </Button>
              )}
            </div>
          )}

          {trustSignals && trustSignals.length > 0 && (
            <div className='mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12'>
              {trustSignals.map((signal, index) => (
                <div key={index} className='flex flex-col items-center gap-0.5'>
                  <span className='text-heading-sm sm:text-heading-md font-bold text-foreground'>{signal.value}</span>
                  <span className='text-xs sm:text-sm text-muted-foreground'>{signal.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce' aria-hidden='true'>
          <svg className='h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
          </svg>
        </div>
      </Container>
    </section>
  )
}

interface SectionHeroProps {
  title: string
  subtitle?: string
  badge?: string
  className?: string
}

export function SectionHero({ title, subtitle, badge, className }: SectionHeroProps) {
  return (
    <header className={cn('mb-12', className)}>
      {badge && (
        <span className='inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground mb-4'>
          {badge}
        </span>
      )}
      <h1 className='text-heading-xl font-bold tracking-tight'>{title.toLocaleUpperCase('tr-TR')}</h1>
      {subtitle && <p className='mt-4 text-body-lg text-muted-foreground max-w-2xl'>{subtitle}</p>}
    </header>
  )
}
```

## ThemeProvider

- Kaynak: `components/layout/theme-provider.tsx`
- Aciklama: Acik ve koyu tema saglayicisi.

```tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```