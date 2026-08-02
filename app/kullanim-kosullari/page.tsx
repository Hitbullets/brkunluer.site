import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  alternates: { canonical: '/kullanim-kosullari' },
  title: 'Kullanım Koşulları',
  description: 'brkunluer.site içeriklerinin, dijital ürünlerinin ve bağlantılarının kullanımına ilişkin temel koşulları inceleyin.',
}

export default function TermsPage() {
  return (
    <Container size='narrow' className='py-16 sm:py-20 lg:py-24'>
      <header className='mb-12'>
        <h1 className='text-heading-xl font-bold tracking-tight'>KULLANIM KOŞULLARI</h1>
        <p className='mt-4 text-body-lg text-muted-foreground'>
          Bu koşullar, brkunluer.site ve sitede sunulan içeriklerin kullanımına ilişkin temel kuralları belirler.
        </p>
        <p className='mt-3 text-sm text-muted-foreground'>Son güncelleme: <time dateTime='2026-07-21'>21 Temmuz 2026</time></p>
      </header>

      <div className='prose-custom space-y-10'>
        <section>
          <h2>Koşulların Kabulü</h2>
          <p>Siteyi kullanarak bu koşulları kabul etmiş olursunuz. Koşulları kabul etmiyorsanız siteyi ve sunulan içerikleri kullanmamanız gerekir.</p>
        </section>
        <section>
          <h2>İçeriklerin Kullanımı</h2>
          <p>Sitedeki yazılar, görseller, şablonlar ve diğer materyaller aksi belirtilmedikçe Burak Ünlüler&apos;e aittir. İçerikler kişisel ve ticari olmayan amaçlarla incelenebilir; izinsiz çoğaltılamaz, yeniden yayımlanamaz veya satılamaz.</p>
        </section>
        <section>
          <h2>Dijital Ürünler ve Hizmetler</h2>
          <p>Dijital ürünlere ilişkin kapsam, fiyat, teslim ve iade koşulları ilgili ürün sayfasında veya teklif metninde belirtilir. Satın alma öncesinde sunulan bilgileri değerlendirmeniz beklenir.</p>
        </section>
        <section>
          <h2>Bilgilendirme Sınırı</h2>
          <p>Sitedeki içerikler genel bilgilendirme amacı taşır. Profesyonel hukuk, finans veya yatırım danışmanlığı niteliğinde değildir. İçeriklere dayanarak alınan kararların sorumluluğu kullanıcıya aittir.</p>
        </section>
        <section>
          <h2>Dış Bağlantılar</h2>
          <p>Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriklerinden, güvenliğinden veya gizlilik uygulamalarından brkunluer.site sorumlu değildir.</p>
        </section>
        <section>
          <h2>Değişiklikler ve İletişim</h2>
          <p>Bu koşullar gerektiğinde güncellenebilir. Sorularınız için <a href='mailto:mail@brkunluer.site'>mail@brkunluer.site</a> adresinden iletişime geçebilirsiniz.</p>
        </section>
      </div>
    </Container>
  )
}
