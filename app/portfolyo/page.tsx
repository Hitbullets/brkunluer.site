import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { ProjectCard } from '@/components/cards/project-card'
import { getAllProjects } from '@/lib/content'

export const metadata: Metadata = {
  alternates: { canonical: '/portfolyo' },
  title: 'Web Geliştirme Portföyü ve Proje Arşivi',
  description: 'Burak Ünlüer’in web siteleri, SaaS ürünleri, AI projeleri, müşteri çalışmaları ve teknik arşiv kayıtları.',
}

export default async function PortfolioPage() {
  const projects = await getAllProjects()
  const caseStudies = projects.filter((project) => project.recordType === 'case-study')
  const archiveProjects = projects.filter((project) => project.recordType === 'archive')

  return (
    <>
      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <p className='editorial-kicker'>01 / Portföy</p>
          <div className='mt-7 grid gap-8 lg:grid-cols-12'>
            <h1 className='text-display-lg lg:col-span-8'>Üretilen siteler, ürünler ve geride kalan teknik kararlar.</h1>
            <div className='self-end lg:col-span-4'>
              <p className='text-body-lg text-muted-foreground'>Tam vaka çalışmalarının yanında; kaynak dosyalardan yeniden oluşturulan, doğrulama sınırları açık proje arşivi.</p>
              <div className='mt-8 grid grid-cols-2 gap-5 border-t border-border pt-5'>
                <div><p className='text-heading-lg'>{projects.length}</p><p className='mt-1 text-sm text-muted-foreground'>Kanonik proje</p></div>
                <div><p className='text-heading-lg'>{caseStudies.length}</p><p className='mt-1 text-sm text-muted-foreground'>Tam vaka çalışması</p></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {caseStudies.length > 0 && <Container className='py-16 sm:py-24'>
        <div className='mb-10 max-w-2xl'>
          <p className='editorial-kicker'>Seçili vaka çalışmaları</p>
          <h2 className='mt-5 text-heading-lg'>Ürün kararlarının ayrıntılı anlatımı.</h2>
        </div>
        <div className='grid gap-8'>{caseStudies.map((project) => <ProjectCard key={project.slug} project={project} variant='featured' />)}</div>
      </Container>}

      <section className='border-y border-border bg-card'>
        <Container className='py-16 sm:py-24'>
          <div className='mb-12 grid gap-6 lg:grid-cols-12'>
            <div className='lg:col-span-7'>
              <p className='editorial-kicker'>Master proje arşivi</p>
              <h2 className='mt-5 text-heading-lg'>{archiveProjects.length} ek proje kaydı.</h2>
            </div>
            <p className='self-end text-sm leading-6 text-muted-foreground lg:col-span-4 lg:col-start-9'>Bu bölüm; üretim sitelerini, prototipleri, teklifleri, iç araçları ve deneysel çalışmaları aynı kanıt standardıyla gösterir. Belirsiz bilgiler Unknown olarak kalır.</p>
          </div>
          {archiveProjects.length === 0 ? <p className='py-12 text-muted-foreground'>Arşiv kaydı bulunmuyor.</p> : <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>{archiveProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>}
        </Container>
      </section>
    </>
  )
}
