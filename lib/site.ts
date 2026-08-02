export const SiteConfig = {
  name: 'Burak Ünlüler',
  shortName: 'brkunluer',
  title: 'Burak Ünlüler | AI Ürün Geliştirici ve AI Factory Kurucusu',
  description:
    'Burak Ünlüler; AI ürün geliştirme, ajan mühendisliği, prompt sistemleri, iş akışı otomasyonu ve AI Factory üzerine projeler, metotlar ve içerikler üretir.',
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
    name: 'Burak Ünlüler',
    role: 'AI Ürün Geliştirici ve AI Factory Kurucusu',
    bio: 'Tekrarlanabilir AI ürün geliştirme sistemleri kuruyorum. AI Factory ile bireylerin ve ekiplerin yapay zekâ destekli ürünlerini daha hızlı, ölçülebilir ve sürdürülebilir biçimde geliştirmesine yardımcı oluyorum.',
    email: 'mail@brkunluer.site',
  },
  nav: [
    { label: 'AI Factory', href: '/ai-factory' },
    { label: 'Yazılar', href: '/yazilar' },
    { label: 'Portföy', href: '/portfolyo' },
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
