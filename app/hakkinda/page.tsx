import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Grid } from '@/components/layout/container';
import { SectionHero } from '@/components/layout/hero';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SiteConfig } from '@/lib/site'
import { Mail, Calendar, Lightbulb, Zap, Code, Users, Workflow } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/hakkinda' },
  title: 'Hakkımda',
  description: SiteConfig.author.bio,
}

const expertise = [
  { icon: Zap, title: 'Yapay Zekâ Destekli Ürünler', desc: 'Fikirleri üretken yapay zekâ araçlarıyla çalışan ve test edilebilir ürünlere dönüştürmek.' },
  { icon: Workflow, title: 'Prompt Engineering ve AI Workflow', desc: 'Doğru soruları, araçları ve üretim adımlarını bir araya getiren etkili iş akışları tasarlamak.' },
  { icon: Lightbulb, title: 'SaaS ve Startup Fikirleri', desc: 'Problemleri analiz ederek sade, kullanılabilir ve değer üreten ürün fikirleri geliştirmek.' },
  { icon: Users, title: 'Otomasyon Sistemleri', desc: 'Tekrarlanan işleri azaltan, süreçleri hızlandıran ve araçları birbirine bağlayan sistemler kurmak.' },
  { icon: Code, title: 'Modern Web Uygulamaları', desc: 'Next.js ve modern web teknolojileriyle hızlı, erişilebilir ve üretime hazır uygulamalar geliştirmek.' },
  { icon: Calendar, title: 'Ürün Tasarımı ve Deneyim', desc: 'Çözümü sadeleştirerek kullanıcıların gerçekten kullanmak isteyeceği deneyimler oluşturmak.' },
]

const aboutParagraphs = [
  'Tek bir unvanla kendimi tanımlamayı tercih etmiyorum. Çünkü ilgimi çeken şey yalnızca yazılım geliştirmek değil; fikirleri sorgulamak, problemleri analiz etmek ve insanların gerçekten kullanmak isteyeceği dijital ürünler ortaya çıkarmak.',
  'Yapay zekâ, otomasyon ve modern web teknolojilerini kullanarak fikirleri mümkün olan en kısa sürede çalışan prototiplere dönüştürmeyi seviyorum. Benim için geliştirme süreci yalnızca kod yazmaktan ibaret değil; doğru problemi bulmak, çözümü sadeleştirmek ve kullanıcı deneyimini sürekli iyileştirmek de bu sürecin önemli bir parçası.',
  'Üretken yapay zekâ araçlarının gelişmesiyle birlikte ürün geliştirme yaklaşımım da değişti. Güçlü bir ürün oluşturmanın yalnızca teknik bilgiyle değil; doğru soruları sormak, doğru araçları seçmek ve etkili bir üretim süreci tasarlamakla mümkün olduğuna inanıyorum.',
]

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-studio ambient-spotlight bg-noise border-b border-white/5"><Container className="py-16 sm:py-20 lg:py-24">
      <SectionHero
        badge='Hakkımda'
        title='Ben Kimim?'
        subtitle='Merhaba, ben Burak Ünlüler.'
      />

      <section className='mt-16 max-w-3xl space-y-6 text-body-lg leading-relaxed text-muted-foreground'>
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

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

      <section className='mt-24 max-w-3xl'>
        <h2 className='text-heading-lg font-semibold mb-6'>Bu Site Neden Var?</h2>
        <div className='space-y-6 text-body-lg leading-relaxed text-muted-foreground'>
          <p>
            Bu web sitesi yalnızca tamamlanmış projelerimi sergilediğim bir portfolyo değil. Aynı zamanda öğrenme sürecimi, araştırmalarımı, geliştirdiğim sistemleri ve zaman içinde edindiğim deneyimleri paylaştığım yaşayan bir bilgi arşivi.
          </p>
          <p>
            Burada bazen bir proje geliştirme sürecini, bazen üretken yapay zekâ ile ilgili keşiflerimi, bazen de işime yarayan araçları ve çalışma yöntemlerini bulabilirsiniz.
          </p>
          <p>
            Amacım yalnızca ürün geliştirmek değil; öğrendiklerimi açık ve anlaşılır şekilde paylaşarak başkalarının da daha hızlı üretmesine katkı sağlamak. Teknoloji, yapay zekâ ve ürün geliştirme üzerine konuşmayı seviyorsanız, doğru yerdesiniz.
          </p>
        </div>
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
