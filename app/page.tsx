import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ModuleCover } from '@/components/ui/editorial-graphics'
import { ArticleCard } from '@/components/cards/article-card'
import { ScrollProcess, ScrollReveal, ScrollScene, TiltCard } from '@/components/home/scroll-motion'
import { getAllArticles, getAllMethods, getAllProjects } from '@/lib/content'

const processSteps = [
  { number: '01', title: 'Süreci haritala', text: 'Tekrarlanan işi, girdi ve çıktılarıyla görünür hâle getir.' },
  { number: '02', title: 'Kontrol noktasını seç', text: 'Hangi kararın insanda kalacağını ve AI adımının sınırını belirle.' },
  { number: '03', title: 'Prototipi dene', text: 'İzinli örnek veya sentetik veriyle akışı ve varsayımları sınayalım.' },
  { number: '04', title: 'Ekibe devret', text: 'Kısa rehber ve devir oturumuyla sonraki adımı anlaşılır kıl.' },
]

const expertise: Array<[string, string, string]> = [
  ['01', 'AI ürün geliştirme', 'Ürün problemini, model davranışını ve arayüzü tek bir üretim akışında buluşturma.'],
  ['02', 'Ajan mühendisliği', 'Araçları, görevleri ve insan onayını izlenebilir adımlara bağlama.'],
  ['03', 'Prompt sistemleri', 'Tek seferlik komutları sınanabilir ve tekrar kullanılabilir yapılara dönüştürme.'],
  ['04', 'İş akışı tasarımı', 'Girdiyi, kararı, kontrolü ve çıktıyı birlikte tanımlama.'],
]

const modules = ['agent', 'prompt', 'evaluation', 'workflow'] as const

export default async function Home() {
  const [articles, methods, projects] = await Promise.all([getAllArticles(), getAllMethods(), getAllProjects()])
  const featuredProject = projects[0]
  const moreProjects = projects.slice(1, 3)

  return (
    <div className='motion-home'>
      <ScrollScene className='motion-hero'>
        <div className='motion-hero-pin'>
          <Container className='motion-hero-layout'>
            <div className='motion-hero-copy'>
              <p className='motion-kicker'><span className='motion-kicker-dot' />AI İŞ AKIŞI STÜDYOSU / ESKİŞEHİR</p>
              <h1>Bir işi seç.<br /><span>Akışını kur.</span></h1>
              <p className='motion-hero-summary'>Ekibinizin tekrar ettiği tek bir iş adımını haritalıyor, insan onayı olan küçük bir AI prototipine dönüştürüyorum.</p>
              <div className='motion-hero-actions'>
                <Link href='/ai-is-akisi-sprinti#fiyat' className='motion-button motion-button-primary'>3 günlük sprinti gör <ArrowRight aria-hidden='true' /></Link>
                <Link href='/portfolyo' className='motion-text-link'>Projeleri incele <ArrowUpRight aria-hidden='true' /></Link>
              </div>
              <div className='motion-hero-meta'>
                <span>3 iş günü</span><span>Tek süreç</span><span>İnsan onayı</span>
              </div>
              <p className='motion-scroll-cue'><span aria-hidden='true' />Kaydır, akışın nasıl kurulduğunu gör</p>
            </div>

            <figure className='motion-hero-diagram' aria-label='Temsili AI iş akışı: talep, AI taslağı, insan kontrolü ve sonuç'>
              <figcaption className='motion-diagram-heading'>
                <span>AKIŞ HARİTASI / 01</span>
                <span>ÖRNEK · TEMSİLİ</span>
              </figcaption>
              <div className='motion-diagram-board' aria-hidden='true'>
                <div className='motion-board-grid' />
                <div className='motion-board-axis motion-board-axis-x' />
                <div className='motion-board-axis motion-board-axis-y' />
                <div className='motion-wire motion-wire-a' />
                <div className='motion-wire motion-wire-b' />
                <div className='motion-wire motion-wire-c' />
                <div className='motion-hub'>AI</div>
                <div className='motion-flow-node motion-flow-input'><small>GİRDİ</small><strong>İş talebi</strong><span>brief / veri</span></div>
                <div className='motion-flow-node motion-flow-draft'><small>AI ADIMI</small><strong>İlk taslak</strong><span>sınırlı üretim</span></div>
                <div className='motion-flow-node motion-flow-review'><small>KONTROL</small><strong>İnsan onayı</strong><span>karar ekipte</span></div>
                <div className='motion-flow-node motion-flow-output'><small>ÇIKTI</small><strong>Net sonuç</strong><span>devir rehberi</span></div>
              </div>
              <div className='motion-diagram-foot'>
                <span>GİRDİ <b>→</b> İŞLEM <b>→</b> KONTROL <b>→</b> ÇIKTI</span>
                <span className='motion-diagram-mark'>BÜ / SYSTEMS</span>
              </div>
            </figure>
          </Container>
        </div>
      </ScrollScene>

      <section className='motion-signal-strip' aria-label='Sprint teslimat özeti'>
        <Container className='motion-signal-grid'>
          <p><span>01</span> Süreç haritası</p>
          <p><span>02</span> AI prototipi</p>
          <p><span>03</span> Devir rehberi</p>
          <Link href='/ai-is-akisi-sprinti'>Sprintin tamamını gör <ArrowRight aria-hidden='true' /></Link>
        </Container>
      </section>

      <ScrollProcess className='motion-process' stepCount={processSteps.length}>
        <div className='motion-process-pin'>
          <Container className='motion-process-layout'>
            <div className='motion-process-copy'>
              <ScrollReveal className='motion-process-intro'>
                <p className='motion-section-index'>NASIL ÇALIŞIR / 4 ADIM</p>
                <h2>Küçük bir pilot.<br /><span>Net karar noktaları.</span></h2>
                <p>Akışın her bölümünde neyin otomatikleştiği, neyin insanda kaldığı görünür olur.</p>
              </ScrollReveal>
              <div className='motion-process-list'>
                {processSteps.map((step, index) => (
                  <article className='motion-process-row' key={step.number} data-process-index={index}>
                    <span className='motion-process-number'>{step.number}</span>
                    <div><h3>{step.title}</h3><p>{step.text}</p></div>
                    <span className='motion-process-state' aria-hidden='true'>↗</span>
                  </article>
                ))}
              </div>
            </div>
            <div className='motion-process-visual' aria-hidden='true'>
              <div className='motion-model-caption'><span>İŞ AKIŞI / 01</span><span>SCROLL TO TRACE</span></div>
              <div className='motion-process-model'>
                <div className='motion-model-plane' />
                <div className='motion-model-rail' />
                <div className='motion-model-step motion-model-step-one'><span>01</span><strong>HARİTA</strong><small>GİRDİ + ÇIKTI</small></div>
                <div className='motion-model-step motion-model-step-two'><span>02</span><strong>KONTROL</strong><small>İNSAN NOKTASI</small></div>
                <div className='motion-model-step motion-model-step-three'><span>03</span><strong>PROTOTİP</strong><small>ÖRNEK VERİ</small></div>
                <div className='motion-model-step motion-model-step-four'><span>04</span><strong>DEVİR</strong><small>EKİP REHBERİ</small></div>
                <div className='motion-model-center'>AKIŞ<br />01</div>
              </div>
              <div className='motion-model-progress'><span /></div>
              <p className='motion-model-note'>Otomasyon öneridir. Son karar ekipte kalır.</p>
            </div>
          </Container>
        </div>
      </ScrollProcess>

      <section className='motion-offer-section' id='sprint'>
        <Container className='motion-offer-layout'>
          <ScrollReveal className='motion-offer-copy'>
            <p className='motion-section-index'>ÜRÜNLEŞTİRİLMİŞ HİZMET / TEK SÜREÇ</p>
            <h2>Önce küçük bir işi çalışır hâle getirelim.</h2>
            <p>Ücretsiz 20 dakikalık görüşmede uygun bir süreç seçelim. Uygunsa kapsamı, teslimatları ve vergi koşulunu yazılı netleştirelim.</p>
            <Link href='/ai-is-akisi-sprinti#teslimatlar' className='motion-text-link'>Teslimatları incele <ArrowRight aria-hidden='true' /></Link>
          </ScrollReveal>
          <ScrollReveal className='motion-offer-card' delay={120}>
            <div className='motion-offer-card-top'><span>AI İŞ AKIŞI SPRINTİ</span><span>01 / 01</span></div>
            <h3>3 günlük pilot</h3>
            <p className='motion-offer-card-description'>Tek süreç. Bir prototip. İnsan kontrolü ve devir rehberi.</p>
            <div className='motion-offer-price'>₺9.900 <span>başlangıç</span></div>
            <p className='motion-offer-disclaimer'>Başlangıç önerisidir. Vergi kapsamı ve kesin fiyat yazılı teklifte belirtilir.</p>
            <div className='motion-offer-tags'><span>Akış haritası</span><span>1 revizyon</span><span>Devir oturumu</span></div>
            <Link href='/ai-is-akisi-sprinti#fiyat' className='motion-button motion-button-dark'>Kapsam ve koşulları gör <ArrowUpRight aria-hidden='true' /></Link>
          </ScrollReveal>
        </Container>
      </section>

      {featuredProject && (
        <section className='motion-work-section'>
          <Container>
            <div className='motion-section-heading'>
              <div><p className='motion-section-index'>PROJE ARŞİVİ / SEÇKİ</p><h2>Gerçek işlerden<br /><span>öğrenilenler.</span></h2></div>
              <Link href='/portfolyo' className='motion-text-link'>Tüm projeler <ArrowUpRight aria-hidden='true' /></Link>
            </div>
            <div className='motion-project-grid'>
              <TiltCard className='motion-project-featured'>
                <Link href={'/portfolyo/' + featuredProject.slug} className='motion-project-link'>
                  <div className='motion-project-image'>
                    <Image src={featuredProject.coverImage} alt={featuredProject.title + ' proje görseli'} fill sizes='(max-width: 900px) 92vw, 62vw' />
                    <span>{String(featuredProject.year)} / {featuredProject.recordType === 'case-study' ? 'VAKA' : 'ARŞİV'}</span>
                  </div>
                  <div className='motion-project-info'><div><p>{featuredProject.tags.slice(0, 2).join(' / ')}</p><h3>{featuredProject.title}</h3><span>{featuredProject.tagline}</span></div><ArrowUpRight aria-hidden='true' /></div>
                </Link>
              </TiltCard>
              <div className='motion-project-list'>
                {moreProjects.map((project) => (
                  <TiltCard className='motion-project-small' key={project.slug}>
                    <Link href={'/portfolyo/' + project.slug} className='motion-project-link'>
                      <div className='motion-project-small-image'><Image src={project.coverImage} alt={project.title + ' proje görseli'} fill sizes='(max-width: 900px) 92vw, 32vw' /></div>
                      <div className='motion-project-info'><div><p>{project.tags.slice(0, 2).join(' / ')}</p><h3>{project.title}</h3><span>{project.tagline}</span></div><ArrowUpRight aria-hidden='true' /></div>
                    </Link>
                  </TiltCard>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className='motion-factory-section'>
        <Container className='motion-factory-layout'>
          <div className='motion-factory-intro'>
            <ScrollReveal>
              <p className='motion-section-index'>AI FACTORY / SİSTEM BİLEŞENLERİ</p>
              <h2>Birbirine bağlı parçalar.<br /><span>Tekrarlanabilir bir düzen.</span></h2>
              <p>Fikir, bağlam, ajan, değerlendirme ve iş akışını aynı üretim sisteminin parçaları olarak ele alıyorum.</p>
              <Link href='/ai-factory' className='motion-text-link'>AI Factory yaklaşımı <ArrowRight aria-hidden='true' /></Link>
            </ScrollReveal>
            {methods.length > 0 && (
              <div className='motion-method-list'>
                <p className='motion-section-index'>SİSTEM KİTAPLIĞI</p>
                {methods.slice(0, 3).map((method, index) => (
                  <Link key={method.slug} href={'/metotlar/' + method.slug}>
                    <span>0{index + 1}</span><strong>{method.title}</strong><ArrowUpRight aria-hidden='true' />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className='motion-module-grid'>
            {modules.map((variant, index) => (
              <ScrollReveal key={variant} delay={index * 70}>
                <ModuleCover variant={variant} className='motion-module-cover' />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className='motion-founder-section'>
        <Container className='motion-founder-layout'>
          <ScrollReveal className='motion-founder-image'>
            <Image src='/images/portraits/burak-portrait-close.jpeg' alt='Burak Ünlüer' fill sizes='(max-width: 900px) 90vw, 38vw' />
            <span>BURAK ÜNLÜER / PRODUCT BUILDER</span>
          </ScrollReveal>
          <ScrollReveal className='motion-founder-copy' delay={100}>
            <p className='motion-section-index'>KURUCU / ÜRETİCİ</p>
            <h2>Ürün, sistem ve deneyim arasında çalışıyorum.</h2>
            <p>Oyun sunucuları için teknik üretimle başlayan pratiğimi; web, SaaS ve AI tabanlı ürün geliştirme yönünde sürdürüyorum. Her işte problemi, kullanıcı adımını ve çalışan sistemi aynı çerçevede ele alıyorum.</p>
            <Link href='/hakkinda' className='motion-text-link'>Çalışma yaklaşımımı oku <ArrowRight aria-hidden='true' /></Link>
          </ScrollReveal>
        </Container>
      </section>

      {articles.length > 0 && (
        <section className='motion-articles-section'>
          <Container>
            <div className='motion-section-heading'>
              <div><p className='motion-section-index'>YAYINLAR</p><h2>Denemeler, kararlar<br /><span>ve rehberler.</span></h2></div>
              <Link href='/yazilar' className='motion-text-link'>Tüm yayınlar <ArrowUpRight aria-hidden='true' /></Link>
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {articles.slice(0, 3).map((article) => <ScrollReveal key={article.slug}><ArticleCard article={article} /></ScrollReveal>)}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
