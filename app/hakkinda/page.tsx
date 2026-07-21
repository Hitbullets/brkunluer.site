import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Grid } from '@/components/layout/container';
import { SectionHero } from '@/components/layout/hero';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SiteConfig } from '@/lib/site'
import { Mail, Calendar, Lightbulb, Zap, Code, Users } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/hakkinda' },
  title: 'Hakkımda',
  description: SiteConfig.author.bio,
}

const expertise = [
  { icon: Zap, title: 'AI Workflow Design', desc: 'LLM tabanlı üretkenlik sistemleri, prompt engineering frameworks, agent orchestration.' },
  { icon: Code, title: 'Digital Product Development', desc: 'MVP\'den üretime, Next.js, TypeScript, modern web stack ile hızlı iterasyon.' },
  { icon: Lightbulb, title: 'Prompt Engineering Systems', desc: 'Sistematik prompt tasarımı, evaluation pipelines, production-ready prompt templates.' },
  { icon: Users, title: 'Automation Engineering', desc: 'No-code/low-code otomasyonlar, API entegrasyonları, veri pipeline\'ları.' },
  { icon: Calendar, title: 'Technical Content & Education', desc: 'Teknik yazılar, rehberler, workshop\'lar - karmaşık konuları erişilebilir kılmak.' },
]

const journey = [
  { year: '2024', title: 'AI Product Builder', desc: 'Kendi dijital ürünlerini (metotlar) geliştirip satışa sunmaya başladım. Newsletter 2000+ aboneye ulaştı.', icon: Lightbulb },
  { year: '2023', title: 'Senior AI Engineer', desc: 'LLM tabanlı ürünler, RAG sistemleri, prompt optimization üzerine odaklandım.', icon: Zap },
  { year: '2021', title: 'Full Stack Developer', desc: 'SaaS ürünleri, dashboard\'lar, API\'ler geliştirdim. TypeScript/Next.js ekosistemi.', icon: Code },
  { year: '2019', title: 'Software Engineer', desc: 'İlk profesyonel deneyim. Backend sistemleri, veritabanı tasarımı, mikroservisler.', icon: Calendar },
]

const values = [
  { title: 'Ship Fast, Learn Faster', desc: 'Mükemmeliyetçilik yerine iterasyon. Küçük başla, hızla test et, veriyle iyileştir.' },
  { title: 'Systems Over Goals', desc: 'Hedefler yön verir, sistemler ilerleme sağlar. Tekrarlanabilir süreçler kur.' },
  { title: 'Compound Knowledge', desc: 'Her proje bir sonrakinin temel taşı. Not al, belgele, paylaş. Bilgi birikimi büyür.' },
]

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-studio ambient-spotlight bg-noise border-b border-white/5"><Container className="py-16 sm:py-20 lg:py-24">
      <SectionHero
        badge='About'
        title='Hakkımda'
        subtitle={SiteConfig.author.bio}
      />

      <section className='mt-24'>
        <h2 className='text-heading-lg font-semibold mb-8'>Uzmanlık Alanları</h2>
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={6}>
          {expertise.map((item, index) => (
            <Card key={index} variant='feature' className='h-full'>
              <CardHeader>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mb-4'>
                  <item.icon className='h-6 w-6' />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>

      <section className='mt-24'>
        <h2 className='text-heading-lg font-semibold mb-8'>Yolculuk</h2>
        <div className='relative'>
          <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-border' />
          {journey.map((item, index) => (
            <div key={index} className='relative pl-20 pb-12 last:pb-0'>
              <div className='absolute left-8 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 border-4 border-background' />
              <div className='text-sm text-muted-foreground mb-1'>{item.year}</div>
              <h3 className='text-heading-sm font-semibold'>{item.title}</h3>
              <p className='text-muted-foreground mt-1'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-24'>
        <h2 className='text-heading-lg font-semibold mb-8'>Değerler</h2>
        <Grid cols={{ sm: 1, md: 3 }} gap={6}>
          {values.map((item, index) => (
            <Card key={index} variant='feature'>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>

      <section className='mt-24'>
        <h2 className='text-heading-lg font-semibold mb-8'>İletişim</h2>
        <div className='grid md:grid-cols-2 gap-6 max-w-3xl'>
          <Card variant='feature'>
            <CardHeader>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mb-3'>
                <Mail className='h-6 w-6' />
              </div>
              <CardTitle>E-posta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-4'>Proje teklifleri, sorular veya işbirlişi için:</p>
              <Button asChild variant='primary'>
                <a href={'mailto:' + SiteConfig.author.email}>{SiteConfig.author.email}</a>
              </Button>
            </CardContent>
          </Card>
          <Card variant='feature'>
            <CardHeader>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mb-3'>
                <Calendar className='h-6 w-6' />
              </div>
              <CardTitle>Randevu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-4'>Kısa bir sohbet için 30 dakikalık bir slot ayırın:</p>
              <Button asChild variant='outline'>
                <Link href='/iletisim'>İletişim Formu</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Container></section>
  )
}
