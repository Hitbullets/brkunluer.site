import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { MdxRendererRsc as MdxRenderer } from '@/components/mdx/mdx-renderer-rsc'
import type { Project } from '@/lib/types'

const inkosStack = [
  ['Arayüz', 'React', 'Yaratıcı çalışma alanı'], ['Servisler', 'Python', 'Üretim hattı'], ['Kimlik', 'Google OAuth', 'Oturum akışı'], ['Prompt', 'Claude', 'Prompt geliştirme'], ['Görsel', 'OpenAI görüntü modeli', 'Tasarım üretimi'], ['Tarayıcı', 'Sobel filtresi', 'Stencil önizlemesi'],
]

export function ProjectDetail({ project, serializedBody }: { project: Project; serializedBody: string }) {
  return (
    <>
      <header className='border-b border-border'>
        <Container className='py-16 sm:py-24'>
          <p className='editorial-kicker'>{project.year} / {project.client || 'Bağımsız proje'}</p>
          <div className='mt-7 grid gap-8 lg:grid-cols-12'><div className='lg:col-span-8'><h1 className='text-display-lg'>{project.title}</h1><p className='mt-6 max-w-3xl text-body-lg text-muted-foreground'>{project.tagline}</p></div><div className='flex items-end lg:col-span-4'>{project.liveUrl && <Button asChild variant='outline'><a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>Canlı ürünü aç <ArrowUpRight /></a></Button>}</div></div>
        </Container>
      </header>
      <Container size='wide' className='py-8 sm:py-12'><div className='relative aspect-[16/9] overflow-hidden border border-border'><Image src={project.coverImage} alt={`${project.title} kapak görseli`} fill className='object-cover' sizes='100vw' priority /></div></Container>
      <Container className='grid gap-12 pb-20 pt-8 lg:grid-cols-12 lg:pb-28'>
        <aside className='lg:col-span-3'><p className='editorial-index'>PROJE DİZİNİ</p><div className='mt-5 flex flex-wrap gap-2'>{project.tags.map((tag) => <span key={tag} className='border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider'>{tag}</span>)}</div></aside>
        <article className='lg:col-span-8 lg:col-start-5'><div className='prose-custom'><MdxRenderer source={serializedBody || project.body} /></div></article>
      </Container>
      {project.slug === 'inkos' && <section className='border-y border-border bg-card'><Container className='py-16'><p className='editorial-kicker'>Teknoloji dizini</p><h2 className='mt-5 text-heading-lg'>Sistem katmanları</h2><div className='mt-8 overflow-x-auto'><table className='w-full border-collapse text-left text-sm'><thead><tr className='border-y border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground'><th className='py-4'>Katman</th><th>Teknoloji</th><th>Rol</th></tr></thead><tbody>{inkosStack.map(([layer, tech, role]) => <tr key={layer} className='border-b border-border'><td className='py-5 font-medium'>{layer}</td><td className='font-mono text-xs text-accent'>{tech}</td><td className='text-muted-foreground'>{role}</td></tr>)}</tbody></table></div></Container></section>}
      <Container className='py-12'><Button asChild variant='outline'><Link href='/portfolyo'>← Portföye dön</Link></Button></Container>
    </>
  )
}
