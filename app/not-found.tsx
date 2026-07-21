import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { Search, Home, Mail } from 'lucide-react'

export const metadata: Metadata = {
  alternates: { canonical: '/404' },
  title: 'Sayfa Bulunamadı',
  description: 'Aradığınız sayfa mevcut değil.',
}

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-atmosphere-dark ambient-glow-center vignette min-h-screen flex items-center justify-center"><Container className="flex flex-col items-center justify-center gap-8 text-center py-24 z-10 relative">
      <div className='flex items-center justify-center gap-4'>
        <span className='text-9xl font-bold text-brand-200 dark:text-brand-800'>404</span>
        <Search className='h-16 w-16 text-brand-400 dark:text-brand-500 animate-pulse' />
      </div>

      <div className='max-w-md'>
        <h1 className='text-heading-lg font-bold'>Sayfa Bulunamadı</h1>
        <p className='mt-4 text-muted-foreground'>
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          Yazım hatası kontrol edin veya aşağıdaki seçenekleri deneyin.
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
          <Link href='/yazilar'>Yazıları Keşfet</Link>
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
          <Button type='submit' variant='primary'>Abone Ol</Button>
        </form>
        <p className='mt-3 text-caption text-muted-foreground'>
          Haftalık AI workflow rehberleri. Spam yok.
        </p>
      </div>
    </Container></section>
  )
}
