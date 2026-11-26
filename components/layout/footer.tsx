import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteConfig } from '@/lib/site'
import { Container } from '@/components/layout/container'
import { NewsletterForm } from '@/components/forms/newsletter-form'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='studio-footer border-t border-border'>
      <Container className='py-16 sm:py-24'>
        <div className='studio-footer-top grid gap-12 border-b pb-16 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <p className='editorial-kicker !text-muted-foreground'>AI Factory / yeni iş akışı</p>
            <h2 className='mt-6 max-w-3xl font-display text-[clamp(2.75rem,5vw,5rem)] leading-[.95] tracking-[-.035em]'>
              Tek bir işi seçelim. Çalışan bir sisteme dönüştürelim.
            </h2>
            <Link href='/ai-is-akisi-sprinti' className='factory-cta mt-8 inline-flex items-center gap-3 rounded-sm px-5 py-3 text-sm font-semibold transition-transform hover:translate-x-1'>
              3 günlük sprinti keşfet <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='lg:col-span-5 lg:pt-4'>
            <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>Yayınlar</p>
            <p className='mt-4 max-w-md text-sm leading-6 text-foreground/65'>AI ürün geliştirme, ajan sistemleri ve iş akışı tasarımı üzerine yeni notları e-postayla takip edin.</p>
            <NewsletterForm className='mt-6 max-w-md' />
          </div>
        </div>

        <div className='grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <Link href='/' className='text-lg font-semibold'>Burak Ünlüer</Link>
            <p className='mt-3 max-w-xs text-sm leading-6 text-muted-foreground'>{SiteConfig.author.bio}</p>
          </div>
          <FooterGroup title='Üretim' links={[
            ['Ürünler', '/portfolyo'], ['AI Factory', '/ai-factory'], ['Sistem Kitaplığı', '/metotlar'], ['Yayınlar', '/yazilar'],
          ]} />
          <FooterGroup title='Bilgi' links={[
            ['Hakkımda', '/hakkinda'], ['İletişim', '/iletisim'], ['Gizlilik', '/gizlilik'], ['Kullanım Koşulları', '/kullanim-kosullari'],
          ]} />
          <div>
            <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>Dış bağlantılar</p>
            <div className='mt-4 flex flex-col gap-3 text-sm text-muted-foreground'>
              <a href={SiteConfig.social.github} target='_blank' rel='noopener noreferrer'>GitHub</a>
              <a href={SiteConfig.social.twitter} target='_blank' rel='noopener noreferrer'>X</a>
              <a href={SiteConfig.social.instagram} target='_blank' rel='noopener noreferrer'>Instagram</a>
            </div>
          </div>
        </div>
        <p className='border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40'>© {year} Burak Ünlüer / Eskişehir, Türkiye</p>
      </Container>
    </footer>
  )
}

function FooterGroup({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <nav aria-label={title}>
      <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>{title}</p>
      <ul className='mt-4 space-y-3 text-sm text-muted-foreground'>
        {links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
      </ul>
    </nav>
  )
}
