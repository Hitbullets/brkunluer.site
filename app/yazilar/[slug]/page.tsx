import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/container'
import { ArticleDetail } from '@/components/cards/article-detail'
import { getArticleBySlug, getAllArticles } from '@/lib/content'
import { SectionHeader } from '@/components/ui/section-header'
import { ArticleCard } from '@/components/cards/article-card'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/layout/json-ld'
import { SiteConfig } from '@/lib/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) return { title: 'Yazi bulunamadi' }
  
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/yazilar/${article.slug}` },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) notFound()
  
  const mdxSource = article.body;
  
  // Get all articles for navigation
  const allArticles = await getAllArticles()
  const currentIndex = allArticles.findIndex((a) => a.slug === slug)
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
  
  // Get related articles by shared tags
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3)
  
  return (
    <Container className='py-12 sm:py-16 lg:py-24'>
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        url={`${SiteConfig.url}/yazilar/${article.slug}`}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        tags={article.tags}
        coverImage={article.coverImage}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Ana Sayfa', url: SiteConfig.url },
          { name: 'Yazılar', url: `${SiteConfig.url}/yazilar` },
          { name: article.title, url: `${SiteConfig.url}/yazilar/${article.slug}` },
        ]}
      />
      <ArticleDetail
        article={article}
        serializedBody={mdxSource}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
      />
      
      {relatedArticles.length > 0 && (
        <section className='mt-24 max-w-6xl mx-auto'>
          <SectionHeader
            title='Ilgili Yazilar'
            description='Benzer konularda diger makaleler.'
          />
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
