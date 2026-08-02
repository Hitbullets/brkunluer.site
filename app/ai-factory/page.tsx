import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Settings, Cpu } from 'lucide-react'
import { getAllMethods } from '@/lib/content'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export const metadata: Metadata = {
  alternates: { canonical: '/ai-factory' },
  title: 'AI Factory',
  description: 'AI ajan mühendisliği, prompt sistemleri ve iş akışı otomasyonuyla fikirleri üretime taşıyan tekrarlanabilir AI ürün geliştirme sistemi.',
}

const systemFeatures = [
  {
    icon: Settings,
    title: 'Ajan Mühendisliği',
    desc: 'LLM tabanlı ajan orkestrasyonu, araç kullanımı ve bellek yönetimi sistemleri.',
  },
  {
    icon: BookOpen,
    title: 'Prompt Sistemleri',
    desc: 'Sistematik prompt tasarımı, değerlendirme süreçleri ve üretime hazır şablon çerçeveleri.',
  },
  {
    icon: Cpu,
    title: 'AI İş Akışı Tasarımı',
    desc: 'Tekrarlanabilir iş akışları, otomasyon zincirleri ve AI odaklı ürün geliştirme süreçleri.',
  },
]

export default async function AIFactoryPage() {
  const methods = await getAllMethods()

  return (
    <>
      <section className='bg-hero ambient-spotlight bg-noise light-leak relative overflow-hidden border-b border-white/5'>
        <Container className='relative py-24 sm:py-32 lg:py-40 z-10'>
          <div className='max-w-3xl'>
            <ScrollReveal>
              <Badge variant='accent' className='mb-6'>AI Factory v1.0</Badge>
              <h1 className='text-display-md sm:text-display-lg font-bold tracking-tight text-white'>
                TEKRARLANABİLİR AI ÜRÜN GELİŞTİRME SİSTEMİ.
              </h1>
              <p className='mt-6 text-body-lg text-white/60 max-w-2xl'>
                Ajan mühendisliği (agent engineering), prompt sistemleri ve AI iş akışı tasarımıyla
                fikirlerinizi haftalar değil, günler içinde üretime taşıyın.
              </p>
              <div className='mt-10 flex flex-col sm:flex-row gap-4'>
                <Button asChild size='xl' variant='primary'>
                  <Link href='/portfolyo'>
                    Vaka Analizlerini İncele <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button asChild size='xl' variant='outline' className='border-white/20 text-white hover:bg-white/10'>
                  <Link href='/yazilar'>Yazıları Oku</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className='relative overflow-hidden bg-background ambient-glow-left section-divider-glow'>
        <Container className='py-24 sm:py-32'>
          <ScrollReveal>
            <Badge variant='outline' className='mb-4'>Sistem</Badge>
          </ScrollReveal>

          <div className='grid gap-16 lg:grid-cols-2 lg:gap-24 items-start'>
            <ScrollReveal>
              <div className='space-y-8'>
                <div className='space-y-4'>
                  <h2 className='text-display-sm font-bold tracking-tight'>AI Factory Sistemi</h2>
                  <p className='text-heading-md font-semibold text-muted-foreground'>Teoriden Uygulamaya Uzanan Bir Ürün Sistemi</p>
                </div>

                <p className='text-body-lg text-muted-foreground max-w-md leading-relaxed'>
                  AI Factory; teorik çerçevelerden değil, üretimde test edilmiş ve tekrar kullanılabilir
                  AI ürün geliştirme süreçlerinden oluşur.
                </p>

                <div className='space-y-5 pt-2'>
                  {systemFeatures.map((feat, i) => (
                    <div key={i} className='flex items-start gap-4 group'>
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 transition-transform group-hover:scale-105'>
                        <feat.icon className='h-5 w-5' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold leading-tight'>{feat.title}</h3>
                        <p className='text-sm text-muted-foreground mt-1 leading-relaxed'>{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className='rounded-2xl border border-border bg-card p-8 lg:p-10 card-glow lg:sticky lg:top-24'>
                <h3 className='text-heading-md font-semibold mb-6 tracking-tight'>Neler İçerir?</h3>
                <ul className='space-y-3'>
                  {methods.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={'/metotlar/' + m.slug}
                        className='group flex items-center justify-between rounded-xl border border-border/60 bg-background p-4 transition-all duration-300 hover:border-brand-300/30 dark:hover:border-brand-700/30 hover:-translate-y-0.5'
                      >
                        <div>
                          <p className='font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{m.title}</p>
                          <p className='text-sm text-muted-foreground mt-0.5'>{m.tagline}</p>
                        </div>
                        <ArrowRight className='h-4 w-4 text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-1 transition-all' />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className='relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette border-y border-white/5'>
        <Container className='relative py-24 sm:py-32 z-10'>
          <ScrollReveal>
            <div className='max-w-2xl mx-auto text-center'>
              <h2 className='text-heading-xl font-bold tracking-tight text-white'>AI Factory İle Çalışmaya Hazır Mısınız?</h2>
              <p className='mt-4 text-body-lg text-white/60'>
                Mevcut ürününüze AI eklemek veya sıfırdan bir AI sistemi kurmak için
                ihtiyacınıza uygun yol haritasını birlikte oluşturun.
              </p>
              <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
                <Button asChild size='lg' variant='primary'>
                  <Link href='/iletisim'>Projeni Anlat</Link>
                </Button>
                <Button asChild size='lg' variant='outline' className='border-white/20 text-white hover:bg-white/10'>
                  <Link href='/hakkinda'>Beni Tanı</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
