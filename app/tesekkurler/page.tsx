import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { NewsletterForm } from '@/components/forms/newsletter-form'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/tesekkurler' },
  title: 'Teşekkürler',
  description: 'İşleminiz başarıyla tamamlandı.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette min-h-screen flex items-center justify-center"><Container className="flex flex-col items-center justify-center gap-8 text-center py-24 z-10 relative">
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
        <CheckCircle className='h-8 w-8' />
      </div>

      <div>
        <h1 className='text-heading-lg font-bold'>MESAJINIZ GÖNDERİLDİ</h1>
        <p className='mt-3 text-muted-foreground max-w-md'>
          Teşekkürler. Mesajınız başarıyla alındı. Genellikle 24 ila 48 saat içinde size dönüş yapacağım.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md'>
        <Button asChild variant='primary' size='lg'>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Ana Sayfaya Dön
          </Link>
        </Button>
        <Button asChild variant='outline' size='lg'>
          <Link href='/yazilar'>Yazıları Oku</Link>
        </Button>
      </div>

      <div className='w-full max-w-md'>
        <NewsletterForm />
        <p className='mt-3 text-caption text-muted-foreground'>
          Haftalık AI iş akışı rehberleri. İstediğiniz zaman abonelikten ayrılabilirsiniz.
        </p>
      </div>
    </Container></section>
  )
}
