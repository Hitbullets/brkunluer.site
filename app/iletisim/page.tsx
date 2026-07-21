import { Metadata } from 'next'
import { Container } from '@/components/layout/container';
import { SectionHero } from '@/components/layout/hero'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/iletisim' },
  title: 'İletişim',
  description: 'Burak Ünlüler ile iletişime geçin.',
}

const contactInfo = [
  { icon: Mail, title: 'E-posta', value: 'merhaba@brkunluer.site', href: 'mailto:merhaba@brkunluer.site' },
  { icon: MapPin, title: 'Lokasyon', value: 'İstanbul, Türkiye', href: null },
  { icon: Clock, title: 'Cevap Süresi', value: 'Genellikle 24-48 saat içinde', href: null },
  { icon: MessageSquare, title: 'Tercih Edilen', value: 'E-posta (detaylı mesajlar için)', href: null },
]

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette border-y border-white/5"><Container className="py-24 z-10 relative">
      <SectionHero
        badge='İletişim'
        title='Bana Ulaşın'
        subtitle='Proje teklifleri, sorularınız veya işbirlişi fikirleriniz için bu formu doldurun. Her mesajı okurum.'
      />

      <div className='grid lg:grid-cols-5 gap-8 lg:gap-12 mt-12'>
        <div className='lg:col-span-2 space-y-6'>
          <Card variant='feature' className='h-full'>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
              <CardDescription>Size nasıl ulaşabilirim?</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {contactInfo.map((item, index) => (
                <div key={index} className='flex items-start gap-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 shrink-0'>
                    <item.icon className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className='text-brand-600 dark:text-brand-400 hover:underline'>{item.value}</a>
                    ) : (
                      <p className='text-muted-foreground'>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant='feature'>
            <CardHeader>
              <CardTitle>Sık Sorulanlar</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-sm'>
              <div>
                <p className='font-medium'>Ne tür projelerle çalışıyorsun?</p>
                <p className='text-muted-foreground mt-1'>AI workflow tasarımı, prompt engineering, otomasyon sistemleri, MVP geliştirme, teknik danışmanlık.</p>
              </div>
              <div>
                <p className='font-medium'>Ne kadar sürede dönersin?</p>
                <p className='text-muted-foreground mt-1'>Genellikle 24-48 saat içinde ilk yanıtı veriyorum. Detaylı teklifler 3-5 iş günü içinde.</p>
              </div>
              <div>
                <p className='font-medium'>�ocret nasıl belirleniyor?</p>
                <p className='text-muted-foreground mt-1'>Proje kapsamına göre: sabit fiyat (net kapsamlı işler) veya saatlik/daily rate (danışmanlık, keşif aşaması).</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-3'>
          <Card variant='feature' className='h-full'>
            <CardContent className='p-6 lg:p-8'>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Container></section>
  )
}
