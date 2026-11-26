export const SiteConfig = {
  name: 'Burak Ünlüer',
  shortName: 'brkunluer',
  title: 'Burak Ünlüer | AI Factory ve İş Akışı Stüdyosu',
  description:
    'Tekrarlanan işleri insan kontrollü AI akışlarına ve çalışan dijital ürünlere dönüştürüyorum. AI Factory, ürün geliştirme ve iş akışı tasarımı.',
  url: 'https://brkunluer.site',
  ogImage: '/og/default.png',
  keywords: [
    'AI Factory',
    'AI ürün geliştirme',
    'AI product development',
    'agent engineering',
    'ajan mühendisliği',
    'prompt systems',
    'AI workflow',
    'iş akışı otomasyonu',
    'yapay zekâ',
    'dijital ürün',
    'otomasyon',
    'prompt engineering',
    'workflow design',
  ],
  author: {
    name: 'Burak Ünlüer',
    role: 'AI Ürün Geliştirici / Sistem Kurucu',
    bio: 'İş akışlarını netleştirip insan kontrolüyle çalışan AI prototiplerine ve dijital ürünlere dönüştürüyorum.',
    email: 'mail@brkunluer.site',
  },
  nav: [
    { label: 'Ürünler', href: '/portfolyo' },
    { label: 'AI Factory', href: '/ai-factory' },
    { label: '3 Günlük Sprint', href: '/ai-is-akisi-sprinti' },
    { label: 'Saha Notları', href: '/yazilar' },
    { label: 'Hakkımda', href: '/hakkinda' },
    { label: 'İletişim', href: '/iletisim' },
  ],
  social: {
    github: 'https://github.com/Hitbullets',
    twitter: 'https://x.com/brkunluer',
    instagram: 'https://www.instagram.com/brkunluer',
  },
} as const

export type SiteConfigType = typeof SiteConfig
