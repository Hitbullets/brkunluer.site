import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Article, Method, Project, TagInfo } from "./types"
import {
  articleSchema,
  methodSchema,
  portfolioArchiveProjectSchema,
  projectSchema,
  type PortfolioArchiveProjectInput,
} from "./validations"

const contentDir = path.join(process.cwd(), "content")
const markdownFilePattern = /\.(md|mdx)$/

const readMarkdownFile = (filePath: string): { data: Record<string, unknown>; body: string } => {
  const source = fs.readFileSync(filePath, "utf-8")
  const result = matter(source)
  return { data: result.data as Record<string, unknown>, body: result.content }
}

async function loadArticles(): Promise<Article[]> {
  const articlesDir = path.join(contentDir, "articles")
  if (!fs.existsSync(articlesDir)) return []

  const files = fs.readdirSync(articlesDir).filter((f) => markdownFilePattern.test(f))
  const articles: Article[] = []

  for (const file of files) {
    const { data, body } = readMarkdownFile(path.join(articlesDir, file))
    const parsed = articleSchema.parse(data)

    if (parsed.status === "published") {
      articles.push({
        type: "article",
        ...parsed,
        body,
        slug: file.replace(markdownFilePattern, ""),
      } as Article)
    }
  }

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

async function loadMethods(): Promise<Method[]> {
  const methodsDir = path.join(contentDir, "methods")
  if (!fs.existsSync(methodsDir)) return []

  const files = fs.readdirSync(methodsDir).filter((f) => markdownFilePattern.test(f))
  const methods: Method[] = []

  for (const file of files) {
    const { data, body } = readMarkdownFile(path.join(methodsDir, file))
    const parsed = methodSchema.parse(data)

    if (parsed.status === "published") {
      methods.push({
        type: "method",
        ...parsed,
        description: body,
        slug: file.replace(markdownFilePattern, ""),
      } as Method)
    }
  }

  return methods
}

const unknownValue = "Unknown"
const pendingDetail = "Proje detayları hazırlanıyor. Doğrulanmış bilgi eklendikçe bu bölüm güncellenecek."
const privateRepositoryNote =
  "Private Repository olarak geliştirilmiştir. İstenildiği takdirde GitHub üzerinden erişim izni verilir."

const isKnown = (value: string) =>
  value.trim().length > 0 && value.trim() !== unknownValue

const asList = (value: string | string[]): string[] =>
  Array.isArray(value) ? value.filter((item) => isKnown(item)) : isKnown(value) ? [value] : []

const asMarkdown = (value: string | string[]): string => {
  const values = asList(value)
  if (values.length === 0) return pendingDetail
  if (values.length === 1) return values.at(0) ?? unknownValue
  return values.map((item) => `- ${item}`).join("\n")
}

const asInline = (value: string | string[]): string => {
  const values = asList(value)
  return values.length > 0 ? values.join(", ") : "Hazırlanıyor"
}

const cleanText = (value: string): string =>
  value
    .replace(/\bProduction Unknown\b/g, "yayın durumu hazırlanıyor")
    .replace(/\bcanlı doğrulama Unknown\b/gi, "canlı doğrulama hazırlanıyor")
    .replace(/\bUnknown\b/g, "detay hazırlanıyor")

const cleanClient = (value: string): string =>
  cleanText(value)
    .replace(/;\s*kurum detay hazırlanıyor/gi, "")
    .replace(/\/\s*detay hazırlanıyor/gi, "")
    .trim()

const firstUrl = (value: string | undefined): string | undefined => {
  if (!value || !isKnown(value)) return undefined
  const match = value.match(/https?:\/\/[^\s)]+/)
  return match?.[0]
}

const asRepositoryUrl = (value: unknown): string | undefined => {
  const values = Array.isArray(value) ? value : [value]
  return values.find((item): item is string => typeof item === "string" && /^https?:\/\//.test(item))
}

const tagLabels: Record<string, string> = {
  "AI Product": "AI Ürün",
  "Client Work": "Müşteri İşi",
  "Corporate Product": "Kurumsal Ürün",
  "Corporate Website": "Kurumsal Web",
  "E-commerce": "E-ticaret",
  Educational: "Eğitim",
  Experimental: "Deneysel",
  Finance: "Finans",
  "Internal Tool": "İç Araç",
  "Landing Page": "Landing",
  Marketplace: "Pazaryeri",
  "Open Source": "Açık Kaynak",
  "Personal Brand": "Kişisel Marka",
  Portfolio: "Portfolyo",
  "Tattoo Studio": "Stüdyo Sitesi",
}

const normalizeTags = (tags: string[]): string[] => tags.map((tag) => tagLabels[tag] ?? tag)

const extractYear = (timeline: string): number | undefined => {
  const match = timeline.match(/\b(?:19|20)\d{2}\b/)
  return match ? Number(match[0]) : undefined
}

const buildArchiveBody = (project: PortfolioArchiveProjectInput): string => {
  if (project.portfolioTier === "active-development") {
    return `
## Geliştirme durumu

${project.portfolioSummary ?? project.purpose}

Bu çalışma aktif geliştirme sürecindedir. Teknik kapsam, ekranlar ve doğrulama kanıtları netleştikçe bu kayıt vaka çalışmasına dönüştürülecek.

## Planlanan kapsam

${asMarkdown(project.majorFeatures)}

## Teknik yön

${asMarkdown(project.technologyStack)}

## Kaynak erişimi

${project.repositoryAccessNote ?? privateRepositoryNote}
`
  }

  return `
## Çalışmanın kapsamı

${project.portfolioSummary ?? project.purpose}

## Benim rolüm

${project.portfolioRole ?? pendingDetail}

## Çözülen problem

${project.problemBeingSolved}

## Öne çıkan çıktı

${asMarkdown(project.majorFeatures)}

## Kullanıcı ve iş hedefi

${asMarkdown(project.targetUsers)}

${asMarkdown(project.businessGoals)}

## Teknoloji yığını

${asMarkdown(project.technologyStack)}

### Uygulama katmanları

- Framework: ${asInline(project.frameworks)}
- Backend: ${asInline(project.backend)}
- Veritabanı: ${asInline(project.database)}
- Hosting: ${asInline(project.hosting)}
- CMS: ${asInline(project.cms)}
- Entegrasyonlar: ${asInline(project.integrations)}

## Mimari ve teknik kararlar

${asMarkdown(project.architecture)}

${asMarkdown(project.interestingTechnicalDecisions)}

## Tasarım ve marka dili

- Tasarım sistemi: ${asInline(project.designSystem)}
- Marka dili: ${asInline(project.brandLanguage)}
- Responsive yaklaşım: ${asInline(project.responsiveStrategy)}

## Doğrulama ve kaynak

${project.evidenceSummary ?? project.currentStatus}

${project.repositoryAccessNote ? `### Kaynak erişimi\n\n${project.repositoryAccessNote}` : ""}

## Çıkarılan ders

${asMarkdown(project.lessonsLearned)}

## Doğrulama sınırı

${project.currentStatus}

Bu sayfa erişilebilir proje dosyalarından yeniden oluşturulmuş bir arşiv kaydıdır. Kanıtlanamayan alanlar tamamlanmış üretim işi gibi sunulmaz; eksik detaylar doğrulandıkça güncellenir.
`
}

async function loadCaseStudyProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDir, "projects")
  if (!fs.existsSync(projectsDir)) return []

  const files = fs.readdirSync(projectsDir).filter((f) => markdownFilePattern.test(f))
  const projects: Project[] = []

  for (const file of files) {
    const { data, body } = readMarkdownFile(path.join(projectsDir, file))
    const parsed = projectSchema.parse(data)

    if (parsed.status === "published") {
      projects.push({
        type: "project",
        recordType: "case-study",
        ...parsed,
        body,
        slug: file.replace(markdownFilePattern, ""),
      } as Project)
    }
  }

  return projects
}

async function loadArchiveProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDir, "projects")
  if (!fs.existsSync(projectsDir)) return []

  const directories = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, "tr"))

  const projects: Project[] = []

  for (const directory of directories) {
    const metadataPath = path.join(projectsDir, directory.name, "metadata.json")
    if (!fs.existsSync(metadataPath)) continue

    const parsed = portfolioArchiveProjectSchema.parse(
      JSON.parse(fs.readFileSync(metadataPath, "utf-8")),
    )
    if (parsed.portfolioVisibility === "hidden") continue
    const categories = normalizeTags(asList(parsed.categories))
    const repositoryUrl = asRepositoryUrl(parsed.gitRepository)
    const liveUrl = firstUrl(parsed.productionUrl) ?? firstUrl(parsed.demoUrl)
    const repositoryAccess = parsed.repositoryAccess ?? (repositoryUrl ? "public" : "private")

    projects.push({
      type: "project",
      recordType: "archive",
      title: parsed.projectName,
      slug: parsed.slug,
      client: isKnown(parsed.client) ? cleanClient(parsed.client) : undefined,
      year: extractYear(parsed.timeline) ?? 0,
      tagline: cleanText(parsed.portfolioSummary && isKnown(parsed.portfolioSummary) ? parsed.portfolioSummary : parsed.purpose),
      coverImage: typeof parsed.coverImage === "string" && isKnown(parsed.coverImage) ? parsed.coverImage : "",
      tags: categories.length > 0 ? categories : [parsed.projectType],
      liveUrl,
      status: "published",
      body: cleanText(buildArchiveBody(parsed)),
      portfolioTier: parsed.portfolioTier ?? "archive",
      portfolioSummary: parsed.portfolioSummary,
      portfolioRole: parsed.portfolioRole,
      evidenceSummary: parsed.evidenceSummary,
      repositoryAccess,
      repositoryAccessNote: parsed.repositoryAccessNote ?? (repositoryAccess === "private" ? privateRepositoryNote : undefined),
      repositoryUrl,
      archive: {
        currentStatus: cleanText(parsed.currentStatus),
        projectType: parsed.projectType,
        industry: parsed.industry,
        documentationScore: parsed.documentationScore,
        priorityScore: parsed.priorityScore,
        sourceCount: parsed.sourceIds.length,
        productionUrl: cleanText(parsed.productionUrl),
        demoUrl: cleanText(parsed.demoUrl),
        coverProvenance: parsed.coverProvenance,
      },
    })
  }

  return projects
}

async function loadProjects(): Promise<Project[]> {
  const [caseStudies, archiveProjects] = await Promise.all([
    loadCaseStudyProjects(),
    loadArchiveProjects(),
  ])
  const archiveBySlug = new Map(archiveProjects.map((project) => [project.slug, project]))
  const caseStudySlugs = new Set(caseStudies.map((project) => project.slug))

  const enrichedCaseStudies = caseStudies.map((project) => ({
    ...project,
    archive: archiveBySlug.get(project.slug)?.archive,
    portfolioTier: archiveBySlug.get(project.slug)?.portfolioTier ?? "archive",
    portfolioSummary: archiveBySlug.get(project.slug)?.portfolioSummary,
    portfolioRole: archiveBySlug.get(project.slug)?.portfolioRole,
    evidenceSummary: archiveBySlug.get(project.slug)?.evidenceSummary,
    repositoryAccess: archiveBySlug.get(project.slug)?.repositoryAccess,
    repositoryAccessNote: archiveBySlug.get(project.slug)?.repositoryAccessNote,
    repositoryUrl: archiveBySlug.get(project.slug)?.repositoryUrl,
  }))
  const remainingArchive = archiveProjects
    .filter((project) => !caseStudySlugs.has(project.slug))
    .sort((a, b) => (b.archive?.priorityScore ?? 0) - (a.archive?.priorityScore ?? 0))

  return [...enrichedCaseStudies, ...remainingArchive]
}

async function computeAllTags(): Promise<TagInfo[]> {
  const [articles, projects] = await Promise.all([loadArticles(), loadProjects()])

  const tagMap = new Map<string, number>()

  for (const item of [...articles, ...projects]) {
    for (const tag of item.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await loadArticles()
  return articles.find((a) => a.slug === slug)
}

export async function getAllArticles(): Promise<Article[]> {
  return loadArticles()
}

export async function getArticlesByTag(tagSlug: string): Promise<Article[]> {
  const articles = await loadArticles()
  return articles.filter((a) =>
    a.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tagSlug),
  )
}

export async function getMethodBySlug(slug: string): Promise<Method | undefined> {
  const methods = await loadMethods()
  return methods.find((m) => m.slug === slug)
}

export async function getAllMethods(): Promise<Method[]> {
  return loadMethods()
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await loadProjects()
  return projects.find((p) => p.slug === slug)
}

export async function getAllProjects(): Promise<Project[]> {
  return loadProjects()
}

export async function getTagInfo(slug: string): Promise<TagInfo | undefined> {
  const tags = await computeAllTags()
  return tags.find((t) => t.slug === slug)
}

export async function getAllTags(): Promise<TagInfo[]> {
  return computeAllTags()
}
