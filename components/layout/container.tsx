import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full"
}

export function Container({ className, size = "default", children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-[640px]": size === "narrow",
          "max-w-[1024px]": size === "default",
          "max-w-[1280px]": size === "wide",
          "max-w-full": size === "full",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
}

export function Grid({ className, cols = { sm: 1, md: 2, lg: 3 }, gap = 6, children, ...props }: GridProps) {
  const gridCols =
    typeof cols === "number"
      ? cols
      : `grid-cols-1 ${cols.sm ? `sm:grid-cols-${cols.sm}` : ""} ${cols.md ? `md:grid-cols-${cols.md}` : ""} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ""} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ""}`

  return (
    <div className={cn("grid", gridCols, `gap-${gap}`, className)} {...props}>
      {children}
    </div>
  )
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal"
  space?: number
  wrap?: boolean
}

export function Stack({ className, direction = "vertical", space = 4, wrap = false, children, ...props }: StackProps) {
  const isHorizontal = direction === "horizontal"
  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row" : "flex-col",
        wrap && "flex-wrap",
        isHorizontal ? `gap-x-${space}` : `gap-y-${space}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

export function Section({ className, size = "lg", children, ...props }: SectionProps) {
  const padding = {
    sm: "py-12",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  }[size]

  return (
    <section className={cn(padding, className)} {...props}>
      {children}
    </section>
  )
}

export function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-border", className)} {...props} />
}