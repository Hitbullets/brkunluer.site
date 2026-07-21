import { SiteConfig } from '@/lib/site'

export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SiteConfig.author.name,
    alternateName: SiteConfig.shortName,
    url: SiteConfig.url,
    email: SiteConfig.author.email,
    jobTitle: SiteConfig.author.role,
    description: SiteConfig.author.bio,
    sameAs: [
      SiteConfig.social.github,
      SiteConfig.social.twitter,
      SiteConfig.social.linkedin,
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SiteConfig.name,
    url: SiteConfig.url,
    description: SiteConfig.description,
    inLanguage: 'tr-TR',
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  tags,
  coverImage,
}: {
  title: string
  description: string
  url: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  coverImage?: string
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    url: url,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: SiteConfig.author.name,
      url: SiteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: SiteConfig.author.name,
    },
    keywords: tags.join(', '),
    inLanguage: 'tr-TR',
  }

  if (coverImage) {
    schema.image = coverImage
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
