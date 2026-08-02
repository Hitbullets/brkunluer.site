import { z } from "zod"

const articleSchemaBase = z.object({
  title: z.string().min(1, "Başlık zorunlu"),
  excerpt: z.string().min(1, "Özet zorunlu"),
  coverImage: z.string().min(1, "Kapak görseli zorunlu"),
  publishedAt: z.string().min(1, "Yayın tarihi zorunlu"),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).min(1, "En az bir etiket gerekli").max(3, "En fazla 3 etiket"),
  status: z.enum(["published", "draft"]).default("draft"),
  relatedArticles: z.array(z.string()).optional(),
  relatedMethods: z.array(z.string()).optional(),
})

export const articleSchema = articleSchemaBase

export const methodSchema = z.object({
  title: z.string().min(1, "Başlık zorunlu"),
  tagline: z.string().min(1, "Kısa açıklama zorunlu"),
  coverImage: z.string().min(1, "Kapak görseli zorunlu"),
  price: z.number().positive("Fiyat pozitif olmalı"),
  currency: z.enum(["TRY", "USD"]),
  features: z.array(z.string()).min(1, "En az bir özellik gerekli"),
  faq: z.array(z.object({
    question: z.string().min(1, "Soru boş olamaz"),
    answer: z.string().min(1, "Cevap boş olamaz"),
  })),
  description: z.string().min(1, "Ürün açıklaması zorunlu"),
  previewImages: z.array(z.string()).optional(),
  status: z.enum(["published", "draft"]).default("draft"),
})

export const projectSchema = z.object({
  title: z.string().min(1, "Başlık zorunlu"),
  client: z.string().optional(),
  year: z.number().int().min(2010).max(2030),
  tagline: z.string().min(1, "Kısa açıklama zorunlu"),
  coverImage: z.string().min(1, "Kapak görseli zorunlu"),
  tags: z.array(z.string()).min(1, "En az bir etiket gerekli"),
  liveUrl: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  status: z.enum(["published", "draft"]).default("draft"),
})

const archiveValueSchema = z.union([z.string(), z.array(z.string())])

export const portfolioArchiveProjectSchema = z.object({
  projectName: z.string().min(1),
  slug: z.string().min(1),
  client: z.string(),
  industry: z.string(),
  projectType: z.string(),
  currentStatus: z.string(),
  timeline: z.string(),
  purpose: z.string(),
  problemBeingSolved: z.string(),
  targetUsers: archiveValueSchema,
  businessGoals: archiveValueSchema,
  technologyStack: archiveValueSchema,
  frameworks: archiveValueSchema,
  backend: archiveValueSchema,
  database: archiveValueSchema,
  hosting: archiveValueSchema,
  cms: archiveValueSchema,
  integrations: archiveValueSchema,
  designSystem: archiveValueSchema,
  brandLanguage: archiveValueSchema,
  responsiveStrategy: archiveValueSchema,
  seoStrategy: archiveValueSchema,
  performanceOptimizations: archiveValueSchema,
  accessibilityNotes: archiveValueSchema,
  majorFeatures: archiveValueSchema,
  pages: archiveValueSchema,
  architecture: archiveValueSchema,
  interestingTechnicalDecisions: archiveValueSchema,
  developmentChallenges: archiveValueSchema,
  lessonsLearned: archiveValueSchema,
  productionUrl: z.string(),
  demoUrl: z.string(),
  categories: archiveValueSchema,
  documentationScore: z.number().int().min(0).max(100),
  priorityScore: z.number().int().min(0).max(100),
  sourceIds: z.array(z.string()),
  coverImage: z.string().optional(),
  coverSourceScreens: archiveValueSchema.optional(),
}).passthrough()

export const newsletterSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin").min(1, "E-posta zorunlu"),
})

export const contactSchema = z.object({
  name: z.string().min(1, "Ad zorunlu").max(100),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  subject: z.string().min(1, "Konu zorunlu").max(200),
  message: z.string().min(1, "Mesaj zorunlu").max(2000),
  honeypot: z.string().max(0, "İstenmeyen gönderim algılandı").optional(),
})

export type ArticleInput = z.infer<typeof articleSchema>
export type MethodInput = z.infer<typeof methodSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type PortfolioArchiveProjectInput = z.infer<typeof portfolioArchiveProjectSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ContactInput = z.infer<typeof contactSchema>
