import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { MdxRendererRsc as MdxRenderer } from '@/components/mdx/mdx-renderer-rsc'
import Image from 'next/image'

import type { Method } from '@/lib/types'
import { Check } from 'lucide-react'

interface Props {
  method: Method
  serializedDescription: string
}

export function MethodDetail({ method, serializedDescription }: Props) {
  const images: string[] = method.previewImages && method.previewImages.length > 0
    ? method.previewImages
    : method.coverImage
      ? [method.coverImage]
      : []

  return (
    <div className='max-w-3xl'>
      <header className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <Badge variant='accent' className='text-sm'>
            {method.currency} {method.price.toLocaleString('tr-TR')}
          </Badge>
        </div>
        <h1 className='text-4xl font-bold tracking-tight'>{method.title}</h1>
        <p className='mt-3 text-lg text-muted-foreground'>{method.tagline}</p>
      </header>

      {images.length > 0 && (
        <div className='mb-8'>
          <div className='relative mb-4 h-64 w-full overflow-hidden rounded-lg sm:h-80'>
            <Image
              src={images[0]!}
              alt={method.title + ' önizleme'}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover'
            />
          </div>
        </div>
      )}

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Özellikler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {method.features.map((feature, idx) => (
              <li key={idx} className='flex items-start gap-2'>
                <Check className='mt-0.5 h-4 w-4 shrink-0 text-accent' />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className='prose prose-neutral dark:prose-invert mb-8'>
        <MdxRenderer source={serializedDescription || method.description} />
      </div>

      {method.faq.length > 0 && (
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Sıkça Sorulan Sorular</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible>
              {method.faq.map((item, idx) => (
                <AccordionItem key={idx} value={'faq-' + idx}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <p className='text-sm text-muted-foreground'>
              Bu metodu satın almak için iletişime geçin.
            </p>
            <Button variant='primary' size='lg'>
              {method.currency} {method.price.toLocaleString('tr-TR')} — Satın Al
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
