import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { EditorialMark } from '@/components/ui/editorial-graphics'
import { SiteConfig } from '@/lib/site'

export const metadata: Metadata = { alternates: { canonical: '/hakkinda' }, title: 'Burak Ünlüler Hakkında', description: SiteConfig.author.bio }

const expertise: Array<[string, string]> = [
  ['AI ürün geliştirme', 'Fikir, model davranışı, arayüz ve doğrulama katmanlarını tek ürün döngüsünde birleştirme.'],
  ['Ajan mühendisliği', 'Araç kullanan, görev ayrıştıran ve sonuçları izlenebilir ajan sistemleri tasarlama.'],
  ['Prompt sistemleri', 'Bağlamı, değerlendirmeyi ve yinelemeyi içeren sürdürülebilir prompt mimarileri.'],
  ['İş akışı otomasyonu', 'Dağınık üretim adımlarını okunabilir ve tekrarlanabilir operasyonlara dönüştürme.'],
  ['Modern web uygulamaları', 'Hızlı, erişilebilir ve üretime taşınabilir dijital ürünler geliştirme.'],
  ['Ürün deneyimi', 'Teknik kapasiteyi kullanıcı için sade, anlaşılır ve kontrollü bir deneyime çevirme.'],
]

export default function AboutPage() {
  return (
    <>
      <section className='relative overflow-hidden border-b border-border'>
        <Container className='relative grid gap-10 py-20 lg:grid-cols-12 lg:py-28'>
          <EditorialMark className='absolute -right-16 top-5 w-64 text-foreground/10' />
          <div className='relative lg:col-span-8'><p className='editorial-kicker'>04 / Hakkımda</p><h1 className='mt-7 text-display-lg'>Koddan önce problemi, araçtan önce sistemi düşünürüm.</h1></div>
          <p className='relative self-end text-body-lg text-muted-foreground lg:col-span-4'>Bağımsız ürün geliştirme pratiğimi AI sistemleri, otomasyon ve ürün deneyimi kesişiminde sürdürüyorum.</p>
        </Container>
      </section>

      <Container className='py-16 sm:py-24'>
        <div className='grid gap-8 lg:grid-cols-12'>
          <div className='relative min-h-[620px] overflow-hidden border border-border lg:col-span-5'><Image src='/images/portraits/burak-portrait-wide.jpeg' alt='Burak Ünlüler, dış mekânda portre' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 42vw' priority /></div>
          <div className='flex flex-col justify-between lg:col-span-7 lg:pl-10'>
            <div className='space-y-6 text-body-lg text-muted-foreground'><p>Tek bir unvanla kendimi tanımlamayı tercih etmiyorum. Yazılım geliştirmek kadar fikirleri sorgulamak, problemi doğru çerçevelemek ve insanların gerçekten kullanmak isteyeceği ürünler oluşturmakla ilgileniyorum.</p><p>Yapay zekâ, otomasyon ve modern web teknolojilerini; hızlı prototip üretmenin ötesinde, ölçülebilir ve tekrar kullanılabilir sistemler kurmak için kullanıyorum.</p><p>Çalışma yaklaşımım net: önce bağlamı görünür kılmak, ardından en küçük doğru sistemi kurmak ve gerçek kullanımdan gelen verilerle geliştirmek.</p></div>
            <div className='mt-12 grid grid-cols-2 border-y border-border font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:grid-cols-4'><span className='py-4'>Eskişehir / TR</span><span className='py-4'>AI + Ürün</span><span className='py-4'>Sistem tasarımı</span><span className='py-4'>Bağımsız</span></div>
          </div>
        </div>
      </Container>

      <section className='border-y border-border bg-card'><Container className='py-16 sm:py-24'><div className='grid gap-10 lg:grid-cols-12'><div className='lg:col-span-4'><p className='editorial-kicker'>Zaman çizgisi</p><h2 className='mt-5 text-heading-lg'>Üretim pratiğinin gelişimi</h2></div><div className='lg:col-span-8'><div className='grid grid-cols-[110px_1fr] border-t border-border py-7'><p className='font-mono text-xs text-accent'>2015–2021</p><div><h3 className='text-xl font-medium'>Oyun sunucuları ve paket geliştirmeleri</h3><p className='mt-3 leading-7 text-muted-foreground'>Oyun sunucuları için paket geliştirmeleri, sistem kurulumları ve bootstack geçişleriyle başlayan uygulamalı üretim dönemi.</p></div></div><div className='grid grid-cols-[110px_1fr] border-y border-border py-7'><p className='font-mono text-xs text-accent'>2022</p><div><h3 className='text-xl font-medium'>İlk profesyonel proje</h3><p className='mt-3 leading-7 text-muted-foreground'>Profesyonel ürün geliştirme sürecinin başladığı; teknik üretimin müşteri, kapsam ve teslim sorumluluğuyla birleştiği eşik.</p></div></div><div className='grid grid-cols-[110px_1fr] border-b border-border py-7'><p className='font-mono text-xs text-accent'>BUGÜN</p><div><h3 className='text-xl font-medium'>AI Factory ve ürün sistemleri</h3><p className='mt-3 leading-7 text-muted-foreground'>Ajan mühendisliği, prompt sistemleri, otomasyon ve modern web ürünlerini ortak bir geliştirme yaklaşımında birleştirme.</p></div></div></div></div></Container></section>

      <Container className='py-16 sm:py-24'><div className='grid gap-10 lg:grid-cols-12'><div className='lg:col-span-4'><p className='editorial-kicker'>Uzmanlık dizini</p><h2 className='mt-5 text-heading-lg'>Birbirini tamamlayan altı alan</h2></div><div className='grid border-t border-border sm:grid-cols-2 lg:col-span-8'>{expertise.map(([title, desc], index) => <div key={title} className='border-b border-border p-6 sm:odd:border-r'><p className='editorial-index'>{String(index + 1).padStart(2, '0')}</p><h3 className='mt-6 text-xl font-medium'>{title}</h3><p className='mt-3 text-sm leading-6 text-muted-foreground'>{desc}</p></div>)}</div></div><div className='mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center'><p className='max-w-2xl text-2xl font-medium'>Bir ürün, sistem ya da iş akışı üzerine konuşmak için doğrudan ulaşabilirsiniz.</p><Button asChild><Link href='/iletisim'>İletişime geç</Link></Button></div></Container>
    </>
  )
}
