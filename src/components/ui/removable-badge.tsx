"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge, type BadgeProps } from "@/components/ui/badge"

export interface RemovableBadgeProps
  extends Omit<BadgeProps, "onClick"> {
  onRemove: () => void
  disabled?: boolean
}

const RemovableBadge = React.forwardRef<HTMLDivElement, RemovableBadgeProps>(
  (
    { className, children, onRemove, disabled, variant = "default", ...props },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled) onRemove()
    }

    return (
      <Badge
        ref={ref}
        variant={variant}
        className={cn(
          "group cursor-pointer transition-all duration-200 hover:bg-secondary hover:text-white",
          disabled &&
            "pointer-events-none cursor-not-allowed opacity-50 hover:bg-primary hover:text-white",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span>{children}</span>
        <span className="flex w-0 items-center justify-end overflow-hidden opacity-0 transition-all duration-200 group-hover:w-4 group-hover:opacity-100">
          <X className="h-3 w-3 shrink-0" aria-hidden />
        </span>
      </Badge>
    )
  }
)
RemovableBadge.displayName = "RemovableBadge"

export { RemovableBadge }
