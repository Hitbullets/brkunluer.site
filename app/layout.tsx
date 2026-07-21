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
  },
  twitter: {
    card: 'summary_large_image',
    title: SiteConfig.title,
    description: SiteConfig.description,
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
            Icerige git
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
