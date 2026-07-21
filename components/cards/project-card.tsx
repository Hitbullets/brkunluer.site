import Link from 'next/link'
import { ImageWrapper } from "@/components/ui/image-wrapper"
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/lib/types'

interface Props {
  project: Project
  variant?: 'default' | 'featured'
}

export function ProjectCard({ project, variant = 'default' }: Props) {
  if (variant === 'featured') {
    return (
      <Link href={'/portfolyo/' + project.slug} className='group block h-full'>
        <Card variant='feature' interactive className='overflow-hidden h-full'>
          {project.coverImage && (
            <div className='relative h-56 w-full overflow-hidden'>
              <ImageWrapper src={project.coverImage} alt={project.title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(max-width: 768px) 100vw, 50vw'  />
            </div>
          )}
          <CardHeader>
            <div className='flex flex-wrap items-center gap-2 mb-2'>
              <span className='text-xs text-muted-foreground'>{project.year}</span>
              <div className='flex flex-wrap gap-1.5'>
                {project.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant='secondary' className='text-xs'>{tag}</Badge>
                ))}
              </div>
            </div>
            <CardTitle className='text-heading-sm'>{project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-body-sm text-muted-foreground line-clamp-2'>{project.tagline}</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={'/portfolyo/' + project.slug} className='group block h-full'>
      <Card variant='feature' interactive className='overflow-hidden h-full'>
        {project.coverImage && (
          <div className='relative h-48 w-full overflow-hidden'>
            <ImageWrapper
              src={project.coverImage}
              alt={project.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
             />
          </div>
        )}

        <CardHeader>
          <div className='flex flex-wrap items-center gap-2 mb-2'>
            <span className='text-xs text-muted-foreground'>{project.year}</span>
            {project.client && (
              <Badge variant='secondary' className='text-xs'>{project.client}</Badge>
            )}
          </div>
          <CardTitle className='text-heading-sm line-clamp-2'>{project.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className='text-body-sm text-muted-foreground line-clamp-2'>{project.tagline}</p>
          <div className='mt-3 flex flex-wrap gap-1.5'>
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant='outline' className='text-xs'>{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
