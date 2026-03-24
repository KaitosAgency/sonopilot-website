import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const LOGO = "/images/Logo/logo-sonopilot-full-color-01.svg"

/** Badge « vérifié » (forme scaloppée) — paths alignés sur Lucide `badge-check` */
function VerifiedBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 shrink-0 text-green-600", className)}
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

export function ProblemMutedShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-visible rounded-xl bg-muted/35 p-4 sm:p-5 md:p-6",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ComparisonColumnTitle({
  variant,
  labelSans,
  labelAvec,
}: {
  variant: "sans" | "avec"
  labelSans: string
  labelAvec: string
}) {
  const isSans = variant === "sans"
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 mb-6",
        isSans ? "text-destructive/90" : "text-primary"
      )}
    >
      <span className="text-lg font-semibold tracking-tight sm:text-xl">
        {isSans ? labelSans : labelAvec}
      </span>
      <span className="inline-flex bg-transparent leading-none">
        <img
          src={LOGO}
          alt=""
          className="block h-6 w-auto max-h-[1.75rem] sm:h-7 sm:max-h-[1.85rem] bg-transparent object-contain object-left"
          decoding="async"
          draggable={false}
        />
      </span>
    </div>
  )
}

export function ComparisonColumnCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl h-full bg-card shadow-sm p-6 sm:p-8 min-h-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BenefitStackItem({
  title,
  body,
  index,
  fallMotion,
}: {
  title: string
  body: string
  index: number
  /** Animation entrée : fade + léger lift (sans scale — évite le flou texte après anim GPU) */
  fallMotion?: { active: boolean; reduced: boolean }
}) {
  const fm = fallMotion
  const animates = Boolean(fm && !fm.reduced)
  const deckVisible = !fm || fm.reduced || fm.active
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-shadow duration-300 hover:z-30 hover:shadow-md",
        index > 0 && "-mt-3 sm:-mt-4",
        index % 2 === 1 && "ml-0 sm:ml-5",
        index % 2 === 0 && "mr-0 sm:mr-4",
        deckVisible && index % 2 === 1 && "rotate-[1.5deg]",
        deckVisible && index % 2 === 0 && "-rotate-[0.5deg]",
        fm && !fm.reduced && !fm.active && "opacity-0",
        animates && fm?.active && "animate-problem-sans-stagger"
      )}
      style={{
        zIndex: index + 1,
        animationDelay:
          animates && fm?.active ? `${index * 132}ms` : undefined,
      }}
    >
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0">
          <VerifiedBadgeIcon />
        </span>
        <div>
          <p className="font-semibold text-green-800 dark:text-green-400 text-sm sm:text-base">
            {title}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProblemScreenshotFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-primary/30 bg-background shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}
