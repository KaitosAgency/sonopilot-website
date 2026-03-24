"use client"

import { useI18n } from "@/components/providers/i18n-provider"
import { cn } from "@/lib/utils"

/** Même forme « badge » que la section Problème (pas un rond plein) — couleur primary */
function TrustBadgeCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 shrink-0 text-primary", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      />
      <path
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 12 2 2 4-4"
      />
    </svg>
  )
}

/**
 * Bandeau confiance — entre le marquee (preuve produit) et les chiffres (Stats).
 */
export function TrustBar() {
  const { messages } = useI18n()
  const items = messages.trust.items

  return (
    <section className="border-y border-border/60 bg-card/80 py-5 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-4 gap-x-8 sm:gap-x-14 md:gap-x-16">
          {items.map((text) => (
            <div
              key={text}
              className="flex items-center gap-2.5 text-foreground/85"
            >
              <TrustBadgeCheck />
              <span className="text-sm font-medium tracking-tight sm:text-[0.9375rem]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
