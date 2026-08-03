import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { MdxRendererRsc as MdxRenderer } from '@/components/mdx/mdx-renderer-rsc'
import type { Project } from '@/lib/types'

const inkosStack = [
  ['Arayüz', 'React', 'Yaratıcı çalışma alanı'], ['Servisler', 'Python', 'Üretim hattı'], ['Kimlik', 'Google OAuth', 'Oturum akışı'], ['Prompt', 'Claude', 'Prompt geliştirme'], ['Görsel', 'OpenAI görüntü modeli', 'Tasarım üretimi'], ['Tarayıcı', 'Sobel filtresi', 'Stencil önizlemesi'],
]

export function ProjectDetail({ project, serializedBody }: { project: Project; serializedBody: string }) {
  const isArchive = project.recordType === 'archive'
  const context = [project.year, project.client || (isArchive ? project.archive?.projectType : 'Bağımsız proje')]
    .filter(Boolean)
    .join(' / ')
  const hasPrivateRepository = project.repositoryAccess === 'private'

  return (
    <>
      <header className='border-b border-border'>
        <Container className='py-16 sm:py-24'>
          <p className='editorial-kicker'>{context || 'Proje bilgileri hazırlanıyor'}</p>
          <div className='mt-7 grid gap-8 lg:grid-cols-12'>
            <div className='lg:col-span-8'>
              <h1 className='text-display-lg'>{project.title}</h1>
              <p className='mt-6 max-w-3xl text-body-lg text-muted-foreground'>{project.tagline}</p>
              {project.portfolioRole && <p className='mt-6 max-w-3xl border-l border-accent pl-4 text-sm leading-6 text-muted-foreground'>{project.portfolioRole}</p>}
            </div>
            <div className='flex flex-col justify-end gap-3 lg:col-span-4'>
              {project.liveUrl && <Button asChild variant='outline'><a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>Canlı ürünü aç <ArrowUpRight /></a></Button>}
              {project.repositoryUrl && <Button asChild variant='outline'><a href={project.repositoryUrl} target='_blank' rel='noopener noreferrer'>GitHub kaynağını aç <ArrowUpRight /></a></Button>}
              {hasPrivateRepository && (
                <div className='border border-border bg-card p-4 text-sm leading-6 text-muted-foreground'>
                  <div className='mb-2 flex items-center gap-2 font-medium text-foreground'><LockKeyhole className='h-4 w-4' /> Kaynak erişimi</div>
                  {project.repositoryAccessNote}
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>
      {project.coverImage && <Container size='wide' className='py-8 sm:py-12'><div className='relative aspect-[16/9] overflow-hidden border border-border bg-muted/40'><Image src={project.coverImage} alt={`${project.title} kapak görseli`} fill className='object-cover' sizes='100vw' preload /></div></Container>}
      {isArchive && project.archive && (
        <section className='border-b border-border bg-card'>
          <Container className='grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4'>
            <div>
              <p className='editorial-index'>KAYIT TÜRÜ</p>
              <p className='mt-3 font-medium'>{project.archive.projectType}</p>
              <p className='mt-1 text-sm text-muted-foreground'>{project.archive.industry}</p>
            </div>
            <div>
              <p className='editorial-index'>BELGE KAPSAMI</p>
              <p className='mt-3 text-heading-lg'>{project.archive.documentationScore}/100</p>
              <p className='mt-1 text-sm text-muted-foreground'>{project.archive.sourceCount} kaynak kaydı</p>
            </div>
            <div>
              <p className='editorial-index'>DOĞRULANAN DURUM</p>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>{project.archive.currentStatus}</p>
            </div>
            <div>
              <p className='editorial-index'>KAYNAK ERİŞİMİ</p>
              <p className='mt-3 text-sm leading-6 text-muted-foreground'>{project.repositoryUrl ? 'Public GitHub kaynağı bağlantısı mevcut.' : project.repositoryAccessNote ?? 'Kaynak erişimi talep üzerine paylaşılır.'}</p>
            </div>
          </Container>
        </section>
      )}
      <Container className='grid gap-12 pb-20 pt-8 lg:grid-cols-12 lg:pb-28'>
        <aside className='lg:col-span-3'><p className='editorial-index'>{project.portfolioTier === 'active-development' ? 'GELİŞTİRME DİZİNİ' : isArchive ? 'PROJE DİZİNİ' : 'VAKA DİZİNİ'}</p><div className='mt-5 flex flex-wrap gap-2'>{project.tags.map((tag) => <span key={tag} className='border border-border px-2 py-1 text-xs font-medium text-muted-foreground'>{tag}</span>)}</div></aside>
        <article className='lg:col-span-8 lg:col-start-5'><div className='prose-custom'><MdxRenderer source={serializedBody || project.body} /></div></article>
      </Container>
      {project.slug === 'inkos' && <section className='border-y border-border bg-card'><Container className='py-16'><p className='editorial-kicker'>Teknoloji dizini</p><h2 className='mt-5 text-heading-lg'>Sistem katmanları</h2><div className='mt-8 overflow-x-auto'><table className='w-full border-collapse text-left text-sm'><thead><tr className='border-y border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground'><th className='py-4'>Katman</th><th>Teknoloji</th><th>Rol</th></tr></thead><tbody>{inkosStack.map(([layer, tech, role]) => <tr key={layer} className='border-b border-border'><td className='py-5 font-medium'>{layer}</td><td className='font-mono text-xs text-accent'>{tech}</td><td className='text-muted-foreground'>{role}</td></tr>)}</tbody></table></div></Container></section>}
      <Container className='py-12'><Button asChild variant='outline'><Link href='/portfolyo'>← Portföye dön</Link></Button></Container>
    </>
  )
}
