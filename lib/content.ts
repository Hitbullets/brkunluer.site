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

const isKnown = (value: string) => value.trim().length > 0 && value !== unknownValue

const asList = (value: string | string[]): string[] =>
  Array.isArray(value) ? value : isKnown(value) ? [value] : []

const asMarkdown = (value: string | string[]): string => {
  const values = asList(value)
  if (values.length === 0) return unknownValue
  if (values.length === 1) return values.at(0) ?? unknownValue
  return values.map((item) => `- ${item}`).join("\n")
}

const asInline = (value: string | string[]): string => {
  const values = asList(value)
  return values.length > 0 ? values.join(", ") : unknownValue
}

const extractYear = (timeline: string): number | undefined => {
  const match = timeline.match(/\b(?:19|20)\d{2}\b/)
  return match ? Number(match[0]) : undefined
}

const buildArchiveBody = (project: PortfolioArchiveProjectInput): string => `
## Proje özeti

${project.purpose}

## Çözülen problem

${project.problemBeingSolved}

## Hedef kullanıcılar

${asMarkdown(project.targetUsers)}

## İş hedefleri

${asMarkdown(project.businessGoals)}

## Başlıca özellikler

${asMarkdown(project.majorFeatures)}

## Sayfalar ve deneyim alanları

${asMarkdown(project.pages)}

## Teknoloji yığını

${asMarkdown(project.technologyStack)}

### Uygulama katmanları

- Framework: ${asInline(project.frameworks)}
- Backend: ${asInline(project.backend)}
- Veritabanı: ${asInline(project.database)}
- Hosting: ${asInline(project.hosting)}
- CMS: ${asInline(project.cms)}
- Entegrasyonlar: ${asInline(project.integrations)}

## Mimari

${asMarkdown(project.architecture)}

## Teknik kararlar

${asMarkdown(project.interestingTechnicalDecisions)}

## Tasarım ve marka dili

- Tasarım sistemi: ${asInline(project.designSystem)}
- Marka dili: ${asInline(project.brandLanguage)}
- Responsive yaklaşım: ${asInline(project.responsiveStrategy)}

## SEO, performans ve erişilebilirlik

- SEO: ${asInline(project.seoStrategy)}
- Performans: ${asInline(project.performanceOptimizations)}
- Erişilebilirlik: ${asInline(project.accessibilityNotes)}

## Geliştirme zorlukları

${asMarkdown(project.developmentChallenges)}

## Çıkarılan dersler

${asMarkdown(project.lessonsLearned)}

## Doğrulama sınırı

${project.currentStatus}

Bu sayfa erişilebilir proje dosyalarından yeniden oluşturulmuş bir arşiv kaydıdır. Kanıtlanamayan bilgiler **Unknown** olarak korunur; teklif, plan veya prototip kayıtları tamamlanmış üretim işi olarak sunulmaz.
`

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
    const categories = asList(parsed.categories)

    projects.push({
      type: "project",
      recordType: "archive",
      title: parsed.projectName,
      slug: parsed.slug,
      client: isKnown(parsed.client) ? parsed.client : undefined,
      year: extractYear(parsed.timeline) ?? 0,
      tagline: parsed.purpose,
      coverImage: typeof parsed.coverImage === "string" && isKnown(parsed.coverImage) ? parsed.coverImage : "",
      tags: categories.length > 0 ? categories : [parsed.projectType],
      status: "published",
      body: buildArchiveBody(parsed),
      archive: {
        currentStatus: parsed.currentStatus,
        projectType: parsed.projectType,
        industry: parsed.industry,
        documentationScore: parsed.documentationScore,
        priorityScore: parsed.priorityScore,
        sourceCount: parsed.sourceIds.length,
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
