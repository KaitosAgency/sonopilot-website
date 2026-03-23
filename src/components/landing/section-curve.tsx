import { cn } from "@/lib/utils"

/** Courbe centrée (arche unique) — remplit le fond de la section courante, bosse vers le haut. */
const FILLS = {
  card: "hsl(var(--card))",
  background: "hsl(var(--background))",
  primary: "hsl(var(--primary))",
} as const

export type SectionCurveFill = keyof typeof FILLS

/** Arche symétrique, un seul sommet au centre (pas de vagues). */
const ARCH_TOP_PATH = "M0 72 L0 46 Q720 8 1440 46 L1440 72 Z"

/** Même arche, inversée : bord haut droit, courbe en bas (jonction avec la section suivante). */
const ARCH_BOTTOM_PATH = "M0 0 L1440 0 L1440 26 Q720 64 0 26 Z"

type SectionTopCurveProps = {
  fill: SectionCurveFill
  className?: string
}

/**
 * À placer en premier enfant d’une `<section className="relative ...">`.
 * À alterner avec des sections sans courbe pour des jonctions droites.
 */
export function SectionTopCurve({ fill, className }: SectionTopCurveProps) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-full z-[1] h-10 w-full md:h-14",
        className
      )}
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
    >
      <path fill={FILLS[fill]} d={ARCH_TOP_PATH} />
    </svg>
  )
}

type SectionBottomCurveProps = {
  fill: SectionCurveFill
  className?: string
}

/** Dernier enfant d’une `<section className="relative ...">` — bord supérieur droit, arche vers le bas. */
export function SectionBottomCurve({ fill, className }: SectionBottomCurveProps) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-full z-[1] h-10 w-full md:h-14",
        className
      )}
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
    >
      <path fill={FILLS[fill]} d={ARCH_BOTTOM_PATH} />
    </svg>
  )
}
