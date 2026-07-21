import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArticleCard } from '@/components/cards/article-card'
import { getAllArticles, getAllMethods, getAllProjects } from '@/lib/content'
import { NewsletterForm } from '@/components/forms/newsletter-form'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ArrowRight, BookOpen, Cpu, Settings, Check } from 'lucide-react'

export default async function Home() {
  const [articles, methods, projects] = await Promise.all([
    getAllArticles(),
    getAllMethods(),
    getAllProjects(),
  ])

  const latestArticles = articles.slice(0, 3)
  const featuredProject = projects[0]
  const otherProjects = projects.slice(1, 3)
  const latestMethod = methods[0]

  const systemPillars = [
    { icon: Cpu, label: 'Agent Engineering', desc: 'LLM orchestration, tool calling, memory systems', href: '/ai-factory' },
    { icon: BookOpen, label: 'Prompt Systems', desc: 'Evaluation pipelines, production templates', href: '/ai-factory' },
    { icon: Settings, label: 'AI Workflow Design', desc: 'Tekrarlanabilir is akislari, otomasyon', href: '/ai-factory' },
  ]

  return (
    <>
      {/* Hero — Power. Volumetric light, ambient glow, light leak. */}
      <section className='bg-hero ambient-spotlight bg-noise light-leak relative overflow-hidden border-b border-border/50'>
        <div className='float-orb float-orb-1' />
        <div className='float-orb float-orb-2' />
        <Container className='relative py-28 sm:py-36 lg:py-48 z-10'>
          <div className='grid gap-12 lg:grid-cols-2 lg:gap-20 items-center'>
            <ScrollReveal>
              <div className='max-w-xl'>
                <Badge variant='accent' className='mb-6'>AI Product Developer</Badge>
                <h1 className='text-display-md sm:text-display-lg font-bold tracking-tight leading-tight text-white'>
                  AI sistemleri kuran,<br />
                  <span className='text-brand-400'>urun gelistiren</span> biri.
                </h1>
                <p className='mt-6 text-body-lg text-white/60'>
                  Agent engineering, prompt systems ve AI workflow tasariminda uzmanlasmis 
                  bir urun gelistirici. AI Factory kurucusu.
                </p>
                <div className='mt-10 flex flex-col sm:flex-row gap-4'>
                  <Button asChild size='xl' variant='primary'>
                    <Link href='/ai-factory'>
                      AI Factory&apos;yi Kesfet <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                  <Button asChild size='xl' variant='outline' className='border-white/20 text-white hover:bg-white/10'>
                    <Link href='/portfolyo'>Projeleri Gor</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className='rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-sm'>
                <p className='text-sm font-medium text-white/40 mb-5 uppercase tracking-wider'>Uzmanlik Alanlari</p>
                <div className='space-y-5'>
                  {systemPillars.map((pillar, i) => (
                    <Link
                      key={i}
                      href={pillar.href}
                      className='group flex items-start gap-4 rounded-xl p-3 -mx-3 hover:bg-white/5 transition-colors'
                    >
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400'>
                        <pillar.icon className='h-5 w-5' />
                      </div>
                      <div className='min-w-0'>
                        <p className='font-medium text-white group-hover:text-brand-400 transition-colors'>{pillar.label}</p>
                        <p className='text-sm text-white/50 mt-0.5'>{pillar.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className='mt-6 pt-5 border-t border-white/10'>
                  <Link href='/ai-factory' className='text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors'>
                    AI Factory hakkinda daha fazla bilgi al &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Stats — Confidence. Deep background, subtle top glow. */}
      <section className='bg-atmosphere-deep ambient-glow-top relative overflow-hidden border-b border-white/5'>
        <Container>
          <div className='grid grid-cols-3 gap-8 py-10'>
            {[
              { value: '50+', label: 'AI workflow' },
              { value: '3', label: 'Dijital urun' },
              { value: '2,000+', label: 'Newsletter okuyucu' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className='text-center'>
                  <p className='text-display-sm font-bold text-white'>{stat.value}</p>
                  <p className='text-sm text-white/50 mt-1'>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio — Proof. Ambient glow, vignette. */}
      {featuredProject && (
        <section className='relative overflow-hidden bg-background vignette-light border-b border-border/50'>
          <Container className='py-24 sm:py-32'>
            <ScrollReveal>
              <div className='text-center mb-16'>
                <Badge variant='outline' className='mb-4'>Son Proje</Badge>
                <h2 className='text-heading-xl font-bold tracking-tight'>Uzerinde calistigim son is</h2>
                <p className='mt-4 text-body-lg text-muted-foreground max-w-xl mx-auto'>
                  Her proje bir sonrakinin temeli. Is en son cikti.
                </p>
              </div>
            </ScrollReveal>

            <div className='grid gap-8 lg:grid-cols-5'>
              <ScrollReveal delay={100} className='lg:col-span-3'>
                <Link href={'/portfolyo/' + featuredProject.slug} className='group block'>
                  <div className='rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 card-glow'>
                    <div className='p-8 lg:p-10'>
                      <p className='text-sm text-muted-foreground mb-3'>{featuredProject.year} &middot; {featuredProject.client}</p>
                      <h3 className='text-heading-lg font-bold tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{featuredProject.title}</h3>
                      <p className='mt-3 text-muted-foreground'>{featuredProject.tagline}</p>
                      <div className='mt-6 flex flex-wrap gap-2'>
                        {featuredProject.tags.map((t) => (
                          <span key={t} className='inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium'>{t}</span>
                        ))}
                      </div>
                      <div className='mt-6 text-sm font-medium text-brand-600 dark:text-brand-400'>
                        Case Study&apos;i Incele &rarr;
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={200} className='lg:col-span-2 space-y-4'>
                {otherProjects.map((p) => (
                  <Link key={p.slug} href={'/portfolyo/' + p.slug} className='group block'>
                    <div className='rounded-xl border border-border bg-card p-5 transition-all duration-300 card-glow'>
                      <p className='text-xs text-muted-foreground mb-1'>{p.year}</p>
                      <p className='font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{p.title}</p>
                      <p className='text-sm text-muted-foreground mt-1 line-clamp-1'>{p.tagline}</p>
                    </div>
                  </Link>
                ))}
                <Link href='/portfolyo' className='block rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground hover:text-foreground hover:border-solid transition-all'>
                  Tum projeleri gor &rarr;
                </Link>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      )}

      {/* AI Factory — Innovation. Warm muted, ambient left glow. */}
      {latestMethod && (
        <section className='relative overflow-hidden bg-muted/30 ambient-glow-left section-divider-glow border-y border-border/50'>
          <Container className='py-24 sm:py-32'>
            <div className='grid gap-12 lg:grid-cols-2 lg:gap-20 items-center'>
              <ScrollReveal>
                <div>
                  <Badge variant='accent' className='mb-4'>AI Factory</Badge>
                  <h2 className='text-heading-xl font-bold tracking-tight'>Hazir sistemlerle basla</h2>
                  <p className='mt-4 text-body-lg text-muted-foreground'>
                    AI Factory, teoriden degil, calisan sistemlerden olusur. 
                    Her biri uretimde test edilmis, tekrarlanabilir AI urun bilesenleri.
                  </p>
                  <div className='mt-8 space-y-3'>
                    {methods.slice(0, 3).map((m, i) => (
                      <Link
                        key={m.slug}
                        href={'/ai-factory/' + m.slug}
                        className='group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-all duration-300 card-glow'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 text-xs font-bold'>
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <p className='font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors'>{m.title}</p>
                            <p className='text-sm text-muted-foreground'>{m.tagline}</p>
                          </div>
                        </div>
                        <ArrowRight className='h-4 w-4 text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-all' />
                      </Link>
                    ))}
                  </div>
                  <div className='mt-6'>
                    <Button asChild variant='outline'>
                      <Link href='/ai-factory'>AI Factory&apos;nin Tumunu Gor</Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className='rounded-2xl border border-border bg-card p-8 lg:p-10 card-glow'>
                  <h3 className='text-heading-md font-semibold mb-6'>AI Factory System icerir:</h3>
                  <ul className='space-y-4'>
                    <li className='flex gap-3'>
                      <Check className='mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400' />
                      <div><p className='font-medium'>Agent Engineering Framework</p><p className='text-sm text-muted-foreground'>Tool calling, memory, multi-agent orchestration</p></div>
                    </li>
                    <li className='flex gap-3'>
                      <Check className='mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400' />
                      <div><p className='font-medium'>Prompt Engineering Kit</p><p className='text-sm text-muted-foreground'>100+ optimize edilmis prompt, evaluation pipelines</p></div>
                    </li>
                    <li className='flex gap-3'>
                      <Check className='mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400' />
                      <div><p className='font-medium'>AI Workflow Templates</p><p className='text-sm text-muted-foreground'>30+ calisir durumda is akisi, Notion &amp; Markdown</p></div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      )}

      {/* Articles — Learning. Clean, warm neutral. */}
      {latestArticles.length > 0 && (
        <section className='relative overflow-hidden bg-background border-b border-border/50'>
          <Container className='py-24 sm:py-32'>
            <ScrollReveal>
              <div className='text-center mb-16'>
                <Badge variant='outline' className='mb-4'>Yazilar</Badge>
                <h2 className='text-heading-xl font-bold tracking-tight'>AI uzerine pratik makaleler</h2>
                <p className='mt-4 text-body-lg text-muted-foreground max-w-xl mx-auto'>
                  Agent engineering, prompt sistemleri ve AI workflow tasarimi uzerine teknik yazilar.
                </p>
              </div>
            </ScrollReveal>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {latestArticles.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 100}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={300}>
              <div className='mt-12 text-center'>
                <Button asChild variant='outline'>
                  <Link href='/yazilar'>Tum Yazilari Gor</Link>
                </Button>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* About — Human. Dark studio atmosphere. */}
      <section className='relative overflow-hidden bg-atmosphere-studio ambient-spotlight bg-noise border-y border-white/5'>
        <Container className='py-24 sm:py-32'>
          <div className='grid gap-12 lg:grid-cols-5 items-center'>
            <ScrollReveal className='lg:col-span-3'>
              <div>
                <Badge variant='outline' className='mb-4 border-white/10 text-white/60'>Hakkimda</Badge>
                <h2 className='text-heading-xl font-bold tracking-tight text-white'>AI urun gelistirici. Sistem kurucu. AI Factory.</h2>
                <p className='mt-4 text-body-lg text-white/60'>
                  LLM tabanli urunler, agent orchestration sistemleri ve tekrarlanabilir AI workflow&apos;lari 
                  kuruyorum. AI Factory bu birikimin markalismis hali.
                </p>
                <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                  <Button asChild variant='primary'>
                    <Link href='/hakkinda'>Detayli Bilgi</Link>
                  </Button>
                  <Button asChild variant='outline' className='border-white/20 text-white hover:bg-white/10'>
                    <Link href='/iletisim'>Iletisime Gec</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className='lg:col-span-2'>
              <div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm'>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm'>BU</div>
                  <div>
                    <p className='font-medium text-white'>Burak Unluer</p>
                    <p className='text-sm text-white/50'>AI Factory Kurucusu</p>
                  </div>
                </div>
                <div className='mt-5 space-y-2 text-sm'>
                  <div className='flex justify-between'><span className='text-white/40'>Konum</span><span className='text-white/70'>Istanbul, Turkiye</span></div>
                  <div className='flex justify-between'><span className='text-white/40'>Odak</span><span className='text-white/70'>AI Urun Gelistirme</span></div>
                  <div className='flex justify-between'><span className='text-white/40'>Deneyim</span><span className='text-white/70'>2019&apos;dan beri</span></div>
                </div>
                <div className='mt-5 pt-4 border-t border-white/10 flex gap-4'>
                  <a href='https://github.com/brkunluer' target='_blank' rel='noopener noreferrer' className='text-sm text-white/40 hover:text-white transition-colors'>GitHub</a>
                  <a href='https://twitter.com/brkunluer' target='_blank' rel='noopener noreferrer' className='text-sm text-white/40 hover:text-white transition-colors'>Twitter</a>
                  <a href='https://linkedin.com/in/brkunluer' target='_blank' rel='noopener noreferrer' className='text-sm text-white/40 hover:text-white transition-colors'>LinkedIn</a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Newsletter — Belonging. Ambient center glow. */}
      <section className='relative overflow-hidden bg-background ambient-glow-center border-b border-border/50'>
        <Container size='narrow' className='py-24 sm:py-32'>
          <ScrollReveal>
            <div className='text-center'>
              <Badge variant='outline' className='mb-4'>Newsletter</Badge>
              <h2 className='text-heading-xl font-bold tracking-tight'>Haftalik AI workflow rehberleri</h2>
              <p className='mt-4 text-body-lg text-muted-foreground'>
                Her Pazartesi: prompt sablonlari, agent engineering ipuclari, AI Factory guncellemeleri.
              </p>
              <NewsletterForm className='mt-8' />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
