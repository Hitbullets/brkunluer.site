import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container, Grid } from '@/components/layout/container'
import { ArticleCard } from '@/components/cards/article-card'
import { PageHeader } from '@/components/ui/section-header'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getAllArticles, getAllTags } from '@/lib/content'

export const metadata: Metadata = {
  alternates: { canonical: '/yazilar' },
  title: 'Yazılar',
  description: 'AI iş akışları, otomasyon ve metodoloji üzerine makaleler.',
}

export default async function ArticlesPage() {
  const [articles, tags] = await Promise.all([getAllArticles(), getAllTags()])

  return (
    <Container className='py-16 sm:py-20 lg:py-24'>
      <PageHeader
        title='Yazılar'
        description='AI, otomasyon ve sistemler üzerine pratik makaleler.'
        badge='Tüm Makaleler'
      />

      {/* Tag Filter */}
      <div className='mb-12 flex flex-wrap gap-2' role='group' aria-label='Filter by tag'>
        <Link
          href='/yazilar'
          className={cn(
            'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors',
            'border-border bg-background text-foreground hover:bg-secondary',
          )}
        >
          Hepsi
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/yazilar/etiket/${tag.slug}`}
            className='inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors border-border bg-background text-foreground hover:bg-secondary'
          >
            {tag.name} <Badge variant='secondary' className='ml-2'>{tag.count}</Badge>
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-muted-foreground mb-6'>Henüz yazı eklenmedi.</p>
          <Button asChild variant='primary'>
            <Link href='/admin/yazilar/yeni'>İlk yazıyı yaz</Link>
          </Button>
        </div>
      ) : (
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={6}>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </Grid>
      )}
    </Container>
  )
}
