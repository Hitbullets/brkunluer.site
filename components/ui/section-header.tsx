import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

interface SectionHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
    variant?: "primary" | "secondary" | "outline" | "ghost"
  }
  className?: string
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-heading-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="mt-1 text-body text-muted-foreground">{description}</p>}
        </div>
        {action && (
          <Button asChild variant={action.variant || "outline"} size="sm">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  className?: string
}

export function PageHeader({ title, description, badge, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-12", className)}>
      {badge && (
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-display-md font-bold tracking-tight">{title}</h1>
      {description && <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl">{description}</p>}
    </header>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function CardHeaderComponent({ title, description, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-6 pb-0", className)} {...props}>
      <div className="flex-1">
        <h3 className="text-heading-sm font-semibold">{title}</h3>
        {description && <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0 mt-4 sm:mt-0">{action}</div>}
    </div>
  )
}