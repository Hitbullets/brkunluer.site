import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { ProjectCard } from '@/components/cards/project-card'
import { getAllProjects } from '@/lib/content'

export const metadata: Metadata = {
  alternates: { canonical: '/portfolyo' },
  title: 'AI Ürün Geliştirme Portföyü',
  description: 'Burak Ünlüler tarafından geliştirilen seçili AI ürünlerini ve ayrıntılı vaka analizlerini inceleyin.',
}

const stack: Array<[string, string, string]> = [
  ['Arayüz', 'React', 'Ürün arayüzü ve yaratıcı çalışma alanı'],
  ['Servisler', 'Python', 'Üretim hattı ve arka uç servisleri'],
  ['Kimlik', 'Google OAuth', 'Kullanıcı kimlik doğrulama akışı'],
  ['Prompt', 'Claude', 'Fikirleri üretim komutuna dönüştürme'],
  ['Görsel', 'OpenAI görüntü modeli', 'Dövme tasarımı üretimi'],
  ['Tarayıcı', 'Sobel filtresi', 'Ek AI çağrısı olmadan stencil önizlemesi'],
]

export default async function PortfolioPage() {
  const projects = await getAllProjects()
  return (
    <>
      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <p className='editorial-kicker'>01 / Portföy</p>
          <div className='mt-7 grid gap-8 lg:grid-cols-12'>
            <h1 className='text-display-lg lg:col-span-8'>Ürün kararlarının görünür olduğu projeler.</h1>
            <p className='self-end text-body-lg text-muted-foreground lg:col-span-4'>Teknik yaklaşımı yalnızca teknoloji listesi olarak değil; problem, karar ve ürün sonucu ilişkisiyle anlatan vaka analizleri.</p>
          </div>
        </Container>
      </section>

      <Container className='py-16 sm:py-24'>
        {projects.length === 0 ? <p className='py-16 text-muted-foreground'>Henüz yayımlanmış proje bulunmuyor.</p> : <div className='grid gap-8'>{projects.map((project) => <ProjectCard key={project.slug} project={project} variant='featured' />)}</div>}
      </Container>

      {projects.some((project) => project.slug === 'inkos') && (
        <section className='border-y border-border bg-card'>
          <Container className='py-16 sm:py-24'>
            <div className='grid gap-10 lg:grid-cols-12'>
              <div className='lg:col-span-4'><p className='editorial-kicker'>Teknoloji dizini</p><h2 className='mt-5 text-heading-lg'>InkOS sistem özeti</h2><p className='mt-4 text-sm leading-6 text-muted-foreground'>Projede doğrulanmış katmanların, kullanılan teknoloji ve sistemdeki rolüyle birlikte özeti.</p></div>
              <div className='overflow-x-auto lg:col-span-8'>
                <table className='w-full border-collapse text-left text-sm'>
                  <thead><tr className='border-y border-border font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground'><th className='py-4 pr-5'>Katman</th><th className='py-4 pr-5'>Teknoloji</th><th className='py-4'>Sistemdeki rol</th></tr></thead>
                  <tbody>{stack.map(([layer, technology, role]) => <tr key={layer} className='border-b border-border'><td className='py-5 pr-5 font-medium'>{layer}</td><td className='py-5 pr-5 font-mono text-xs text-accent'>{technology}</td><td className='py-5 text-muted-foreground'>{role}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
