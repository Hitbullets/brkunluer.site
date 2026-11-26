'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { newsletterSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

export function NewsletterForm({
  active,
  className,
  variant = 'default',
}: {
  active: boolean
  className?: string
  variant?: 'default' | 'inline' | 'modal'
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    setMessage('')

    const data = {
      email: formData.get('email'),
      consent: formData.get('consent') === 'on',
    }

    const validation = newsletterSchema.safeParse(data)
    if (!validation.success) {
      setStatus('error')
      setMessage(validation.error.issues[0]?.message || 'Geçersiz form verisi')
      return
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('Yayın duyuruları için kaydınız tamamlandı.')
        formRef.current?.reset()
        return
      }

      const responseBody = await res.json().catch(() => null) as { error?: string } | null
      setStatus('error')
      setMessage(responseBody?.error || 'Kaydınız şu anda tamamlanamadı. Biraz sonra yeniden deneyin.')
    } catch {
      setStatus('error')
      setMessage('Kaydınız şu anda tamamlanamadı. Biraz sonra yeniden deneyin.')
    }
  }

  if (!active) {
    return (
      <p className={cn('text-sm text-muted-foreground', className)} role='status'>
        Yayınlara e-posta ile kayıt şu anda kapalı.
      </p>
    )
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className={cn('flex flex-col gap-3', variant !== 'inline' && 'mx-auto max-w-md', className)}
    >
      <div className='flex flex-col gap-2 sm:flex-row'>
        <Input
          type='email'
          name='email'
          placeholder='E-posta adresiniz'
          required
          aria-label='E-posta Adresi'
          className='flex-1'
        />
        <Button
          type='submit'
          variant='primary'
          size={variant === 'inline' ? 'default' : 'lg'}
          loading={status === 'loading'}
        >
          {status === 'loading' ? 'Kaydediliyor...' : 'Abone Ol'}
        </Button>
      </div>
      <label className='flex items-start gap-2 text-xs leading-5 text-muted-foreground'>
        <input
          type='checkbox'
          name='consent'
          required
          className='mt-1 h-4 w-4 shrink-0 accent-primary'
        />
        <span>
          Yeni yayın duyurularını e-postayla almak ve e-posta adresimin bu amaçla işlenmesini kabul ediyorum.{' '}
          <Link href='/gizlilik' className='underline underline-offset-4'>
            Gizlilik politikası
          </Link>
          .
        </span>
      </label>
      {message && (
        <p
          aria-live='polite'
          role={status === 'error' ? 'alert' : 'status'}
          className={cn(
            'text-sm',
            status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
          )}
        >
          {message}
        </p>
      )}
    </form>
  )
}
