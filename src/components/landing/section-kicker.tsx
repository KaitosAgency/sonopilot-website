import { cn } from "@/lib/utils"

/** Base commune au badge « Alpha gratuite » du Hero et aux sur-titres de section. */
const eyebrowBadgeBase =
  "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium"

export const sectionEyebrowClasses = cn(
  eyebrowBadgeBase,
  "bg-primary/10 text-primary"
)

export const sectionEyebrowOnPrimaryClasses = cn(
  eyebrowBadgeBase,
  "bg-primary-foreground/15 text-primary-foreground"
)

type SectionKickerProps = {
  children: React.ReactNode
  className?: string
  /** Sur fond primary (ex. CTA alpha) */
  onPrimary?: boolean
}

export function SectionKicker({
  children,
  className,
  onPrimary,
}: SectionKickerProps) {
  return (
    <span
      className={cn(
        "mb-3",
        onPrimary ? sectionEyebrowOnPrimaryClasses : sectionEyebrowClasses,
        className
      )}
    >
      {children}
    </span>
  )
}
