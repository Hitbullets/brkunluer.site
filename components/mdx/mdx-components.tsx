import Link from 'next/link'

const components = {
  ImageFrame: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null
    return (
      <figure className='my-8 overflow-hidden rounded-xl border border-border bg-secondary/30'>
        {/* MDX custom image blocks stay server-renderable and avoid client event props. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ''} width={1200} height={630} className='h-auto w-full' />
        {alt && <figcaption className='border-t border-border px-4 py-2 text-center text-xs text-muted-foreground'>{alt}</figcaption>}
      </figure>
    )
  },
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined
    return (
      <h1 id={id} className='mt-10 text-3xl font-bold tracking-tight scroll-mt-24' {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined
    return (
      <h2 id={id} className='mt-10 text-2xl font-semibold tracking-tight scroll-mt-24' {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : undefined
    return (
      <h3 id={id} className='mt-8 text-xl font-semibold scroll-mt-24' {...props}>
        {children}
      </h3>
    )
  },
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className='mt-5 leading-7 text-foreground/80 first:mt-0' {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => (
    <ul className='mt-5 list-disc pl-6 space-y-2' {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, type, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol type={type} className='mt-5 list-decimal pl-6 space-y-2' {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => (
    <li className='leading-7' {...props}>
      {children}
    </li>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-brand-600 dark:text-brand-400 underline underline-offset-4 decoration-brand-600/30 dark:decoration-brand-400/30 hover:decoration-brand-600 dark:hover:decoration-brand-400 transition-all'
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href || '#'} className='text-brand-600 dark:text-brand-400 underline underline-offset-4 decoration-brand-600/30 dark:decoration-brand-400/30 hover:decoration-brand-600 dark:hover:decoration-brand-400 transition-all' {...props}>
        {children}
      </Link>
    )
  },
  img: ({ src, alt, width, height }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const imageSrc = typeof src === 'string' ? src : undefined
    if (!imageSrc) return null
    const imageAlt = typeof alt === 'string' ? alt : ''
    const w = typeof width === 'number' ? width : 1200
    const h = typeof height === 'number' ? height : 630
    return (
      <figure className='my-8 rounded-xl border border-border overflow-hidden bg-secondary/30'>
        {/* MDX runs in an RSC boundary, so next/image would pass client event handlers during prerender. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={w}
          height={h}
          className='w-full h-auto'
        />
        {imageAlt && (
          <figcaption className='px-4 py-2 text-xs text-muted-foreground text-center border-t border-border'>
            {imageAlt}
          </figcaption>
        )}
      </figure>
    )
  },
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote
      className='my-8 border-l-2 border-brand-600 dark:border-brand-400 pl-6 py-3 text-body-lg text-muted-foreground italic bg-secondary/20 rounded-r-lg'
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => {
    const isBlock = props.className?.includes('language-')
    if (isBlock) {
      const lang = props.className?.match(/language-(\w+)/)?.[1] || ''
      return (
        <div className='my-6 rounded-xl border border-border overflow-hidden'>
          {lang && (
            <div className='flex items-center justify-between px-4 py-1.5 bg-secondary border-b border-border'>
              <span className='text-xs text-muted-foreground font-mono'>{lang}</span>
            </div>
          )}
          <code
            className='block p-4 sm:p-5 text-sm font-mono leading-relaxed overflow-x-auto scrollbar-thin bg-secondary/50'
            {...props}
          >
            {children}
          </code>
        </div>
      )
    }
    return (
      <code
        className='rounded-md bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground border border-border'
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => (
    <pre className='my-6 overflow-x-auto rounded-md bg-secondary p-4' {...props}>
      {children}
    </pre>
  ),
}

export { components }
