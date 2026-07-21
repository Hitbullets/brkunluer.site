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
  tagline: z.string().min(1, "Tagline zorunlu"),
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
  tagline: z.string().min(1, "Tagline zorunlu"),
  coverImage: z.string().min(1, "Kapak görseli zorunlu"),
  tags: z.array(z.string()).min(1, "En az bir tag gerekli"),
  liveUrl: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  status: z.enum(["published", "draft"]).default("draft"),
})

export const newsletterSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin").min(1, "E-posta zorunlu"),
})

export const contactSchema = z.object({
  name: z.string().min(1, "Ad zorunlu").max(100),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  subject: z.string().min(1, "Konu zorunlu").max(200),
  message: z.string().min(1, "Mesaj zorunlu").max(2000),
  honeypot: z.string().max(0, "Bot detected").optional(),
})

export type ArticleInput = z.infer<typeof articleSchema>
export type MethodInput = z.infer<typeof methodSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ContactInput = z.infer<typeof contactSchema>
