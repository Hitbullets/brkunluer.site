import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { ContactForm } from '@/components/forms/contact-form'
import { SiteConfig } from '@/lib/site'

export const metadata: Metadata = { alternates: { canonical: '/iletisim' }, title: 'İletişim', description: 'AI ürün geliştirme, iş akışı otomasyonu ve teknik ürün projeleri için Burak Ünlüler ile iletişime geçin.' }

const links: Array<[string, string, string]> = [
  ['E-posta', SiteConfig.author.email, `mailto:${SiteConfig.author.email}`],
  ['GitHub', 'Hitbullets', SiteConfig.social.github],
  ['X', '@brkunluer', SiteConfig.social.twitter],
  ['Instagram', '@brkunluer', SiteConfig.social.instagram],
]

export default function ContactPage() {
  return (
    <>
      <section className='border-b border-border'><Container className='py-20 sm:py-28'><p className='editorial-kicker'>05 / İletişim</p><div className='mt-7 grid gap-8 lg:grid-cols-12'><h1 className='text-display-lg lg:col-span-8'>Doğru problemle başlayan işler için.</h1><p className='self-end text-body-lg text-muted-foreground lg:col-span-4'>Ürün fikrinizi, çözmeye çalıştığınız problemi ve mevcut durumunuzu paylaşın. İlk temas için kısa bir bağlam yeterli.</p></div></Container></section>
      <Container className='py-16 sm:py-24'><div className='grid gap-12 lg:grid-cols-12'><aside className='lg:col-span-4'><p className='editorial-index'>DOĞRUDAN BAĞLANTILAR</p><div className='mt-6 border-t border-border'>{links.map(([label, value, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className='grid grid-cols-[90px_1fr] border-b border-border py-5 text-sm'><span className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>{label}</span><span>{value}</span></a>)}</div><div className='mt-10 border-t border-border pt-6'><p className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>Konum</p><p className='mt-3'>Eskişehir / Türkiye</p></div></aside><div className='border border-border bg-card p-6 sm:p-9 lg:col-span-7 lg:col-start-6'><ContactForm /></div></div></Container>
    </>
  )
}
