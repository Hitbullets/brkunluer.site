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