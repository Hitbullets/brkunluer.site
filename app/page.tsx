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
      <section className='studio-hero relative overflow-hidden border-b border-white/10'>
        <div className='studio-grid pointer-events-none absolute inset-0' aria-hidden='true' />
        <Container className='relative grid min-h-[calc(100svh-4.75rem)] items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24'>
          <div className='studio-hero-copy relative z-10 lg:col-span-7'>
            <p className='editorial-kicker studio-kicker'>AI workflow studio / Eskişehir</p>
            <h1 className='studio-title mt-8 max-w-4xl font-display text-[clamp(4.1rem,8vw,7.65rem)] leading-[.82] tracking-[-.055em]'>
              Tekrarlayan işi<br />
              <span className='studio-highlight'>AI akışına</span><br />
              <span className='studio-serif'>çeviriyorum.</span>
            </h1>
            <p className='mt-8 max-w-xl text-body-lg text-white/65'>
              İş akışını netleştiriyor, insan kontrolü olan bir prototipe dönüştürüyor ve ekibinize anlaşılır biçimde devrediyorum.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <Button asChild size='lg' className='studio-button-primary'><Link href='/ai-is-akisi-sprinti'>3 günlük pilotu keşfet <ArrowRight /></Link></Button>
              <Button asChild size='lg' variant='outline' className='studio-button-outline'><Link href='/portfolyo'>Ürün ve proje arşivi <ArrowUpRight /></Link></Button>
            </div>
            <div className='studio-proof-line mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 font-mono text-[9px] uppercase tracking-[0.13em] text-white/55 sm:text-[10px]'>
              <span>Tek süreç</span><span>İnsan onayı</span><span>Kapsamı belli pilot</span>
            </div>
          </div>
          <div className='studio-hero-art relative isolate min-h-[430px] sm:min-h-[520px] lg:col-span-5'>
            <div className='studio-orbit-ring studio-orbit-ring-one' aria-hidden='true' />
            <div className='studio-orbit-ring studio-orbit-ring-two' aria-hidden='true' />
            <div className='studio-photo-frame'>
              <Image src='/images/portraits/burak-portrait-close.jpeg' alt='Burak Ünlüer, AI iş akışları üzerine çalışan ürün geliştirici' fill priority className='object-cover object-[50%_28%]' sizes='(max-width: 1024px) 90vw, 42vw' />
            </div>
            <div className='studio-sticker' aria-hidden='true'><span>BU</span><small>PRODUCT<br />BUILDER</small></div>
            <div className='studio-console'>
              <div className='studio-console-head'><span>AKIŞ HARİTASI / 01</span><span className='studio-console-pulse'>CANLI TASLAK</span></div>
              <div className='studio-console-row'><span>01</span><span>GİRDİ</span><i /></div>
              <div className='studio-console-row'><span>02</span><span>AI İŞLEMİ</span><i /></div>
              <div className='studio-console-row studio-console-row-human'><span>03</span><span>İNSAN ONAYI</span><b>GEREKLİ</b></div>
              <div className='studio-console-row'><span>04</span><span>ÇIKTI</span><i /></div>
            </div>
            <p className='studio-coordinate'>SÜREÇ / SİSTEM / SONUÇ</p>
          </div>
        </Container>
      </section>

      <section className='studio-signal-row border-b border-[#10131a]/15'>
        <Container className='grid gap-6 py-8 sm:grid-cols-3 sm:gap-0 sm:py-9'>
          <div><p>01 / KAPSAM</p><strong>Tek iş akışı</strong></div>
          <div><p>02 / TAKVİM</p><strong>3 iş günü</strong></div>
          <div><p>03 / GÜVEN</p><strong>İnsan kontrolü</strong></div>
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
          <div className='studio-offer-panel border border-border p-6 sm:p-8 lg:col-span-7'>
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
            <Link href={`/portfolyo/${featuredProject.slug}`} className='group studio-project-card grid overflow-hidden border border-border lg:grid-cols-12'>
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

      <section className='studio-manifesto-section border-b border-border'>
        <Container className='grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-center'>
          <div className='studio-about-visual relative min-h-[360px] overflow-hidden lg:col-span-5'>
            <div className='studio-about-grid' aria-hidden='true' />
            <span className='studio-about-initial'>BÜ</span>
            <p className='studio-about-caption'>BURAK ÜNLÜER / PRODUCT BUILDER</p>
            <span className='studio-about-index'>ESKİŞEHİR · 2026</span>
          </div>
          <div className='flex flex-col justify-between lg:col-span-7 lg:pl-10'>
            <div><p className='editorial-kicker'>Kurucu / üretici</p><h2 className='mt-6 text-heading-xl'>Ürün, sistem ve deneyim arasında çalışıyorum.</h2><p className='mt-7 max-w-2xl text-body-lg text-muted-foreground'>Oyun sunucuları için teknik üretimle başlayan pratiğimi; web, SaaS ve AI tabanlı ürün geliştirme yönünde sürdürüyorum. Her işte problemi, kullanıcı adımını ve çalışan sistemi aynı çerçevede ele alıyorum.</p></div>
            <div className='mt-12 border-t border-border pt-6'><Link href='/hakkinda' className='editorial-link text-sm'>Çalışma yaklaşımımı oku <ArrowRight className='ml-1 inline h-4 w-4' /></Link></div>
          </div>
        </Container>
      </section>

      {articles.length > 0 && <section><Container className='py-20 sm:py-28'><div className='mb-10 flex items-end justify-between gap-4 border-b border-border pb-5'><div><p className='editorial-kicker'>Saha notları</p><h2 className='mt-4 text-heading-xl'>Denemeler, kararlar ve rehberler.</h2></div><Link href='/yazilar' className='editorial-link text-sm'>Tüm notlar <ArrowRight className='ml-1 inline h-4 w-4' /></Link></div><div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div></Container></section>}
    </>
  )
}
