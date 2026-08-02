import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { ArticleCard } from '@/components/cards/article-card'
import { getAllArticles, getAllTags } from '@/lib/content'

export const metadata: Metadata = { alternates: { canonical: '/yazilar' }, title: 'Yayınlar', description: 'AI ürün geliştirme, ajan mühendisliği, otomasyon ve ürün deneyimi üzerine Türkçe yayınlar.' }

export default async function ArticlesPage() {
  const [articles, tags] = await Promise.all([getAllArticles(), getAllTags()])
  return (
    <>
      <section className='border-b border-border'><Container className='py-20 sm:py-28'><p className='editorial-kicker'>03 / Yayınlar</p><div className='mt-7 grid gap-8 lg:grid-cols-12'><h1 className='text-display-lg lg:col-span-8'>Sistem kurarken alınan notlar.</h1><p className='self-end text-body-lg text-muted-foreground lg:col-span-4'>Ajan mühendisliği, prompt sistemleri, otomasyon ve ürün geliştirme üzerine uygulanabilir Türkçe rehberler.</p></div></Container></section>
      <Container className='py-16 sm:py-24'><nav aria-label='Yayın etiketleri' className='mb-12 flex flex-wrap gap-2 border-b border-border pb-6'><Link href='/yazilar' className='border border-foreground bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-background'>Tümü</Link>{tags.map((tag) => <Link key={tag.slug} href={`/yazilar/etiket/${tag.slug}`} className='border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider hover:border-foreground'>{tag.name} / {tag.count}</Link>)}</nav>{articles.length === 0 ? <p className='py-16 text-muted-foreground'>Henüz yayımlanmış içerik yok.</p> : <div className='grid gap-7 md:grid-cols-2 lg:grid-cols-3'>{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>}</Container>
    </>
  )
}
