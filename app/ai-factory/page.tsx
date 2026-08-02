import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { ModuleCover } from '@/components/ui/editorial-graphics'
import { getAllMethods } from '@/lib/content'

export const metadata: Metadata = { alternates: { canonical: '/ai-factory' }, title: 'AI Factory', description: 'Ajan mühendisliği, prompt sistemleri, değerlendirme ve iş akışı otomasyonunu birleştiren AI ürün geliştirme sistemi.' }

const modules: Array<['agent' | 'prompt' | 'evaluation' | 'workflow', string, string]> = [
  ['agent' as const, 'Ajan Mühendisliği', 'Araç kullanımı, bellek, görev ayrıştırma ve kontrollü orkestrasyon.'],
  ['prompt' as const, 'Prompt Sistemleri', 'Bağlam, şablon, değişken ve yinelemeyi birlikte yöneten üretim katmanı.'],
  ['evaluation' as const, 'Evaluation Modülleri', 'Çıktıları izleme, ölçme, karşılaştırma ve kabul ölçütleriyle doğrulama.'],
  ['workflow' as const, 'İş Akışı Tasarımı', 'Girdiden çıktıya tüm adımları okunabilir ve tekrarlanabilir hale getirme.'],
]

export default async function AIFactoryPage() {
  const methods = await getAllMethods()
  return (
    <>
      <section className='editorial-dark border-b border-white/15'>
        <Container className='grid gap-10 py-20 lg:grid-cols-12 lg:py-28'>
          <div className='lg:col-span-5'><p className='editorial-kicker !text-white/55'>02 / AI Factory</p><h1 className='mt-7 text-display-lg'>AI üretimini bir sisteme dönüştürür.</h1><p className='mt-7 max-w-xl text-body-lg text-white/60'>Ajanlar, promptlar, değerlendirme ve otomasyon adımları aynı ürün mantığında birleşir. Amaç daha fazla araç değil; daha okunabilir ve tekrar edilebilir üretimdir.</p><div className='mt-10 flex flex-wrap gap-3'><Button asChild className='border-[#d66a4c] bg-[#d66a4c] text-[#171613] hover:bg-[#e07a5d]'><Link href='/metotlar'>Sistem kitaplığı <ArrowRight /></Link></Button><Button asChild variant='outline' className='border-white/25 text-white hover:bg-white/10'><Link href='/iletisim'>Projeni anlat</Link></Button></div></div>
          <div className='relative min-h-[420px] overflow-hidden border border-white/20 lg:col-span-7'><Image src='/images/projects/ai-factory-cover.png' alt='AI Factory sistem kapağı' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 58vw' priority /></div>
        </Container>
      </section>

      <section className='border-b border-border'><Container className='py-20 sm:py-28'><div className='grid gap-10 lg:grid-cols-12'><div className='lg:col-span-4'><p className='editorial-kicker'>Sistem anatomisi</p><h2 className='mt-5 text-heading-xl'>Her başlığın görünür bir modülü var.</h2><p className='mt-5 leading-7 text-muted-foreground'>Temsili kapaklar, soyut “AI” estetiği yerine modülün gerçek işlevini gösteren diyagram dilini kullanır.</p></div><div className='grid gap-8 sm:grid-cols-2 lg:col-span-8'>{modules.map(([variant, title, description]) => <article key={variant}><ModuleCover variant={variant} /><h3 className='mt-5 text-xl font-medium'>{title}</h3><p className='mt-2 text-sm leading-6 text-muted-foreground'>{description}</p></article>)}</div></div></Container></section>

      <section className='bg-card'><Container className='py-20 sm:py-28'><div className='grid gap-10 lg:grid-cols-12'><div className='lg:col-span-4'><p className='editorial-kicker'>Sistem Kitaplığı</p><h2 className='mt-5 text-heading-lg'>Uygulanabilir parçalar</h2></div><div className='border-t border-border lg:col-span-8'>{methods.map((method, index) => <Link key={method.slug} href={`/metotlar/${method.slug}`} className='group grid gap-4 border-b border-border py-7 sm:grid-cols-[64px_1fr_auto] sm:items-center'><span className='editorial-index'>{String(index + 1).padStart(2, '0')}</span><div><h3 className='text-xl font-medium group-hover:text-accent'>{method.title}</h3><p className='mt-2 text-sm text-muted-foreground'>{method.tagline}</p></div><ArrowRight className='hidden h-4 w-4 sm:block' /></Link>)}</div></div></Container></section>
    </>
  )
}
