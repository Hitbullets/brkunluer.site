'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { newsletterSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

export function NewsletterForm({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'inline' | 'modal' }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    setMessage('')

    const data = {
      email: formData.get('email'),
    }

    const validation = newsletterSchema.safeParse(data)
    if (!validation.success) {
      setStatus('error')
      setMessage(validation.error.issues[0]?.message || 'Gecersiz e-posta')
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
        setMessage('Basariyla kaydoldunuz! Ilk haftalik bulten bir sonraki Pazartesi gonderilecek.')
        formRef.current?.reset()
      } else {
        const error = await res.json()
        setStatus('error')
        setMessage(error.error || 'Bir hata olustu. Lutfen tekrar deneyin.')
      }
    } catch {
      setStatus('error')
      setMessage('Bir hata olustu. Lutfen tekrar deneyin.')
    }
  }

  if (variant === 'inline') {
    return (
      <form ref={formRef} action={handleSubmit} className={cn('flex flex-col sm:flex-row gap-2', className)}>
        <Input
          type='email'
          name='email'
          placeholder='E-posta adresin'
          required
          aria-label='E-posta adresin'
          className='flex-1'
        />
        <Button type='submit' variant='primary' disabled={status === 'loading'}>
          {status === 'loading' ? 'Kaydediliyor...' : 'Abone Ol'}
        </Button>
        {message && (
          <p className={cn('text-sm', status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
            {message}
          </p>
        )}
      </form>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className={cn('flex flex-col sm:flex-row gap-3 max-w-md mx-auto', className)}>
      <Input
        type='email'
        name='email'
        placeholder='E-posta adresin'
        required
        aria-label='E-posta adresin'
        className='flex-1'
      />
      <Button type='submit' variant='primary' size='lg' loading={status === 'loading'}>
        {status === 'loading' ? 'Kaydediliyor...' : 'Abone Ol'}
      </Button>
      {message && (
        <p className={cn('text-sm text-center sm:text-left', status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
          {message}
        </p>
      )}
    </form>
  )
}