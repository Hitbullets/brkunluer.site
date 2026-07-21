import Link from "next/link"
import { ImageWrapper } from "@/components/ui/image-wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check } from "lucide-react"
import type { Method } from "@/lib/types"

interface Props {
  method: Method
}

export function MethodCard({ method }: Props) {
  const priceText = `${method.currency} ${method.price.toLocaleString("tr-TR")}`

  return (
    <Link href={`/metotlar/${method.slug}`}>
      <Card variant="method" interactive className="overflow-hidden h-full flex flex-col">
        {method.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <ImageWrapper src={method.coverImage} alt={method.title} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            <div className="absolute top-3 right-3">
              <Badge variant="accent" className="text-xs font-medium">
                {priceText}
              </Badge>
            </div>
          </div>
        )}

        <CardHeader className="flex-1">
          <CardTitle className="text-heading-sm">{method.title}</CardTitle>
          <CardDescription className="line-clamp-2">{method.tagline}</CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <ul className="space-y-2">
            {method.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <span>{feature}</span>
              </li>
            ))}
            {method.features.length > 3 && (
              <li className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                +{method.features.length - 3} özellik daha
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </Link>
  )
}