'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'
import React from 'react'

interface HeroProps {
  badge?: string
  title: string
  subtitle?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  trustSignals?: Array<{ label: string; value: string }>
  backgroundImage?: string
  className?: string
}

export function Hero({
  badge,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  trustSignals,
  backgroundImage,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgroundImage && 'before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-5',
        className,
      )}
      aria-labelledby='hero-title'
    >
      {backgroundImage && (
        <div className='absolute inset-0 -z-10' aria-hidden='true'>
          <Image
            src={backgroundImage}
            alt=''
            fill
            priority
            className='object-cover'
            sizes='100vw'
          />
        </div>
      )}

      <Container className='relative py-20 sm:py-24 lg:py-32'>
        <div className='max-w-4xl mx-auto text-center'>
          {badge && (
            <span className='inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs sm:text-sm font-medium text-secondary-foreground mb-8'>
              {badge}
            </span>
          )}

          <h1 id='hero-title' className='text-display-md sm:text-display-lg font-bold tracking-tight text-foreground'>
            {title}
          </h1>

          {subtitle && (
            <p className='mt-4 sm:mt-6 text-body sm:text-body-lg text-muted-foreground max-w-2xl mx-auto'>
              {subtitle}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className='mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
              {primaryCTA && (
                <Button asChild size='lg' variant='primary' className='w-full sm:w-auto'>
                  <a href={primaryCTA.href}>{primaryCTA.label}</a>
                </Button>
              )}
              {secondaryCTA && (
                <Button asChild size='lg' variant='outline' className='w-full sm:w-auto'>
                  <a href={secondaryCTA.href}>{secondaryCTA.label}</a>
                </Button>
              )}
            </div>
          )}

          {trustSignals && trustSignals.length > 0 && (
            <div className='mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12'>
              {trustSignals.map((signal, index) => (
                <div key={index} className='flex flex-col items-center gap-0.5'>
                  <span className='text-heading-sm sm:text-heading-md font-bold text-foreground'>{signal.value}</span>
                  <span className='text-xs sm:text-sm text-muted-foreground'>{signal.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce' aria-hidden='true'>
          <svg className='h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
          </svg>
        </div>
      </Container>
    </section>
  )
}

interface SectionHeroProps {
  title: string
  subtitle?: string
  badge?: string
  className?: string
}

export function SectionHero({ title, subtitle, badge, className }: SectionHeroProps) {
  return (
    <header className={cn('mb-12', className)}>
      {badge && (
        <span className='inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground mb-4'>
          {badge}
        </span>
      )}
      <h1 className='text-heading-xl font-bold tracking-tight'>{title}</h1>
      {subtitle && <p className='mt-4 text-body-lg text-muted-foreground max-w-2xl'>{subtitle}</p>}
    </header>
  )
}