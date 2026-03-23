"use client"

import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/** Curseur décoratif (desktop) — style pointeur simple */
export function FakeCursor({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-30 drop-shadow-md",
        "hidden md:block",
        className
      )}
      style={style}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-foreground"
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill="currentColor"
          stroke="white"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
