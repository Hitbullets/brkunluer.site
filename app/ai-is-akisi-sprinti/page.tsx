import type { Metadata } from 'next'
import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'AI İş Akışı Sprinti',
  description: 'Tekrarlayan bir iş sürecini haritalayan, AI prototipi ve devir dokümanıyla teslim eden üç günlük pilot çalışma.',
  alternates: { canonical: '/ai-is-akisi-sprinti' },
  openGraph: {
    title: 'AI İş Akışı Sprinti — Burak Ünlüer',
    description: 'Bir iş sürecini netleştirip, insan onaylı AI prototipine dönüştürelim.',
    url: '/ai-is-akisi-sprinti',
    type: 'website',
  },
}

const inquiryHref =
  'mailto:mail@brkunluer.site?subject=AI%20%C4%B0%C5%9F%20Ak%C4%B1%C5%9F%C4%B1%20Sprinti%20%E2%80%94%20%C3%96n%20G%C3%B6r%C3%BC%C5%9Fme&body=Merhaba%2C%0A%0ATekrarlayan%20s%C3%BCrecimiz%3A%20%0AHaftal%C4%B1k%20tekrar%20say%C4%B1s%C4%B1%3A%20%0AKulland%C4%B1%C4%9F%C4%B1m%C4%B1z%20ara%C3%A7lar%3A%20%0A%0AKi%C5%9Fisel%20veya%20m%C3%BC%C5%9Fteri%20verisi%20eklemiyorum.%0A'

const flow = [
  { label: 'Girdi', title: 'Talep veya kısa brief', note: 'Ekibin kullandığı mevcut bilgi' },
  { label: 'AI adımı', title: 'Sınıflandırma ve ilk taslak', note: 'Sınırları belirli bir prototip' },
  { label: 'İnsan kontrolü', title: 'Gözden geçirme ve düzeltme', note: 'Karar ekipte kalır' },
  { label: 'Çıktı', title: 'Onaylanmış çalışma sonucu', note: 'Net biçimde ekibe devredilir' },
]

const examples = [
  { type: 'Ajans ekibi', title: 'Briefi ilk taslağa çevirme', text: 'Dağınık talebi yapılandırılmış içerik briefine dönüştürmek; son onayı ekipte tutmak.' },
  { type: 'Operasyon ekibi', title: 'Gelen talepleri ayırma', text: 'Tekrarlayan istekleri önceden tanımlı başlıklara göre taslak olarak sınıflandırmak.' },
  { type: 'Ürün ekibi', title: 'Notlardan aksiyon özeti çıkarma', text: 'Araştırma veya toplantı notlarından gözden geçirilebilir bir özet hazırlamak.' },
]

const deliverables = [
  'Tek süreç için mevcut akış haritası ve başarı ölçütü',
  'İzinli örnek veya sentetik veriyle bir çalışan prototip',
  'Girdi biçimi, kontrol adımı ve sınırlamaları anlatan kısa rehber',
  'Bir revizyon turu ve 45 dakikalık devir oturumu',
]

const steps = [
  { number: '01', title: 'Ön görüşme', text: '20 dakikada süreci, sıklığını ve bugün kullanılan araçları konuşuruz.' },
  { number: '02', title: 'Yazılı kapsam', text: 'Tek süreç, teslimatlar, tarih, fiyat ve kapsam dışı işleri netleştiririz.' },
  { number: '03', title: 'Üç günlük sprint', text: 'Onaylanan girdilerle prototipi kurar, örneklerle gözden geçiririz.' },
  { number: '04', title: 'Devir', text: 'Prototip, rehber ve sonraki adımları ekipteki kişiye aktarırım.' },
]

const questions = [
  {
    question: 'Üç iş günü ne zaman başlar?',
    answer: 'Yazılı kapsam onaylandığında, başlangıç ödemesi tamamlandığında ve üzerinde anlaşılan girdiler hazır olduğunda.',
  },
  {
    question: 'Prototip canlı sistemimizde çalışır mı?',
    answer: 'Bu pilot canlı sistem entegrasyonunu veya üretime almayı kapsamaz. İlk deneme izinli örnek ya da sentetik verilerle yapılır. Gerekli görülürse üretim entegrasyonu ayrı kapsam olarak planlanır.',
  },
  {
    question: 'Sürecimiz henüz net değilse?',
    answer: 'Ücretsiz 20 dakikalık görüşmede uygun bir tek iş adımı seçmeye çalışırız. Ölçülebilir ve güvenli bir süreç bulamazsak sprint önermem.',
  },
  {
    question: 'Belirli bir tasarruf veya gelir sonucu garanti mi?',
    answer: 'Hayır. Sonuç sürecin niteliğine, girdilere ve insan kontrolüne bağlıdır. Sprint bir prototipi ve varsayımları sınar; belirli bir yatırım getirisi vaat etmez.',
  },
]

export default function AIWorkflowSprintPage() {
  return (
    <>
      <section className='editorial-dark border-b border-white/15'>
        <Container className='grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28'>
          <div className='lg:col-span-7'>
            <p className='editorial-kicker !text-white/55'>Ürünleştirilmiş hizmet / AI Factory</p>
            <h1 className='mt-7 max-w-4xl text-display-lg'>Bir işi önce netleştir. Sonra AI ile hızlandır.</h1>
            <p className='mt-7 max-w-2xl text-body-lg text-white/65'>
              Ekibinizin tekrar ettiği tek bir işi seçelim. Girdiyi, karar adımlarını ve beklenen çıktıyı netleştirip üç iş gününde insan kontrolü olan bir AI prototipi hazırlayayım.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              <Button asChild size='lg'>
                <a href={inquiryHref}>Ücretsiz ön görüşme iste <ArrowRight /></a>
              </Button>
              <Button asChild size='lg' variant='outline' className='border-white/25 text-white hover:bg-white/10'>
                <a href='#teslimatlar'>Sprint kapsamı</a>
              </Button>
            </div>
            <div className='mt-10 grid max-w-2xl grid-cols-2 gap-4 border-t border-white/20 pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 sm:grid-cols-4'>
              <span>Tek süreç</span><span>3 iş günü</span><span>İnsan onayı</span><span>Devir rehberi</span>
            </div>
          </div>
          <figure className='border border-white/20 bg-white/[0.03] p-6 sm:p-8 lg:col-span-5' aria-label='Temsili AI iş akışı'>
            <figcaption className='flex items-center justify-between gap-3 border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50'>
              <span>Örnek akış / temsili</span>
              <span className='text-[#ffb28d]'>İnsan kontrolü dahil</span>
            </figcaption>
            <ol className='mt-6 space-y-5'>
              {flow.map((item, index) => (
                <li key={item.label} className='grid grid-cols-[2rem_1fr] gap-4'>
                  <span className='grid h-8 w-8 place-items-center border border-white/25 font-mono text-[10px] text-white/65'>{String(index + 1).padStart(2, '0')}</span>
                  <div className='border-b border-white/10 pb-4'>
                    <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-white/45'>{item.label}</p>
                    <p className='mt-1 font-medium'>{item.title}</p>
                    <p className='mt-1 text-sm text-white/50'>{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className='mt-5 border-l-2 border-[#d66a4c] pl-4 text-sm leading-6 text-white/60'>
              İlk prototip sentetik veya paylaşmaya yetkili olduğunuz örnek verilerle hazırlanır. Gerçek müşteri verisi ve erişim anahtarı göndermeyin.
            </p>
          </figure>
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <p className='editorial-kicker'>01 / Kime uygun</p>
              <h2 className='mt-5 text-heading-xl'>Sık tekrarlanan, insanın kontrol edebildiği bir iş.</h2>
              <p className='mt-5 leading-7 text-muted-foreground'>Ajanslar, ürün ekipleri ve operasyon ağırlıklı hizmet işletmeleri için tek bir somut süreç seçiyoruz.</p>
            </div>
            <div className='grid gap-3 sm:grid-cols-2 lg:col-span-8'>
              {examples.map((example) => (
                <article key={example.title} className='border border-border bg-card p-6'>
                  <p className='editorial-index'>{example.type} / örnek senaryo</p>
                  <h3 className='mt-5 text-xl font-medium'>{example.title}</h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>{example.text}</p>
                </article>
              ))}
              <p className='sm:col-span-2 text-sm text-muted-foreground'>Bunlar örnek kullanım alanlarıdır; müşteri vakası veya gerçekleşmiş sonuç iddiası değildir.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className='border-b border-border' id='teslimatlar'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <p className='editorial-kicker'>02 / Teslimatlar</p>
              <h2 className='mt-5 text-heading-xl'>Üç iş gününde ne hazır olur?</h2>
              <p className='mt-5 leading-7 text-muted-foreground'>Takvim, yazılı kapsam, gerekli girdiler ve başlangıç ödemesi tamamlandıktan sonra başlar.</p>
            </div>
            <div className='border-t border-border lg:col-span-8'>
              {deliverables.map((item, index) => (
                <div key={item} className='grid grid-cols-[2.25rem_1fr] gap-4 border-b border-border py-5'>
                  <span className='editorial-index'>0{index + 1}</span>
                  <p className='flex gap-3 text-sm leading-6'><Check className='mt-1 h-4 w-4 shrink-0 text-accent' aria-hidden='true' />{item}</p>
                </div>
              ))}
              <div className='mt-6 border border-border bg-card p-6'>
                <h3 className='font-medium'>Kapsam dışında</h3>
                <p className='mt-3 text-sm leading-6 text-muted-foreground'>Canlı sisteme alma, özel uygulama geliştirme, API/CRM entegrasyonu, üçüncü taraf lisansları, bakım ve ek süreçler ayrı yazılı kapsam gerektirir. Hassas kişisel veri kullanan veya yüksek etkili karar veren süreçler bu pilot için uygun değildir.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className='border-b border-border' id='surec'>
        <Container className='py-20 sm:py-28'>
          <div className='mb-10 grid gap-5 sm:grid-cols-[7fr_13fr] sm:items-end'>
            <p className='editorial-kicker'>03 / Çalışma biçimi</p>
            <div><h2 className='text-heading-xl'>Önce uygunluğu görür, sonra başlarız.</h2><p className='mt-4 max-w-2xl text-sm leading-6 text-muted-foreground'>Ücretsiz görüşmede yalnızca iş akışını seçeriz; şirkete özel analiz ve prototip sprint kapsamındadır.</p></div>
          </div>
          <div className='grid border-y border-border sm:grid-cols-2 lg:grid-cols-4'>
            {steps.map((step, index) => (
              <article key={step.number} className={cn('p-5 sm:p-6', index > 0 && 'border-t border-border sm:border-l sm:border-t-0', index > 1 && 'lg:border-t-0')}>
                <p className='editorial-index text-accent'>{step.number}</p>
                <h3 className='mt-5 font-medium'>{step.title}</h3>
                <p className='mt-3 text-sm leading-6 text-muted-foreground'>{step.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className='border-b border-border' id='fiyat'>
        <Container className='py-20 sm:py-28'>
          <div className='grid gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <p className='editorial-kicker'>04 / Başlangıç fiyatı</p>
              <h2 className='mt-5 text-heading-xl'>Küçük bir pilotla başlayın.</h2>
            </div>
            <div className='grid gap-8 border border-border bg-card p-6 sm:p-8 lg:col-span-8 lg:grid-cols-[1fr_1fr] lg:items-center'>
              <div>
                <p className='editorial-index'>Tek iş akışı / pilot sprint</p>
                <p className='mt-4 text-5xl font-semibold tracking-tight'>₺9.900 <span className='text-base font-normal text-muted-foreground'>başlangıç</span></p>
                <p className='mt-4 text-sm leading-6 text-muted-foreground'>Fiyat; bir süreç haritası, bir prototip, bir revizyon ve devir oturumu için başlangıç önerisidir. Vergi kapsamı ve kesin fiyat yazılı teklifte açıkça belirtilir.</p>
                <Button asChild size='lg' className='mt-6'><a href={inquiryHref}>Kapsamı konuşalım <ArrowRight /></a></Button>
              </div>
              <ul className='space-y-3 border-t border-border pt-5 text-sm leading-6 text-muted-foreground lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0'>
                {deliverables.map((item) => <li key={item} className='flex gap-3'><Check className='mt-1 h-4 w-4 shrink-0 text-accent' aria-hidden='true' /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className='border-b border-border'>
        <Container className='grid gap-10 py-20 sm:grid-cols-[7fr_13fr] sm:py-28'>
          <div><p className='editorial-kicker'>05 / Sık sorulanlar</p><h2 className='mt-5 text-heading-xl'>Başlamadan önce.</h2></div>
          <div className='border-t border-border'>
            {questions.map((item) => (
              <details key={item.question} className='group border-b border-border py-5'>
                <summary className='cursor-pointer list-none font-medium marker:content-none'>{item.question}</summary>
                <p className='mt-3 max-w-3xl text-sm leading-6 text-muted-foreground'>{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className='editorial-dark'>
        <Container className='grid gap-10 py-20 sm:grid-cols-[7fr_5fr] sm:items-end sm:py-28'>
          <div>
            <p className='editorial-kicker !text-white/55'>Bir süreçle başlayalım</p>
            <h2 className='mt-6 max-w-3xl text-heading-xl'>Tekrarladığınız işi anlatın.</h2>
            <p className='mt-5 max-w-2xl leading-7 text-white/60'>İlk e-postada işin adını, ne sıklıkla tekrarlandığını ve kullandığınız araçları yazın. Hassas veri veya erişim bilgisi eklemeyin.</p>
            <Button asChild size='lg' className='mt-7'><a href={inquiryHref}>mail@brkunluer.site adresine yaz <ArrowRight /></a></Button>
          </div>
          <div className='border-t border-white/20 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0'>
            <p>AI ürün geliştirme</p><p className='mt-3'>İş akışı otomasyonu</p><p className='mt-3'>Eskişehir / Türkiye</p>
          </div>
        </Container>
      </section>
    </>
  )
}
