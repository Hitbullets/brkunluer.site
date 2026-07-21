import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { ProjectDetail } from '@/components/cards/project-detail'
import { getProjectBySlug, getAllProjects } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  
  if (!project) return { title: 'Proje bulunamadi' }
  
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/portfolyo/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: 'website',
      images: project.coverImage ? [project.coverImage] : [],
    },
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  
  if (!project) notFound()
  
  const serializedBody = project.body
  
  const allProjects = await getAllProjects()
  const otherProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 3)
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null
  
  return (
    <Container className='py-16 sm:py-20 lg:py-24'>
      <div className='mb-8'>
        <Button asChild variant='ghost' size='sm'>
          <Link href='/portfolyo'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Tum Projeler
          </Link>
        </Button>
      </div>
      
      <ProjectDetail project={project} serializedBody={serializedBody} />
      
      {/* Next / Prev Navigation */}
      {(prevProject || nextProject) && (
        <nav className='mt-24 grid grid-cols-2 gap-4 max-w-4xl mx-auto' aria-label='Project navigation'>
          {prevProject ? (
            <Link
              href={'/portfolyo/' + prevProject.slug}
              className='group rounded-xl border border-border p-5 hover:border-brand-300 dark:hover:border-brand-700 transition-all'
            >
              <span className='text-xs text-muted-foreground'>Onceki Proje</span>
              <p className='font-medium mt-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{prevProject.title}</p>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link
              href={'/portfolyo/' + nextProject.slug}
              className='group rounded-xl border border-border p-5 text-right hover:border-brand-300 dark:hover:border-brand-700 transition-all'
            >
              <span className='text-xs text-muted-foreground'>Sonraki Proje</span>
              <p className='font-medium mt-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{nextProject.title}</p>
            </Link>
          ) : <div />}
        </nav>
      )}
      
      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className='mt-24 max-w-4xl mx-auto'>
          <h2 className='text-heading-lg font-semibold mb-8'>Diger Projeler</h2>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {otherProjects.map((p) => (
              <Link key={p.slug} href={'/portfolyo/' + p.slug} className='group block'>
                <div className='rounded-xl border border-border p-5 transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-700'>
                  <p className='text-xs text-muted-foreground mb-1'>{p.year}</p>
                  <p className='font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{p.title}</p>
                  <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
