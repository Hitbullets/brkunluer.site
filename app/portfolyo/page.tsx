import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { ProjectCard } from '@/components/cards/project-card'
import { SectionHero } from '@/components/layout/hero'
import { getAllProjects } from '@/lib/content'

export const metadata: Metadata = {
  alternates: { canonical: '/portfolyo' },
  title: 'Portfolyo',
  description: 'Secili projeler ve vaka calismalari.',
}

export default async function PortfolioPage() {
  const projects = await getAllProjects()
  const featuredProject = projects[0]
  const restProjects = projects.slice(1)

  return (
    <section className='relative overflow-hidden bg-background vignette-light'>
      <Container className='py-24'>
        <SectionHero
          title='Portfolyo'
          subtitle='Uzerinde calistigim secili projeler ve vaka calismalari.'
        />

        {projects.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-muted-foreground'>Yakinda projeler eklenecek.</p>
          </div>
        ) : (
          <div className='space-y-12'>
            {featuredProject && (
              <section>
                <ProjectCard project={featuredProject} variant='featured' />
              </section>
            )}

            {restProjects.length > 0 && (
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {restProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
