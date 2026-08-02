# Paylasilan UI Bilesenleri

## Button

- Kaynak: `components/ui/button.tsx`
- Aciklama: CVA tabanli buton varyantlari ve yuklenme durumu.

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'rounded-full bg-primary text-primary-foreground shadow-md shadow-brand-700/20 hover:bg-brand-800 hover:shadow-lg hover:shadow-brand-700/30 dark:hover:bg-brand-300 active:bg-brand-900 dark:active:bg-brand-200',
        secondary:
          'rounded-full bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:bg-secondary/80 active:bg-secondary',
        outline:
          'rounded-full border-2 border-border bg-background hover:border-brand-600/30 hover:bg-secondary/50 active:bg-secondary',
        ghost:
          'rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/70 active:bg-secondary',
        link:
          'text-brand-600 underline-offset-4 hover:underline underline-offset-4',
        destructive:
          'rounded-full bg-destructive text-destructive-foreground shadow-sm hover:shadow-md hover:bg-destructive/90 active:bg-destructive',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 rounded-full px-4 text-xs',
        lg: 'h-11 px-7',
        xl: 'h-12 px-9 text-base',
        icon: 'h-10 w-10 rounded-full',
        'icon-sm': 'h-8 w-8 rounded-full',
        'icon-lg': 'h-12 w-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

## Card

- Kaynak: `components/ui/card.tsx`
- Aciklama: Kart yuzeyi, baslik, icerik ve alt alan parcalari.

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-2xl border bg-card text-card-foreground transition-all duration-400",
  {
    variants: {
      variant: {
        default: "border-border/60 shadow-sm shadow-black/[0.03]",
        hover: "border-border/60 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-brand-600/5 hover:border-brand-300/30 dark:hover:border-brand-700/30 hover:-translate-y-0.5",
        feature: "border-2 border-border/60 shadow-sm shadow-black/[0.03] hover:shadow-lg hover:shadow-brand-600/5 hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:-translate-y-0.5",
        accent: "border-l-4 border-l-brand-600 dark:border-l-brand-400 border-border/60",
        elevated: "border-0 shadow-lg shadow-black/[0.06] dark:shadow-black/[0.15]",
        ghost: "border-transparent shadow-none",
        article: "border-border/60 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-brand-600/5 hover:border-brand-300/30 dark:hover:border-brand-700/30 hover:-translate-y-0.5",
        method: "border-border/60 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-brand-600/5 hover:border-brand-300/30 dark:hover:border-brand-700/30 hover:-translate-y-0.5",
        project: "border-border/60 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-brand-600/5 hover:border-brand-300/30 dark:hover:border-brand-700/30 hover:-translate-y-0.5",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0",
      },
      interactive: {
        true: "cursor-pointer active:scale-[0.99]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      interactive: false,
    },
  },
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, padding, interactive, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, padding, interactive, className }))}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-xl font-semibold leading-tight tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
```

## Badge

- Kaynak: `components/ui/badge.tsx`
- Aciklama: Kucuk kategori ve durum etiketi.

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-border text-foreground",
        accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        success: "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-500/80",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
```

## Tag

- Kaynak: `components/ui/tag.tsx`
- Aciklama: Tiklanabilir ve kaldirilabilir etiket.

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  removable?: boolean
  onRemove?: () => void
  clickable?: boolean
  onClick?: () => void
}

export function Tag({
  className,
  removable,
  onRemove,
  clickable,
  onClick,
  children,
  ...props
}: TagProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onClick?.()
    }
  }

  const Component = clickable ? "button" : "span"

  return (
    <Component
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-sm font-medium transition-colors",
        removable && "pr-1",
        clickable && "cursor-pointer hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      onClick={clickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? "button" : undefined}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove?.() }}
          className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Etiketi kaldır"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Component>
  )
}
```

## Input

- Kaynak: `components/ui/input.tsx`
- Aciklama: Erisilebilir metin girisi.

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, "aria-describedby": ariaDescribedby, ...props }, ref) => {
    const errorId = ariaDescribedby?.includes("error") ? ariaDescribedby : undefined
    const successId = ariaDescribedby?.includes("success") ? ariaDescribedby : undefined

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          errorId && "border-destructive focus-visible:ring-destructive",
          successId && "border-green-500 focus-visible:ring-green-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
```

## Textarea

- Kaynak: `components/ui/textarea.tsx`
- Aciklama: Erisilebilir cok satirli metin girisi.

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, "aria-describedby": ariaDescribedby, ...props }, ref) => {
    const errorId = ariaDescribedby?.includes("error") ? ariaDescribedby : undefined
    const successId = ariaDescribedby?.includes("success") ? ariaDescribedby : undefined

    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          errorId && "border-destructive focus-visible:ring-destructive",
          successId && "border-green-500 focus-visible:ring-green-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
```

## SectionHeader, PageHeader, CardHeaderComponent

- Kaynak: `components/ui/section-header.tsx`
- Aciklama: Bolum, sayfa ve kart baslik kaliplari.

```tsx
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
      <h1 className="text-display-md font-bold tracking-tight">{title.toLocaleUpperCase("tr-TR")}</h1>
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
```

## CardGrid

- Kaynak: `components/ui/card-grid.tsx`
- Aciklama: Duyarli kart izgara sarmalayicisi.

```tsx
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
```