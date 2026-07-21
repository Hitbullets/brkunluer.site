import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/tesekkurler' },
  title: 'Teşekkürler',
  description: 'İşleminiz başarıyla tamamlandı.',
}

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette min-h-screen flex items-center justify-center"><Container className="flex flex-col items-center justify-center gap-8 text-center py-24 z-10 relative">
      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
        <CheckCircle className='h-8 w-8' />
      </div>

      <div>
        <h1 className='text-heading-lg font-bold'>Mesajınız Gönderildi</h1>
        <p className='mt-3 text-muted-foreground max-w-md'>
          Teşekkürler! Mesajınız başarıyla alındı. En kısa sürede (genellikle 24-48 saat içinde) size dönüş yapacağım.
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
        <form className='flex gap-2' action='/api/newsletter' method='POST'>
          <input
            type='email'
            name='email'
            placeholder='Bültene abone ol...'
            required
            className='flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          />
          <Button type='submit' variant='primary'>
            <Mail className='mr-2 h-4 w-4' /> Abone Ol
          </Button>
        </form>
        <p className='mt-3 text-caption text-muted-foreground'>
          Haftalık AI workflow rehberleri. Spam yok.
        </p>
      </div>
    </Container></section>
  )
}
