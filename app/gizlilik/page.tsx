import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  alternates: { canonical: '/gizlilik' },
  title: 'Gizlilik Politikası',
  description: 'brkunluer.site üzerindeki kişisel verilerin, iletişim bilgilerinin ve kullanım verilerinin nasıl işlendiğini öğrenin.',
}

export default function PrivacyPage() {
  return (
    <Container size='narrow' className='py-16 sm:py-20 lg:py-24'>
      <header className='mb-12'>
        <h1 className='text-heading-xl font-bold tracking-tight'>GİZLİLİK POLİTİKASI</h1>
        <p className='mt-4 text-body-lg text-muted-foreground'>
          Bu politika, brkunluer.site üzerinde hangi bilgilerin toplandığını ve bu bilgilerin nasıl kullanıldığını açıklar.
        </p>
        <p className='mt-3 text-sm text-muted-foreground'>Son güncelleme: <time dateTime='2026-07-21'>21 Temmuz 2026</time></p>
      </header>

      <div className='prose-custom space-y-10'>
        <section>
          <h2>Toplanan Bilgiler</h2>
          <p>İletişim formunu kullandığınızda adınız, e-posta adresiniz, konu ve mesaj içeriğiniz işlenir. E-posta bültenine kaydolduğunuzda yalnızca belirttiğiniz e-posta adresi alınır.</p>
        </section>
        <section>
          <h2>Kullanım Verileri ve Analitik</h2>
          <p>Site performansını ve içeriklerin kullanımını anlamak için Vercel Analytics kullanılabilir. Bu kapsamda sayfa görüntüleme ve teknik kullanım verileri, hizmetin çalışma biçimine uygun olarak işlenebilir.</p>
        </section>
        <section>
          <h2>Bilgilerin Kullanımı</h2>
          <p>Toplanan bilgiler; mesajlarınıza yanıt vermek, talep ettiğiniz bülteni iletmek, site güvenliğini korumak ve kullanıcı deneyimini iyileştirmek amacıyla kullanılır. Bilgileriniz reklam amacıyla satılmaz.</p>
        </section>
        <section>
          <h2>Hizmet Sağlayıcılar</h2>
          <p>Site Vercel altyapısında barındırılır. İletişim iletilerinin gönderiminde Resend kullanılabilir. Bu sağlayıcılar, hizmeti sunmak için gerekli verileri kendi gizlilik koşulları kapsamında işleyebilir.</p>
        </section>
        <section>
          <h2>Saklama ve Güvenlik</h2>
          <p>Bilgiler yalnızca belirtilen amaçlar için gerekli olduğu sürece saklanır. Yetkisiz erişimi önlemek için makul teknik ve idari önlemler uygulanır; ancak internet üzerinden yapılan hiçbir aktarım için mutlak güvenlik garantisi verilemez.</p>
        </section>
        <section>
          <h2>Haklarınız ve İletişim</h2>
          <p>Size ait bilgilerin silinmesini, düzeltilmesini veya kullanımına ilişkin bilgi verilmesini talep etmek için <a href='mailto:mail@brkunluer.site'>mail@brkunluer.site</a> adresinden iletişime geçebilirsiniz.</p>
        </section>
      </div>
    </Container>
  )
}
