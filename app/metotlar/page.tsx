import { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { MethodCard } from '@/components/cards/method-card'
import { ModuleCover } from '@/components/ui/editorial-graphics'
import { getAllMethods } from '@/lib/content'

export const metadata: Metadata = { alternates: { canonical: '/metotlar' }, title: 'AI Factory Sistem Kitaplığı', description: 'AI iş akışları, prompt sistemleri ve değerlendirme için uygulanabilir kitleri ve şablonları inceleyin.' }

export default async function MethodsPage() {
  const methods = await getAllMethods()
  return (
    <>
      <section className='border-b border-border'><Container className='py-20 sm:py-28'><p className='editorial-kicker'>AI Factory / Sistem Kitaplığı</p><div className='mt-7 grid gap-8 lg:grid-cols-12'><h1 className='text-display-lg lg:col-span-8'>Üretime doğrudan bağlanan sistem parçaları.</h1><p className='self-end text-body-lg text-muted-foreground lg:col-span-4'>Prompt kitleri, iş akışı şablonları ve değerlendirme modülleri; tek seferlik ipuçları değil, uygulanabilir çalışma düzenleri.</p></div></Container></section>
      <Container className='py-16 sm:py-24'><div className='mb-12 grid gap-4 sm:grid-cols-3'><ModuleCover variant='prompt' /><ModuleCover variant='workflow' /><ModuleCover variant='evaluation' /></div>{methods.length === 0 ? <p className='py-16 text-muted-foreground'>Henüz yayımlanmış sistem bulunmuyor.</p> : <div className='grid gap-7 md:grid-cols-2 lg:grid-cols-3'>{methods.map((method) => <MethodCard key={method.slug} method={method} />)}</div>}</Container>
    </>
  )
}
