export const SiteConfig = {
  name: 'Burak Ünlüler',
  shortName: 'brkunluer',
  title: 'AI Factory — Burak Ünlüler • AI Product Developer',
  description:
    'AI Factory: Tekrarlanabilir AI ürün geliştirme sistemi. Agent engineering, prompt systems ve AI workflow tasarımı ile ürünlerini hızla üretime taşı.',
  url: 'https://brkunluer.site',
  ogImage: '/og/default.png',
  keywords: [
    'AI Factory',
    'AI product builder',
    'agent engineering',
    'prompt systems',
    'AI workflow',
    'yapay zeka',
    'dijital ürün',
    'otomasyon',
    'prompt engineering',
    'workflow design',
  ],
  author: {
    name: 'Burak Ünlüler',
    role: 'AI Product Developer • AI Factory Kurucusu • Agent Engineering',
    bio: 'Tekrarlanabilir AI ürün geliştirme sistemleri kuruyorum. AI Factory ile bireylerin ve ekiplerin AI destekli ürünlerini hızla üretime taşımasını sağlıyorum.',
    email: 'merhaba@brkunluer.site',
  },
  nav: [
    { label: 'AI Factory', href: '/ai-factory' },
    { label: 'Yazılar', href: '/yazilar' },
    { label: 'Portföy', href: '/portfolyo' },
    { label: 'Hakkımda', href: '/hakkinda' },
    { label: 'İletişim', href: '/iletisim' },
  ],
  social: {
    github: 'https://github.com/brkunluer',
    twitter: 'https://twitter.com/brkunluer',
    linkedin: 'https://linkedin.com/in/brkunluer',
  },
} as const

export type SiteConfigType = typeof SiteConfig