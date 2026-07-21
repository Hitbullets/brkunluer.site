import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Article, Method, Project, TagInfo } from "./types"
import { articleSchema, methodSchema, projectSchema } from "./validations"

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

async function loadProjects(): Promise<Project[]> {
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
        ...parsed,
        body,
        slug: file.replace(markdownFilePattern, ""),
      } as Project)
    }
  }

  return projects
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
