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
    if (removable && e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onRemove?.()
    }
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
      tabIndex={clickable || removable ? 0 : undefined}
      role={clickable ? "button" : undefined}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove?.() }}
          className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="Remove tag"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Component>
  )
}