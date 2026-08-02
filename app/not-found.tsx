import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { NewsletterForm } from '@/components/forms/newsletter-form'
import { Search, Home, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı',
  description: 'Aradığınız sayfa mevcut değil.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette min-h-screen flex items-center justify-center"><Container className="flex flex-col items-center justify-center gap-8 text-center py-24 z-10 relative">
      <div className='flex items-center justify-center gap-4'>
        <span className='text-9xl font-bold text-brand-200 dark:text-brand-800'>404</span>
        <Search className='h-16 w-16 text-brand-400 dark:text-brand-500 animate-pulse' />
      </div>

      <div className='max-w-md'>
        <h1 className='text-heading-lg font-bold'>SAYFA BULUNAMADI</h1>
        <p className='mt-4 text-muted-foreground'>
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          Adresteki yazımı kontrol edin veya aşağıdaki seçeneklerden birini kullanın.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
        <Button asChild variant='primary' size='lg'>
          <Link href='/'>
            <Home className='mr-2 h-4 w-4' /> Ana Sayfa
          </Link>
        </Button>
        <Button asChild variant='outline' size='lg'>
          <Link href='/iletisim'>
            <Mail className='mr-2 h-4 w-4' /> Bana Yaz
          </Link>
        </Button>
        <Button asChild variant='ghost' size='lg'>
          <Link href='/yazilar'>Yayınları Keşfet</Link>
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
