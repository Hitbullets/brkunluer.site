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