export const SiteConfig = {
  name: 'Burak Ünlüer',
  shortName: 'brkunluer',
  title: 'Burak Ünlüer | AI Ürün Geliştirici ve AI Factory Kurucusu',
  description:
    'AI ürün geliştirme, ajan mühendisliği, prompt sistemleri, iş akışı otomasyonu ve AI Factory üzerine projeler, metotlar ve içerikler üretiyorum.',
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
    role: 'AI Ürün Geliştirici ve AI Factory Kurucusu',
    bio: 'Tekrarlanabilir AI ürün geliştirme sistemleri kuruyorum. AI Factory ile bireylerin ve ekiplerin yapay zekâ destekli ürünlerini daha hızlı, ölçülebilir ve sürdürülebilir biçimde geliştirmesine yardımcı oluyorum.',
    email: 'mail@brkunluer.site',
  },
  nav: [
    { label: 'Portföy', href: '/portfolyo' },
    { label: 'AI Factory', href: '/ai-factory' },
    { label: 'Yayınlar', href: '/yazilar' },
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
