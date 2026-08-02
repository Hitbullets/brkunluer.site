import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/types'

export function ProjectCard({ project, variant = 'default' }: { project: Project; variant?: 'default' | 'featured' }) {
  return (
    <Link href={`/portfolyo/${project.slug}`} className={`group grid overflow-hidden border border-border bg-card ${variant === 'featured' ? 'lg:grid-cols-12' : ''}`}>
      {project.coverImage && <div className={`relative min-h-[280px] overflow-hidden ${variant === 'featured' ? 'lg:col-span-8 lg:min-h-[540px]' : 'aspect-[16/10]'}`}><Image src={project.coverImage} alt={`${project.title} proje kapak görseli`} fill className='object-cover transition-transform duration-700 group-hover:scale-[1.015]' sizes={variant === 'featured' ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'} /></div>}
      <div className={`flex flex-col justify-between border-t border-border p-7 ${variant === 'featured' ? 'lg:col-span-4 lg:border-l lg:border-t-0 lg:p-9' : ''}`}><div><p className='editorial-index'>{project.year} / {project.client || 'Bağımsız proje'}</p><h2 className='mt-5 text-heading-lg group-hover:text-accent'>{project.title}</h2><p className='mt-4 leading-7 text-muted-foreground'>{project.tagline}</p></div><div className='mt-10'><div className='flex flex-wrap gap-2'>{project.tags.map((tag) => <span key={tag} className='border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider'>{tag}</span>)}</div><p className='mt-7 text-sm font-medium text-accent'>Vaka analizini aç →</p></div></div>
    </Link>
  )
}
