import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { MethodDetail } from '@/components/cards/method-detail'
import { getAllMethods, getMethodBySlug } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const method = await getMethodBySlug(slug)

  if (!method) return { title: 'Metot bulunamadı' }

  return {
    title: method.title,
    description: method.tagline,
    alternates: { canonical: `/metotlar/${method.slug}` },
    openGraph: { title: method.title, description: method.tagline, images: method.coverImage ? [method.coverImage] : [] },
  }
}

export async function generateStaticParams() {
  const methods = await getAllMethods()
  return methods.map((method) => ({ slug: method.slug }))
}

export default async function MethodPage({ params }: Props) {
  const { slug } = await params
  const method = await getMethodBySlug(slug)
  if (!method) notFound()

  const otherMethods = (await getAllMethods()).filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <Container className='py-16 sm:py-20 lg:py-24'>
      <MethodDetail method={method} serializedDescription={method.description} />
      {otherMethods.length > 0 && (
        <section className='mt-24'>
          <h2 className='mb-8 text-heading-lg font-semibold'>Diğer metotlar</h2>
          <div className='grid gap-6 sm:grid-cols-2'>
            {otherMethods.map((item) => (
              <Link key={item.slug} href={`/metotlar/${item.slug}`} className='group rounded-xl border border-border p-6 transition-all hover:border-brand-300 dark:hover:border-brand-700'>
                <p className='font-medium transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400'>{item.title}</p>
                <p className='mt-1 text-sm text-muted-foreground'>{item.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
