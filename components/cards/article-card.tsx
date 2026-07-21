import Link from "next/link"
import { ImageWrapper } from "@/components/ui/image-wrapper"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Article } from "@/lib/types"

interface Props {
  article: Article
  variant?: "horizontal" | "vertical"
}

export function ArticleCard({ article }: Props) {
  return (
    <Link href={`/yazilar/${article.slug}`}>
      <Card variant="article" interactive className="overflow-hidden h-full flex flex-col">
        {article.coverImage && (<div className="relative h-48 w-full overflow-hidden"><ImageWrapper src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /></div>)}

        <CardHeader className="flex-1">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-heading-sm line-clamp-2">{article.title}</CardTitle>
          <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt)}
            {article.updatedAt && <span>· Güncellendi: {formatDate(article.updatedAt)}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
