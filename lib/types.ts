export type ArticleStatus = "published" | "draft"

export type MethodStatus = "published" | "draft"

export type ProjectStatus = "published" | "draft"

export type Currency = "TRY" | "USD"

export interface ArticleBase {
  title: string
  slug: string
  excerpt: string
  coverImage: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  status: ArticleStatus
  relatedArticles?: string[]
  relatedMethods?: string[]
}

export interface Article extends ArticleBase {
  type: "article"
  body: string
}

export interface MethodBase {
  title: string
  slug: string
  tagline: string
  coverImage: string
  price: number
  currency: Currency
  features: string[]
  faq: { question: string; answer: string }[]
  status: MethodStatus
}

export interface Method extends MethodBase {
  type: "method"
  description: string
  previewImages?: string[]
}

export interface ProjectBase {
  title: string
  slug: string
  client?: string
  year: number
  tagline: string
  coverImage: string
  tags: string[]
  liveUrl?: string
  status: ProjectStatus
}

export interface Project extends ProjectBase {
  type: "project"
  body: string
  gallery?: string[]
}

export interface TagInfo {
  name: string
  slug: string
  count: number
}

export type ContentItem = Article | Method | Project

export type ContentType = ContentItem["type"]