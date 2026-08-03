import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ProjectCard({ project, variant = 'default' }: { project: Project; variant?: 'default' | 'featured' }) {
  const isArchive = project.recordType === 'archive'
  const isActive = project.portfolioTier === 'active-development'
  const context = [project.year, project.client || (isArchive ? project.archive?.projectType : 'Bağımsız proje')]
    .filter(Boolean)
    .join(' / ')
  const actionLabel = isActive ? 'Geliştirme notlarını aç' : isArchive ? 'Proje kaydını aç' : 'Vaka analizini aç'

  return (
    <Link
      href={`/portfolyo/${project.slug}`}
      className={cn(
        'group grid h-full overflow-hidden border border-border bg-card',
        variant === 'featured' && 'lg:grid-cols-12',
      )}
    >
      {project.coverImage ? (
        <div
          className={cn(
            'relative aspect-[16/10] overflow-hidden bg-muted/40',
            variant === 'featured' && 'lg:col-span-7 lg:h-full lg:min-h-[360px] lg:aspect-auto',
          )}
        >
          <Image
            src={project.coverImage}
            alt={`${project.title} proje kapak görseli`}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-[1.015]'
            sizes={variant === 'featured' ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>
      ) : (
        <div className='flex aspect-[16/8] items-end justify-between border-b border-border bg-muted/40 p-6'>
          <span className='font-mono text-[10px] tracking-[0.15em] text-muted-foreground'>Arşiv kaydı</span>
          {project.archive && <span className='text-sm font-medium text-accent'>{project.archive.documentationScore}/100 belge</span>}
        </div>
      )}
      <div
        className={cn(
          'flex min-w-0 flex-col justify-between p-7',
          project.coverImage && 'border-t border-border',
          variant === 'featured' && 'lg:col-span-5 lg:border-l lg:border-t-0 lg:p-9',
        )}
      >
        <div>
          <p className='editorial-index'>{context || 'Proje bilgileri hazırlanıyor'}</p>
          <h2 className='mt-5 text-heading-lg group-hover:text-accent'>{project.title}</h2>
          <p className='mt-4 leading-7 text-muted-foreground'>{project.tagline}</p>
          {project.evidenceSummary && <p className='mt-5 border-l border-accent pl-4 text-sm leading-6 text-muted-foreground'>{project.evidenceSummary}</p>}
        </div>
        <div className='mt-10'>
          <div className='flex flex-wrap gap-2'>{project.tags.map((tag) => <span key={tag} className='border border-border px-2 py-1 text-xs font-medium text-muted-foreground'>{tag}</span>)}</div>
          {project.repositoryAccess === 'private' && <p className='mt-5 text-xs leading-5 text-muted-foreground'>Private Repository erişimi talep üzerine paylaşılır.</p>}
          <p className='mt-7 text-sm font-medium text-accent'>{actionLabel} →</p>
        </div>
      </div>
    </Link>
  )
}
