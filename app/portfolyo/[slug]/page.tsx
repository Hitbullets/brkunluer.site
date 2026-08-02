import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/cards/project-detail'
import { getAllProjects, getProjectBySlug } from '@/lib/content'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Proje bulunamadı' }
  return { title: project.title, description: project.tagline, alternates: { canonical: `/portfolyo/${project.slug}` }, openGraph: { title: project.title, description: project.tagline, type: 'website', images: project.coverImage ? [project.coverImage] : [] } }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()
  return <ProjectDetail project={project} serializedBody={project.body} />
}
