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