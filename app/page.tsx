import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { ModuleCover } from '@/components/ui/editorial-graphics'
import { ArticleCard } from '@/components/cards/article-card'
import { getAllArticles, getAllMethods, getAllProjects } from '@/lib/content'

const expertise: Array<[string, string, string]> = [
  ['01', 'AI ürün geliştirme', 'Ürün problemini, model davranışını ve arayüzü tek bir üretim akışında buluşturma.'],
  ['02', 'Ajan mühendisliği', 'Araçları, görevleri ve insan onayını izlenebilir adımlara bağlama.'],
  ['03', 'Prompt sistemleri', 'Tek seferlik komutları sınanabilir ve tekrar kullanılabilir yapılara dönüştürme.'],
  ['04', 'İş akışı tasarımı', 'Girdiyi, kararı, kontrolü ve çıktıyı birlikte tanımlama.'],
]

const stages = [
  { number: '01', title: 'Süreci gör', text: 'Tekrarlanan işi, girdi ve çıktısıyla birlikte netleştir.' },
  { number: '02', title: 'AI adımını kur', text: 'Sınırlı, denenebilir bir prototip tasarla.' },
  { number: '03', title: 'İnsanla doğrula', text: 'Son kontrolü ekipte tut; çalışan örnekle devret.' },
]

export default async function Home() {
  const [articles, methods, projects] = await Promise.all([getAllArticles(), getAllMethods(), getAllProjects()])
  const featuredProject = projects[0]

  return (
    <>
      <section className='factory-hero relative overflow-hidden border-b border-border'>
        <div className='factory-grid pointer-events-none absolute inset-0 opacity-70' aria-hidden='true' />
        <Container className='relative grid min-h-[calc(100svh-4.75rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-24'>
          <div className='factory-enter relative z-10 lg:col-span-7'>
            <p className='editorial-kicker'>AI workflow studio / Eskişehir</p>
            <h1 className='mt-8 max-w-4xl font-display text-[clamp(3.55rem,7vw,7.1rem)] leading-[.88] tracking-[-.045em]'>
              Tekrarlayan işi<br />
              <span className='italic text-accent'>çalışan AI</span><br />
              akışına çeviriyorum.
            </h1>
            <p className='mt-8 max-w-2xl text-body-lg text-muted-foreground'>
              İş akışını netleştiriyor, insan kontrolü olan bir prototipe dönüştürüyor ve ekibinize anlaşılır biçimde devrediyorum.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <Button asChild size='lg'><Link href='/ai-is-akisi-sprinti'>3 günlük pilotu keşfet <ArrowRight /></Link></Button>
              <Button asChild size='lg' variant='outline'><Link href='/portfolyo'>Ürün ve proje arşivi <ArrowUpRight /></Link></Button>
            </div>
            <p className='mt-5 font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground'>Tek süreç / insan onayı / kapsamı belli pilot</p>
          </div>

          <figure className='factory-panel factory-enter-delay relative z-10 border border-border p-5 sm:p-7 lg:col-span-5'>
            <figcaption className='flex items-center justify-between gap-4 border-b border-border pb-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:text-[10px]'>
              <span>Factory map / 01</span>
              <span className='inline-flex items-center gap-2 text-foreground'><span className='h-2 w-2 rounded-full bg-accent' /> İnsan kontrollü</span>
            </figcaption>
            <div className='mt-2'>
              <div className='factory-step grid grid-cols-[2.5rem_1fr] gap-4 py-5'>
                <span className='factory-step-index'>01</span>
                <div><p className='editorial-index'>GİRDİ</p><p className='mt-1 font-medium'>Talep / brief / mevcut bilgi</p><p className='mt-1 text-sm text-muted-foreground'>İşin bugün nasıl yapıldığını tanımla.</p></div>
              </div>
              <div className='factory-step grid grid-cols-[2.5rem_1fr] gap-4 py-5'>
                <span className='factory-step-index'>02</span>
                <div><p className='editorial-index'>AI ADIMI</p><p className='mt-1 font-medium'>Sınıflandır / taslakla / özetle</p><p className='mt-1 text-sm text-muted-foreground'>Tek bir işi sınırları belli biçimde ele al.</p></div>
              </div>
              <div className='factory-step grid grid-cols-[2.5rem_1fr] gap-4 py-5'>
                <span className='factory-step-index'>03</span>
                <div><p className='editorial-index'>İNSAN KONTROLÜ</p><p className='mt-1 font-medium'>Gözden geçir / düzelt / onayla</p><p className='mt-1 text-sm text-muted-foreground'>Kararı ekipte, akışı görünür tut.</p></div>
              </div>
              <div className='factory-step grid grid-cols-[2.5rem_1fr] gap-4 py-5'>
                <span className='factory-step-index'>04</span>
                <div><p className='editorial-index'>ÇIKTI</p><p className='mt-1 font-medium'>Kullanıma hazır çalışma</p><p className='mt-1 text-sm text-muted-foreground'>Rehber ve sonraki adımlarla devret.</p></div>
              </div>
            </div>
            <p className='border-t border-border pt-4 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground'>Girdi → işlem → doğrulama → çıktı</p>
          </figure>
        </Container>
      </section>

      <section className='editorial-dark border-b border-white/15'>
        <Container className='grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 sm:py-12'>
          <div><p className='font-mono text-[10px] uppercase tracking-[0.15em] text-white/50'>Pilot kapsamı</p><p className='mt-2 text-xl font-medium'>Tek iş akışı</p></div>
          <div className='border-t border-white/20 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0'><p className='font-mono text-[10px] uppercase tracking-[0.15em] text-white/50'>Süre</p><p className='mt-2 text-xl font-medium'>3 iş günü</p></div>
          <div className='border-t border-white/20 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0'><p className='font-mono text-[10px] uppercase tracking-[0.15em] text-white/50'>Başlangıç fiyatı</p><p className='mt-2 text-xl font-medium'>₺9.900</p></div>
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='grid gap-10 py-20 sm:py-28 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <p className='editorial-kicker'>AI İş Akışı Sprinti</p>
            <h2 className='mt-5 text-display-lg'>Küçük bir pilot. Gerçek bir iş adımı.</h2>
            <p className='mt-5 max-w-xl leading-7 text-muted-foreground'>Ücretsiz 20 dakikalık görüşmede uygun bir süreç seçelim. Uygunsa kapsamı, teslimatları ve vergi koşulunu yazılı netleştirelim.</p>
            <Link href='/ai-is-akisi-sprinti' className='editorial-link mt-7 inline-flex items-center gap-2 text-sm font-semibold'>Sprint kapsamını incele <ArrowRight className='h-4 w-4' /></Link>
          </div>
          <div className='factory-panel border border-border p-6 sm:p-8 lg:col-span-7'>
            <div className='grid gap-5 sm:grid-cols-3'>
              {stages.map((stage) => (
                <article key={stage.number} className='border-t border-border pt-4'>
                  <span className='factory-step-index'>{stage.number}</span>
                  <h3 className='mt-5 font-semibold'>{stage.title}</h3>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>{stage.text}</p>
                </article>
              ))}
            </div>
            <p className='mt-7 border-t border-border pt-5 text-xs leading-5 text-muted-foreground'>Takvim, yazılı kapsam, gerekli girdiler ve başlangıç ödemesi tamamlanınca başlar. Canlı entegrasyon ve bakım ayrı kapsamdır.</p>
          </div>
        </Container>
      </section>

      {featuredProject && (
        <section className='border-b border-border'>
          <Container className='py-20 sm:py-28'>
            <div className='mb-10 flex items-end justify-between gap-4 border-b border-border pb-5'>
              <div><p className='editorial-kicker'>Sahadan seçki / 01</p><h2 className='mt-4 text-heading-xl'>Fikirden çalışan deneyime.</h2></div>
              <Link href='/portfolyo' className='editorial-link hidden text-sm sm:block'>Tüm üretimler <ArrowUpRight className='ml-1 inline h-4 w-4' /></Link>
            </div>
            <Link href={`/portfolyo/${featuredProject.slug}`} className='group factory-panel grid overflow-hidden border border-border lg:grid-cols-12'>
              <div className='relative min-h-[300px] overflow-hidden lg:col-span-8 lg:min-h-[540px]'>
                <Image src={featuredProject.coverImage} alt={`${featuredProject.title} proje kapak görseli`} fill className='object-cover transition-transform duration-700 group-hover:scale-[1.02]' sizes='(max-width: 1024px) 100vw, 66vw' priority />
              </div>
              <div className='flex flex-col justify-between border-t border-border p-6 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-9'>
                <div><p className='editorial-index'>{featuredProject.year} / {featuredProject.client}</p><h3 className='mt-5 text-heading-lg'>{featuredProject.title}</h3><p className='mt-5 leading-7 text-muted-foreground'>{featuredProject.tagline}</p></div>
                <div className='mt-12'><div className='flex flex-wrap gap-2'>{featuredProject.tags.map((tag) => <span key={tag} className='border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-wider'>{tag}</span>)}</div><p className='mt-8 text-sm font-semibold text-accent'>Vaka analizini aç <ArrowUpRight className='ml-1 inline h-4 w-4' /></p></div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      <section className='editorial-dark border-b border-white/15'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-4'><p className='editorial-kicker !text-white/55'>AI Factory / üretim sistemi</p><h2 className='mt-5 text-heading-xl'>Tek bir araç değil. Birbirine bağlı modüller.</h2><p className='mt-6 max-w-sm leading-7 text-white/65'>Fikir, bağlam, ajan, değerlendirme ve iş akışını tekrar kullanılabilir sistem parçaları olarak ele alıyorum.</p><Button asChild variant='outline' className='mt-8 border-white/30 text-white hover:bg-white/10'><Link href='/ai-factory'>AI Factory yaklaşımı</Link></Button></div>
            <div className='grid gap-4 sm:grid-cols-2 lg:col-span-8'>
              <ModuleCover variant='agent' /><ModuleCover variant='prompt' /><ModuleCover variant='evaluation' /><ModuleCover variant='workflow' />
            </div>
          </div>
          {methods.length > 0 && <div className='mt-12 grid border-t border-white/20 md:grid-cols-3'>{methods.slice(0, 3).map((method, index) => <Link key={method.slug} href={`/metotlar/${method.slug}`} className='border-b border-white/20 py-6 pr-6 md:border-b-0 md:border-r md:pl-6 first:pl-0 last:border-r-0'><span className='font-mono text-[10px] text-white/45'>0{index + 1}</span><h3 className='mt-3 font-medium'>{method.title}</h3><p className='mt-2 text-sm leading-6 text-white/60'>{method.tagline}</p></Link>)}</div>}
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <div className='mb-10 grid gap-5 sm:grid-cols-[6fr_14fr] sm:items-end'><p className='editorial-kicker'>Çalışma yaklaşımı</p><h2 className='max-w-3xl text-heading-xl'>Teknolojiden önce işi ve kontrol noktasını tarif ederim.</h2></div>
          <div className='grid border-y border-border sm:grid-cols-2 lg:grid-cols-4'>
            {expertise.map(([index, title, description]) => <article key={index} className='border-b border-border p-5 sm:odd:border-r lg:border-b-0 lg:border-r last:border-r-0'><p className='editorial-index text-accent'>{index}</p><h3 className='mt-6 text-lg font-semibold'>{title}</h3><p className='mt-3 text-sm leading-6 text-muted-foreground'>{description}</p></article>)}
          </div>
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='grid gap-10 py-20 sm:py-28 lg:grid-cols-12'>
          <div className='relative min-h-[400px] overflow-hidden border border-border sm:min-h-[540px] lg:col-span-5'><Image src='/images/portraits/burak-portrait-close.jpeg' alt='Burak Ünlüer, çalışma ortamında portre' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 42vw' /></div>
          <div className='flex flex-col justify-between lg:col-span-7 lg:pl-10'><div><p className='editorial-kicker'>Kurucu / üretici</p><h2 className='mt-6 text-heading-xl'>Ürün, sistem ve deneyim arasında çalışıyorum.</h2><p className='mt-7 max-w-2xl text-body-lg text-muted-foreground'>Oyun sunucuları için teknik üretimle başlayan pratiğimi; web, SaaS ve AI tabanlı ürün geliştirme yönünde sürdürüyorum. Her işte problemi, kullanıcı adımını ve çalışan sistemi aynı çerçevede ele alıyorum.</p></div><div className='mt-12 border-t border-border pt-6'><Link href='/hakkinda' className='editorial-link text-sm'>Çalışma yaklaşımımı oku <ArrowRight className='ml-1 inline h-4 w-4' /></Link></div></div>
        </Container>
      </section>

      {articles.length > 0 && <section><Container className='py-20 sm:py-28'><div className='mb-10 flex items-end justify-between gap-4 border-b border-border pb-5'><div><p className='editorial-kicker'>Saha notları</p><h2 className='mt-4 text-heading-xl'>Denemeler, kararlar ve rehberler.</h2></div><Link href='/yazilar' className='editorial-link text-sm'>Tüm notlar <ArrowRight className='ml-1 inline h-4 w-4' /></Link></div><div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div></Container></section>}
    </>
  )
}
