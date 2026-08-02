import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { ModuleCover, EditorialMark } from '@/components/ui/editorial-graphics'
import { ArticleCard } from '@/components/cards/article-card'
import { getAllArticles, getAllMethods, getAllProjects } from '@/lib/content'

const expertise: Array<[string, string, string]> = [
  ['01', 'AI ürün geliştirme', 'Problemi, model davranışını ve ürün deneyimini tek üretim sistemi içinde ele alma.'],
  ['02', 'Ajan mühendisliği', 'Araç kullanımı, bellek, görev ayrıştırma ve denetlenebilir ajan akışları.'],
  ['03', 'Prompt sistemleri', 'Tek seferlik komutlar yerine test edilen, izlenen ve geliştirilen prompt mimarileri.'],
  ['04', 'İş akışı otomasyonu', 'Tekrarlanan üretim adımlarını açık girdiler, kararlar ve çıktılarla bağlama.'],
  ['05', 'Modern web uygulamaları', 'Ürün fikrini erişilebilir, hızlı ve sürdürülebilir bir uygulamaya dönüştürme.'],
  ['06', 'Ürün deneyimi', 'Teknik kapasiteyi sade ve anlaşılır bir kullanıcı yolculuğuna çevirme.'],
]

export default async function Home() {
  const [articles, methods, projects] = await Promise.all([getAllArticles(), getAllMethods(), getAllProjects()])
  const featuredProject = projects[0]

  return (
    <>
      <section className='relative overflow-hidden border-b border-border'>
        <Container className='relative grid min-h-[calc(100svh-4rem)] items-end gap-12 py-16 lg:grid-cols-12 lg:py-24'>
          <EditorialMark className='pointer-events-none absolute -right-12 top-12 w-64 text-foreground/10 lg:right-8 lg:w-80' />
          <div className='relative lg:col-span-8'>
            <p className='editorial-kicker'>AI ürün geliştirici / sistem kurucu</p>
            <h1 className='mt-8 max-w-5xl text-display-xl'>Fikri, çalışan bir sisteme dönüştürüyorum.</h1>
            <p className='mt-8 max-w-2xl text-body-lg text-muted-foreground'>Ajan mühendisliği, prompt sistemleri, iş akışı otomasyonu ve modern web teknolojilerini ürün deneyimi etrafında birleştiriyorum.</p>
            <div className='mt-10 flex flex-wrap gap-3'>
              <Button asChild size='lg'><Link href='/portfolyo'>Portföyü incele <ArrowRight /></Link></Button>
              <Button asChild size='lg' variant='outline'><Link href='/ai-factory'>AI Factory</Link></Button>
            </div>
          </div>
          <div className='relative border-t border-border pt-6 lg:col-span-4'>
            <p className='editorial-index'>AKTİF ODAK / 2026</p>
            <p className='mt-4 text-2xl font-medium leading-tight'>AI destekli ürünler, tekrarlanabilir üretim sistemleri ve açık teknik kararlar.</p>
            <div className='mt-10 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <span>Eskişehir / TR</span><span>Bağımsız üretim</span><span>Ürün + Sistem</span><span>Türkçe yayın</span>
            </div>
          </div>
        </Container>
      </section>

      {featuredProject && (
        <section className='border-b border-border'>
          <Container className='py-20 sm:py-28'>
            <div className='mb-10 flex items-end justify-between border-b border-border pb-5'>
              <div><p className='editorial-kicker'>01 / Portföy</p><h2 className='mt-4 text-heading-xl'>Seçili proje</h2></div>
              <Link href='/portfolyo' className='editorial-link hidden text-sm sm:block'>Tüm portföy <ArrowUpRight className='ml-1 inline h-4 w-4' /></Link>
            </div>
            <Link href={`/portfolyo/${featuredProject.slug}`} className='group grid border border-border bg-card lg:grid-cols-12'>
              <div className='relative min-h-[320px] overflow-hidden lg:col-span-8 lg:min-h-[560px]'>
                <Image src={featuredProject.coverImage} alt={`${featuredProject.title} proje kapak görseli`} fill className='object-cover transition-transform duration-700 group-hover:scale-[1.015]' sizes='(max-width: 1024px) 100vw, 66vw' priority />
              </div>
              <div className='flex flex-col justify-between border-t border-border p-7 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-9'>
                <div><p className='editorial-index'>{featuredProject.year} / {featuredProject.client}</p><h3 className='mt-5 text-heading-lg'>{featuredProject.title}</h3><p className='mt-5 leading-7 text-muted-foreground'>{featuredProject.tagline}</p></div>
                <div className='mt-12'><div className='flex flex-wrap gap-2'>{featuredProject.tags.map((tag) => <span key={tag} className='border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider'>{tag}</span>)}</div><p className='mt-8 text-sm font-medium text-accent'>Vaka analizini aç →</p></div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      <section className='editorial-dark border-b border-white/15'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-4'><p className='editorial-kicker !text-white/55'>02 / AI Factory</p><h2 className='mt-5 text-heading-xl'>Modüler bir üretim sistemi.</h2><p className='mt-6 max-w-sm leading-7 text-white/60'>Fikir, bağlam, araç ve değerlendirme katmanlarını birbirine bağlayan yeniden kullanılabilir sistem parçaları.</p><Button asChild variant='outline' className='mt-8 border-white/25 text-white hover:bg-white/10'><Link href='/ai-factory'>Sistemi incele</Link></Button></div>
            <div className='grid gap-4 sm:grid-cols-2 lg:col-span-8'>
              <ModuleCover variant='agent' /><ModuleCover variant='prompt' /><ModuleCover variant='evaluation' /><ModuleCover variant='workflow' />
            </div>
          </div>
          {methods.length > 0 && <div className='mt-12 grid border-t border-white/20 md:grid-cols-3'>{methods.slice(0, 3).map((method, index) => <Link key={method.slug} href={`/metotlar/${method.slug}`} className='border-b border-white/20 py-6 pr-6 md:border-b-0 md:border-r md:pl-6 first:pl-0 last:border-r-0'><span className='font-mono text-[10px] text-white/40'>0{index + 1}</span><h3 className='mt-3 font-medium'>{method.title}</h3><p className='mt-2 text-sm leading-6 text-white/55'>{method.tagline}</p></Link>)}</div>}
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-12 lg:grid-cols-12'>
            <div className='lg:col-span-4'><p className='editorial-kicker'>03 / Uzmanlık</p><h2 className='mt-5 text-heading-xl'>Teknoloji seçmekten önce sistemi tanımlarım.</h2></div>
            <div className='grid border-t border-border sm:grid-cols-2 lg:col-span-8'>
              {expertise.map(([index, title, description]) => <div key={index} className='border-b border-border p-6 sm:odd:border-r'><p className='editorial-index'>{index}</p><h3 className='mt-6 text-xl font-medium'>{title}</h3><p className='mt-3 text-sm leading-6 text-muted-foreground'>{description}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-10 lg:grid-cols-12'>
            <div className='relative min-h-[520px] overflow-hidden lg:col-span-5'><Image src='/images/portraits/burak-portrait-close.jpeg' alt='Burak Ünlüler, çalışma ortamında portre' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 42vw' /></div>
            <div className='flex flex-col justify-between lg:col-span-7 lg:pl-10'><div><p className='editorial-kicker'>04 / Hakkımda</p><h2 className='mt-6 text-heading-xl'>Ürün, sistem ve deneyim arasında çalışıyorum.</h2><p className='mt-7 max-w-2xl text-body-lg text-muted-foreground'>2015 civarında oyun sunucuları için paket geliştirmeleri ve bootstack geçişleriyle başlayan üretim pratiğim, 2022’de ilk profesyonel projeyle ürün geliştirme odağına taşındı.</p></div><div className='mt-12 border-t border-border pt-6'><Link href='/hakkinda' className='editorial-link text-sm'>Biyografiyi ve çalışma yaklaşımını oku →</Link></div></div>
          </div>
        </Container>
      </section>

      {articles.length > 0 && <section><Container className='py-20 sm:py-28'><div className='mb-10 flex items-end justify-between border-b border-border pb-5'><div><p className='editorial-kicker'>05 / Yayınlar</p><h2 className='mt-4 text-heading-xl'>Saha notları ve rehberler</h2></div><Link href='/yazilar' className='editorial-link text-sm'>Tüm yayınlar →</Link></div><div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div></Container></section>}
    </>
  )
}
