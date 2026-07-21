import type { MetadataRoute } from 'next'
import { SiteConfig } from '@/lib/site'
import { getAllArticles, getAllMethods, getAllProjects } from '@/lib/content'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, methods, projects] = await Promise.all([
    getAllArticles(),
    getAllMethods(),
    getAllProjects(),
  ])

  const staticRoutes = [
    '',
    '/yazilar',
    '/metotlar',
    '/portfolyo',
    '/hakkinda',
    '/iletisim',
  ]

  const articleUrls = articles.map((article) => ({
    url: SiteConfig.url + '/yazilar/' + article.slug,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const methodUrls = methods.map((method) => ({
    url: SiteConfig.url + '/metotlar/' + method.slug,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectUrls = projects.map((project) => ({
    url: SiteConfig.url + '/portfolyo/' + project.slug,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticUrls = staticRoutes.map((route) => ({
    url: SiteConfig.url + route,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...staticUrls, ...articleUrls, ...methodUrls, ...projectUrls]
}