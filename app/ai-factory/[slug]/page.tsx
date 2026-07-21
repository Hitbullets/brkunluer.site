import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { MethodDetail } from '@/components/cards/method-detail'
import { getMethodBySlug, getAllMethods } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const method = await getMethodBySlug(slug)
  
  if (!method) return { title: 'Ürün bulunamadı' }
  
  return {
    title: method.title + ' — AI Factory',
    description: method.tagline,
    alternates: { canonical: `/ai-factory/${method.slug}` },
    openGraph: {
      title: method.title,
      description: method.tagline,
      images: method.coverImage ? [method.coverImage] : [],
    },
  }
}

export async function generateStaticParams() {
  const methods = await getAllMethods()
  return methods.map((method) => ({ slug: method.slug }))
}

export default async function AIFactoryProductPage({ params }: Props) {
  const { slug } = await params
  const method = await getMethodBySlug(slug)
  
  if (!method) notFound()
  
  const allMethods = await getAllMethods()
  const otherMethods = allMethods.filter((m) => m.slug !== slug).slice(0, 2)
  
  return (
    <Container className='py-16 sm:py-20 lg:py-24'>
      <MethodDetail method={method} serializedDescription={method.description} />
      
      {otherMethods.length > 0 && (
        <section className='mt-24'>
          <h2 className='text-heading-lg font-semibold mb-8'>AI Factory&apos;deki Diğer Ürünler</h2>
          <div className='grid gap-6 sm:grid-cols-2'>
            {otherMethods.map((m) => (
              <Link
                key={m.slug}
                href={'/ai-factory/' + m.slug}
                className='group rounded-xl border border-border p-6 hover:border-brand-300 dark:hover:border-brand-700 transition-all'
              >
                <p className='font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{m.title}</p>
                <p className='text-sm text-muted-foreground mt-1'>{m.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
