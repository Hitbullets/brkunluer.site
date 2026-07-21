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
  description: 'Tekrarlanabilir AI urun gelistirme sistemi. Agent engineering, prompt systems ve AI workflow.',
}

const systemFeatures = [
  {
    icon: Settings,
    title: 'Agent Engineering',
    desc: 'LLM tabanli agent orchestration sistemleri, tool calling pipelines, memory management.',
  },
  {
    icon: BookOpen,
    title: 'Prompt Systems',
    desc: 'Sistematik prompt tasarimi, evaluation pipelines, production-ready template frameworks.',
  },
  {
    icon: Cpu,
    title: 'AI Workflow Design',
    desc: 'Tekrarlanabilir is akislari, otomasyon zincirleri, AI-native product surecleri.',
  },
]

export default async function AIFactoryPage() {
  const methods = await getAllMethods()

  return (
    <>
      {/* Hero - Innovation */}
      <section className='bg-hero ambient-spotlight bg-noise light-leak relative overflow-hidden border-b border-white/5'>
        <div className='float-orb float-orb-1' />
        <Container className='relative py-24 sm:py-32 lg:py-40 z-10'>
          <div className='max-w-3xl'>
            <ScrollReveal>
              <Badge variant='accent' className='mb-6'>AI Factory v1.0</Badge>
              <h1 className='text-display-md sm:text-display-lg font-bold tracking-tight text-white'>
                Tekrarlanabilir AI urun gelistirme sistemi.
              </h1>
              <p className='mt-6 text-body-lg text-white/60 max-w-2xl'>
                Agent engineering, prompt systems ve AI workflow tasarimi ile fikirlerini haftalar 
                degil, gunler icinde uretime tasi.
              </p>
              <div className='mt-10 flex flex-col sm:flex-row gap-4'>
                <Button asChild size='xl' variant='primary'>
                  <Link href='/portfolyo'>
                    Case Study&apos;leri Incele <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button asChild size='xl' variant='outline' className='border-white/20 text-white hover:bg-white/10'>
                  <Link href='/yazilar'>Yazilari Oku</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* System Overview - Innovation. Left-aligned editorial hierarchy. */}
      <section className='relative overflow-hidden bg-background ambient-glow-left section-divider-glow'>
        <Container className='py-24 sm:py-32'>
          <ScrollReveal>
            <Badge variant='outline' className='mb-4'>Sistem</Badge>
          </ScrollReveal>

          <div className='grid gap-16 lg:grid-cols-2 lg:gap-24 items-start'>
            {/* Left column: stacked hierarchy �?" label, heading, intro, features */}
            <ScrollReveal>
              <div className='space-y-8'>
                <div>
                  <div className="space-y-4">
                  <h2 className="text-display-sm font-bold tracking-tight">AI FACTORY</h2>
                  <p className="text-heading-md font-semibold text-muted-foreground">Metodoloji Degil. Yasayan Bir Sistemdir.</p>
                </div>
                </div>

                <p className='text-body-lg text-muted-foreground max-w-md leading-relaxed'>
                  AI Factory, teorik cerceveler degil, uretimde test edilmis, tekrarlanabilir 
                  AI urun gelistirme sureclerinden olusur.
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

            {/* Right column: Neler Icerir card */}
            <ScrollReveal delay={150}>
              <div className='rounded-2xl border border-border bg-card p-8 lg:p-10 card-glow lg:sticky lg:top-24'>
                <h3 className='text-heading-md font-semibold mb-6 tracking-tight'>Neler Icerir?</h3>
                <ul className='space-y-3'>
                  {methods.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={'/ai-factory/' + m.slug}
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

      {/* CTA - Action */}
      <section className='relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette border-y border-white/5'>
        <Container className='relative py-24 sm:py-32 z-10'>
          <ScrollReveal>
            <div className='max-w-2xl mx-auto text-center'>
              <h2 className='text-heading-xl font-bold tracking-tight text-white'>AI Factory ile calismaya hazir misin?</h2>
              <p className='mt-4 text-body-lg text-white/60'>
                İster mevcut ürününe AI entegre etmek, ister sıfırdan bir AI sistemi kurmak iste; 
                AI Factory sana ozel bir yol haritasi sunar.
              </p>
              <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
                <Button asChild size='lg' variant='primary'>
                  <Link href='/iletisim'>Projeni Anlat</Link>
                </Button>
                <Button asChild size='lg' variant='outline' className='border-white/20 text-white hover:bg-white/10'>
                  <Link href='/hakkinda'>Beni Tani</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
