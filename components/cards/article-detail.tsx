import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { calculateReadingTime, extractToc } from '@/lib/reading-time'
import type { Article } from '@/lib/types'
import { MdxRendererRsc as MdxRenderer } from '@/components/mdx/mdx-renderer-rsc'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { ReadingProgress } from '@/components/layout/reading-progress'
import { ArticleShare } from '@/components/cards/article-share'
import { SiteConfig } from '@/lib/site'

interface Props {
  article: Article
  serializedBody?: string
  previousArticle?: Article | null
  nextArticle?: Article | null
}

export async function ArticleDetail({ article, serializedBody, previousArticle, nextArticle }: Props) {
  const readingTime = calculateReadingTime(article.body)
  const tocItems = extractToc(article.body)
  const articleUrl = SiteConfig.url + '/yazilar/' + article.slug

  return (
    <>
      <ReadingProgress />

      <div className='grid gap-12 lg:grid-cols-[1fr_220px] lg:gap-16 max-w-6xl mx-auto'>
        <article className='min-w-0'>
          <header className='mb-10'>
            <div className='mb-4 flex flex-wrap gap-2'>
              {article.tags.map((tag) => (
                <Badge key={tag} variant='accent'>{tag}</Badge>
              ))}
            </div>
            <h1 className='text-heading-xl sm:text-display-sm font-bold tracking-tight leading-tight'>{article.title}</h1>
            <p className='mt-4 text-body-lg text-muted-foreground'>{article.excerpt}</p>
            <div className='mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1.5'>
                <Calendar className='h-4 w-4' />
                {formatDate(article.publishedAt)}
              </div>
              <div className='flex items-center gap-1.5'>
                <Clock className='h-4 w-4' />
                {readingTime} dk okuma
              </div>
              {article.updatedAt && (
                <span>Guncellendi: {formatDate(article.updatedAt)}</span>
              )}
            </div>
          </header>

          {article.coverImage && (
            <div className='relative mb-10 aspect-video w-full overflow-hidden rounded-xl border border-border'>
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 800px'
                priority
              />
            </div>
          )}

          <div className='max-w-[680px] mx-auto'>
            <Separator className='mb-8' />

            <div className='prose-custom'>
              <MdxRenderer source={serializedBody || article.body} />
            </div>

            {/* AI Factory CTA */}
            <Separator className='my-10' />
            <div className='rounded-xl border border-brand-300/50 dark:border-brand-700/50 bg-brand-50/50 dark:bg-brand-950/20 p-6'>
              <div className='flex items-start gap-4'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white text-xs font-bold'>AF</div>
                <div>
                  <p className='font-semibold'>AI Factory ile tanismadin mi?</p>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Bu makaledeki tekniklerin hepsi AI Factory sistemi icinde hazir olarak geliyor.
                  </p>
                  <Button asChild variant='primary' size='sm' className='mt-3'>
                    <Link href='/ai-factory'>AI Factory&apos;yi Kesfet</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Author Section */}
            <Separator className='my-10' />
            <div className='flex items-start gap-4 p-6 rounded-xl bg-secondary/30 border border-border'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'>
                <User className='h-6 w-6' />
              </div>
              <div>
                <p className='font-semibold'>{SiteConfig.author.name}</p>
                <p className='text-sm text-muted-foreground mt-1'>{SiteConfig.author.bio}</p>
                <Link
                  href='/hakkinda'
                  className='inline-block mt-2 text-sm text-brand-600 dark:text-brand-400 hover:underline'
                >
                  Hakkinda daha fazla &rarr;
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className='mt-8 flex items-center justify-between'>
              <ArticleShare title={article.title} url={articleUrl} />
            </div>

            {/* Prev/Next */}
            {(previousArticle || nextArticle) && (
              <>
                <Separator className='my-8' />
                <nav className='grid grid-cols-2 gap-4' aria-label='Article navigation'>
                  {previousArticle ? (
                    <Link
                      href={'/yazilar/' + previousArticle.slug}
                      className='group flex flex-col gap-1 rounded-xl border border-border p-4 hover:bg-secondary/50 transition-colors'
                    >
                      <span className='flex items-center gap-1 text-xs text-muted-foreground'>
                        <ArrowLeft className='h-3 w-3' /> Onceki
                      </span>
                      <span className='text-sm font-medium line-clamp-2 group-hover:text-foreground transition-colors'>
                        {previousArticle.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextArticle ? (
                    <Link
                      href={'/yazilar/' + nextArticle.slug}
                      className='group flex flex-col gap-1 rounded-xl border border-border p-4 text-right hover:bg-secondary/50 transition-colors'
                    >
                      <span className='flex items-center justify-end gap-1 text-xs text-muted-foreground'>
                        Sonraki <ArrowRight className='h-3 w-3' />
                      </span>
                      <span className='text-sm font-medium line-clamp-2 group-hover:text-foreground transition-colors'>
                        {nextArticle.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              </>
            )}
          </div>
        </article>

        {tocItems.length > 0 && (
          <aside className='hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto'>
            <nav aria-label='Table of contents'>
              <h2 className='text-sm font-semibold tracking-tight mb-4'>Icerik</h2>
              <ul className='space-y-2.5'>
                {tocItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={'#' + item.id}
                      className={'block text-sm text-muted-foreground hover:text-foreground transition-colors ' + (item.level === 3 ? 'pl-4' : '')}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </>
  )
}
