import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteConfig } from '@/lib/site'
import { Container } from '@/components/layout/container'
import { NewsletterForm } from '@/components/forms/newsletter-form'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='editorial-dark border-t border-white/15'>
      <Container className='py-16 sm:py-24'>
        <div className='grid gap-12 border-b border-white/20 pb-16 lg:grid-cols-12'>
          <div className='lg:col-span-7'>
            <p className='editorial-kicker !text-white/55'>Yeni sistemler ve saha notları</p>
            <h2 className='mt-6 max-w-3xl text-heading-xl'>Fikirden çalışan ürüne uzanan süreçleri birlikte tasarlayalım.</h2>
            <Link href='/iletisim' className='mt-8 inline-flex items-center gap-2 border-b border-[#d66a4c] pb-1 text-sm text-[#d66a4c]'>
              Projeni anlat <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='lg:col-span-5'>
            <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-white/50'>Yayın notları</p>
            <p className='mt-4 max-w-md text-sm leading-6 text-white/65'>AI ürün geliştirme, ajan sistemleri ve ürün deneyimi üzerine yeni yayınları e-postayla takip edin.</p>
            <NewsletterForm className='mt-6 max-w-md' />
          </div>
        </div>

        <div className='grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <Link href='/' className='text-lg font-semibold'>Burak Ünlüler</Link>
            <p className='mt-3 max-w-xs text-sm leading-6 text-white/55'>{SiteConfig.author.bio}</p>
          </div>
          <FooterGroup title='Dizin' links={[
            ['Portföy', '/portfolyo'], ['AI Factory', '/ai-factory'], ['Sistem Kitaplığı', '/metotlar'], ['Yayınlar', '/yazilar'],
          ]} />
          <FooterGroup title='Bilgi' links={[
            ['Hakkımda', '/hakkinda'], ['İletişim', '/iletisim'], ['Gizlilik', '/gizlilik'], ['Kullanım Koşulları', '/kullanim-kosullari'],
          ]} />
          <div>
            <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-white/45'>Dış bağlantılar</p>
            <div className='mt-4 flex flex-col gap-3 text-sm text-white/70'>
              <a href={SiteConfig.social.github} target='_blank' rel='noopener noreferrer'>GitHub</a>
              <a href={SiteConfig.social.twitter} target='_blank' rel='noopener noreferrer'>X</a>
              <a href={SiteConfig.social.instagram} target='_blank' rel='noopener noreferrer'>Instagram</a>
            </div>
          </div>
        </div>
        <p className='border-t border-white/20 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40'>© {year} Burak Ünlüler / Eskişehir, Türkiye</p>
      </Container>
    </footer>
  )
}

function FooterGroup({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <nav aria-label={title}>
      <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-white/45'>{title}</p>
      <ul className='mt-4 space-y-3 text-sm text-white/70'>
        {links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
      </ul>
    </nav>
  )
}
