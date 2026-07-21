export function calculateReadingTime(content: string): number {
  const turkishWordsPerMinute = 200
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / turkishWordsPerMinute))
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TocItem[] = []

  let match: RegExpExecArray | null = headingRegex.exec(content)
  while (match) {
    const level = match[1]!.length
    const text = match[2]!.replace(/[*_~]/g, '')
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u00c0-\u024f\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    items.push({ id, text, level })
    match = headingRegex.exec(content)
  }

  return items
}