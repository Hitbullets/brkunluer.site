import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MdxRendererRsc as MdxRenderer } from '@/components/mdx/mdx-renderer-rsc'
import { ImageGallery } from '@/components/gallery/image-gallery'
import { ExternalLink, Calendar } from 'lucide-react'
import type { Project } from '@/lib/types'

interface Props {
  project: Project
  serializedBody: string
}

export function ProjectDetail({ project, serializedBody }: Props) {
  const images: string[] = project.gallery && project.gallery.length > 0
    ? project.gallery
    : project.coverImage
      ? [project.coverImage]
      : []

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Hero Section */}
      <header className='mb-12'>
        <div className='flex flex-wrap items-center gap-3 mb-4'>
          <span className='inline-flex items-center gap-1.5 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4' />
            {project.year}
          </span>
          {project.client && <Badge variant='secondary'>{project.client}</Badge>}
          <div className='flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <Badge key={tag} variant='outline'>{tag}</Badge>
            ))}
          </div>
        </div>
        <h1 className='text-display-sm font-bold tracking-tight'>{project.title}</h1>
        <p className='mt-4 text-body-lg text-muted-foreground max-w-2xl'>{project.tagline}</p>
        {project.liveUrl && (
          <Button asChild variant='outline' className='mt-6'>
            <a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='mr-2 h-4 w-4' />
              Canli Siteyi Gor
            </a>
          </Button>
        )}
      </header>

      {/* Gallery */}
      {images.length > 0 && (
        <div className='mb-12'>
          <ImageGallery images={images} title={project.title} />
        </div>
      )}

      {/* Content */}
      <div className='max-w-[680px] mx-auto'>
        <Separator className='mb-10' />

        <div className='prose-custom'>
          <MdxRenderer source={serializedBody || project.body} />
        </div>

        {/* Back Navigation */}
        <Separator className='my-12' />
        <div className='text-center'>
          <Button asChild variant='outline'>
            <Link href='/portfolyo'>Tum Projelere Don</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
