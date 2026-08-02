import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container, Grid } from '@/components/layout/container'
import { ArticleCard } from '@/components/cards/article-card'
import { PageHeader } from '@/components/ui/section-header'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getAllTags, getArticlesByTag, getTagInfo } from '@/lib/content'

export async function generateMetadata({
  params,
}: PageProps<'/yazilar/etiket/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagInfo(slug)

  return {
    alternates: { canonical: `/yazilar/etiket/${slug}` },
    title: tag ? `${tag.name} Yazıları` : 'Etiket Bulunamadı',
    description: tag
      ? `${tag.name} konusunda AI, otomasyon ve ürün geliştirme odaklı Türkçe makaleleri inceleyin.`
      : 'Aradığınız etikete ait bir içerik bulunamadı.',
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({ slug: tag.slug }))
}

export default async function TaggedArticlesPage({ params }: PageProps<'/yazilar/etiket/[slug]'>) {
  const { slug } = await params
  const [articles, tags, activeTag] = await Promise.all([
    getArticlesByTag(slug),
    getAllTags(),
    getTagInfo(slug),
  ])

  return (
    <Container className='py-16 sm:py-20 lg:py-24'>
      <PageHeader
        title={activeTag ? `${activeTag.name} Yazıları` : 'Etiket Bulunamadı'}
        description={activeTag ? `${activeTag.name} etiketindeki makaleler.` : 'Bu etikete ait yayımlanmış bir içerik bulunmuyor.'}
        badge='Etiket Arşivi'
      />

      <div className='mb-12 flex flex-wrap gap-2' role='group' aria-label='Etikete göre filtrele'>
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

      {articles.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-muted-foreground mb-6'>Bu etikete ait henüz bir yazı yayımlanmadı.</p>
          <Button asChild variant='primary'>
            <Link href='/yazilar'>Tüm Yazıları Gör</Link>
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
