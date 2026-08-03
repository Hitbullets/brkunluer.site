import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { ProjectCard } from '@/components/cards/project-card'
import { getAllProjects } from '@/lib/content'

const showcaseSlugs = ['cau-ink', 'saloniq', 'ai-factory-os', 'adres-moda']

export const metadata: Metadata = {
  alternates: { canonical: '/portfolyo' },
  title: 'Burak Ünlüer Portföyü | Web, SaaS ve AI Ürün Çalışmaları',
  description: 'Burak Ünlüer’in web sitesi, e-ticaret, SaaS, AI ürün mimarisi, otomasyon ve prompt engineering çalışmalarından seçilmiş portföyü.',
}

export default async function PortfolioPage() {
  const projects = await getAllProjects()
  const showcaseProjects = showcaseSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))
  const activeProjects = projects.filter((project) => project.portfolioTier === 'active-development')
  const archiveProjects = projects.filter((project) => !showcaseSlugs.includes(project.slug) && project.portfolioTier !== 'active-development')

  return (
    <>
      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <p className='editorial-kicker'>01 / Portföy</p>
          <div className='mt-7 grid gap-8 lg:grid-cols-12'>
            <h1 className='text-display-lg lg:col-span-8'>Web deneyimleri, SaaS ürünleri ve AI tabanlı iş sistemleri.</h1>
            <div className='self-end lg:col-span-4'>
              <p className='text-body-lg text-muted-foreground'>Burak Ünlüer portföyü; müşteri web siteleri, e-ticaret çalışmaları, işletme yönetimi SaaS ürünleri, OpenAI tabanlı ürün mimarileri ve sektöre özel otomasyon sistemlerinden seçilmiş çalışmaları gösterir.</p>
              <div className='mt-8 grid grid-cols-2 gap-5 border-t border-border pt-5'>
                <div><p className='text-heading-lg'>{showcaseProjects.length}</p><p className='mt-1 text-sm text-muted-foreground'>Vitrin çalışması</p></div>
                <div><p className='text-heading-lg'>20+</p><p className='mt-1 text-sm text-muted-foreground'>Otomasyon aracı</p></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className='py-16 sm:py-24'>
        <div className='mb-10 max-w-2xl'>
          <p className='editorial-kicker'>Vitrin çalışmaları</p>
          <h2 className='mt-5 text-heading-lg'>İşverene ilk gösterilecek güçlü işler.</h2>
          <p className='mt-5 text-body text-muted-foreground'>Bu bölümde yalnızca gerçek ekran, net kapsam veya güçlü ürün/mimari anlatımı olan çalışmalar öne çıkarılır.</p>
        </div>
        <div className='grid gap-8'>{showcaseProjects.map((project) => <ProjectCard key={project.slug} project={project} variant='featured' />)}</div>
      </Container>

      <section className='border-y border-border bg-card'>
        <Container className='py-16 sm:py-24'>
          <div className='grid gap-6 lg:grid-cols-3'>
            <div className='border border-border bg-background p-6'>
              <p className='editorial-index'>SEKTÖREL OTOMASYON</p>
              <p className='mt-4 text-heading-md'>20’den fazla araç</p>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>Emlak, e-ticaret, içerik, müşteri takibi ve operasyon akışları için sektöre özel otomasyon kurguları.</p>
            </div>
            <div className='border border-border bg-background p-6'>
              <p className='editorial-index'>AI MODEL GELİŞTİRME</p>
              <p className='mt-4 text-heading-md'>Eğitim ve yönlendirme</p>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>OpenAI tabanlı ürün akışları, görev odaklı model davranışı ve doğrulama kapılarıyla çalışan sistem tasarımı.</p>
            </div>
            <div className='border border-border bg-background p-6'>
              <p className='editorial-index'>PROMPT ENGINEERING</p>
              <p className='mt-4 text-heading-md'>Alana özel yapı</p>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>Belirli sektör, görev ve kullanıcı profiline göre tekrar kullanılabilir prompt yapıları ve iş akışı şablonları.</p>
            </div>
          </div>
        </Container>
      </section>

      {activeProjects.length > 0 && <section className='border-b border-border'>
        <Container className='py-16 sm:py-24'>
          <div className='mb-12 grid gap-6 lg:grid-cols-12'>
            <div className='lg:col-span-7'>
              <p className='editorial-kicker'>Aktif geliştirme</p>
              <h2 className='mt-5 text-heading-lg'>Üzerinde çalışılan ürün ve platformlar.</h2>
            </div>
            <p className='self-end text-sm leading-6 text-muted-foreground lg:col-span-4 lg:col-start-9'>Bu kayıtlar tamamlanmış vitrin işi gibi sunulmaz; kapsam, ekranlar ve teknik doğrulama netleştikçe vaka çalışmasına dönüştürülür.</p>
          </div>
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>{activeProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        </Container>
      </section>}

      <section className='border-b border-border bg-card'>
        <Container className='py-16 sm:py-24'>
          <div className='mb-12 grid gap-6 lg:grid-cols-12'>
            <div className='lg:col-span-7'>
              <p className='editorial-kicker'>Proje arşivi</p>
              <h2 className='mt-5 text-heading-lg'>{archiveProjects.length} ek kayıt.</h2>
            </div>
            <p className='self-end text-sm leading-6 text-muted-foreground lg:col-span-4 lg:col-start-9'>Bu bölüm üretim işleri, prototipler, teklif çalışmaları, iç araçlar ve deneysel kayıtları daha düşük öncelikle listeler. Eksik alanlar doğrulandıkça güncellenir.</p>
          </div>
          {archiveProjects.length === 0 ? <p className='py-12 text-muted-foreground'>Arşiv kaydı bulunmuyor.</p> : <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>{archiveProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>}
        </Container>
      </section>
    </>
  )
}
