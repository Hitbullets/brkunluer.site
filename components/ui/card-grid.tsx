import { cn } from "@/lib/utils"

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
}

export function CardGrid({
  className,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  children,
  ...props
}: CardGridProps) {
  const gridCols =
    typeof columns === "number"
      ? columns
      : `grid-cols-1 ${columns.sm ? `sm:grid-cols-${columns.sm}` : ""} ${columns.md ? `md:grid-cols-${columns.md}` : ""} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ""} ${columns.xl ? `xl:grid-cols-${columns.xl}` : ""}`

  return (
    <div
      className={cn(
        "grid",
        gridCols,
        `gap-${gap}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}