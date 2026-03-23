import type { ReactNode } from "react"
import { Flame, Heart, MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"

type LiveIcon = typeof Heart

const PARTICLES: {
  Icon: LiveIcon
  left: number
  delay: number
  duration: number
  size: number
  className: string
  drift: string
  rotStart: string
  rotEnd: string
  peak: string
}[] = [
  { Icon: Heart, left: 3, delay: 0, duration: 3.5, size: 15, className: "text-primary/75", drift: "-6px", rotStart: "-14deg", rotEnd: "8deg", peak: "0.9" },
  { Icon: Flame, left: 11, delay: 0.35, duration: 4.1, size: 14, className: "text-primary/70", drift: "9px", rotStart: "6deg", rotEnd: "-12deg", peak: "0.85" },
  { Icon: MessageCircle, left: 18, delay: 0.9, duration: 3.7, size: 14, className: "text-primary/72", drift: "-11px", rotStart: "-8deg", rotEnd: "10deg", peak: "0.82" },
  { Icon: Heart, left: 26, delay: 0.15, duration: 3.9, size: 13, className: "text-primary/65", drift: "7px", rotStart: "10deg", rotEnd: "-6deg", peak: "0.78" },
  { Icon: Flame, left: 33, delay: 1.1, duration: 3.4, size: 15, className: "text-primary/68", drift: "-4px", rotStart: "-6deg", rotEnd: "14deg", peak: "0.88" },
  { Icon: MessageCircle, left: 41, delay: 0.5, duration: 4.2, size: 13, className: "text-primary/68", drift: "12px", rotStart: "-12deg", rotEnd: "4deg", peak: "0.8" },
  { Icon: Heart, left: 48, delay: 1.4, duration: 3.6, size: 14, className: "text-primary/72", drift: "-9px", rotStart: "4deg", rotEnd: "-10deg", peak: "0.86" },
  { Icon: Flame, left: 55, delay: 0.65, duration: 3.8, size: 13, className: "text-primary/62", drift: "5px", rotStart: "-10deg", rotEnd: "8deg", peak: "0.76" },
  { Icon: MessageCircle, left: 62, delay: 1.25, duration: 4, size: 15, className: "text-primary/74", drift: "-7px", rotStart: "12deg", rotEnd: "-8deg", peak: "0.84" },
  { Icon: Heart, left: 69, delay: 0.25, duration: 3.55, size: 12, className: "text-primary/68", drift: "8px", rotStart: "-4deg", rotEnd: "6deg", peak: "0.8" },
  { Icon: Flame, left: 76, delay: 1.55, duration: 3.65, size: 14, className: "text-primary/72", drift: "-12px", rotStart: "8deg", rotEnd: "-14deg", peak: "0.83" },
  { Icon: MessageCircle, left: 84, delay: 0.8, duration: 4.15, size: 13, className: "text-primary/66", drift: "6px", rotStart: "-14deg", rotEnd: "10deg", peak: "0.79" },
  { Icon: Heart, left: 91, delay: 1.7, duration: 3.45, size: 14, className: "text-primary/70", drift: "-5px", rotStart: "6deg", rotEnd: "-4deg", peak: "0.87" },
  { Icon: Flame, left: 7, delay: 2.1, duration: 3.75, size: 12, className: "text-primary/58", drift: "11px", rotStart: "-8deg", rotEnd: "12deg", peak: "0.74" },
  { Icon: MessageCircle, left: 22, delay: 2.4, duration: 3.85, size: 14, className: "text-primary/70", drift: "-8px", rotStart: "10deg", rotEnd: "-6deg", peak: "0.81" },
  { Icon: Heart, left: 38, delay: 2.65, duration: 3.5, size: 13, className: "text-primary/66", drift: "4px", rotStart: "-12deg", rotEnd: "8deg", peak: "0.77" },
  { Icon: Flame, left: 52, delay: 1.95, duration: 4.05, size: 15, className: "text-primary/74", drift: "-10px", rotStart: "4deg", rotEnd: "-10deg", peak: "0.86" },
  { Icon: MessageCircle, left: 66, delay: 2.85, duration: 3.6, size: 12, className: "text-primary/64", drift: "9px", rotStart: "-6deg", rotEnd: "14deg", peak: "0.75" },
  { Icon: Heart, left: 79, delay: 2.2, duration: 3.95, size: 14, className: "text-primary/73", drift: "-3px", rotStart: "14deg", rotEnd: "-12deg", peak: "0.84" },
  { Icon: Flame, left: 14, delay: 3.1, duration: 3.55, size: 13, className: "text-primary/66", drift: "7px", rotStart: "-4deg", rotEnd: "6deg", peak: "0.8" },
  { Icon: MessageCircle, left: 45, delay: 3.35, duration: 3.7, size: 15, className: "text-primary/76", drift: "-11px", rotStart: "8deg", rotEnd: "-8deg", peak: "0.82" },
  { Icon: Heart, left: 58, delay: 3.6, duration: 4.1, size: 13, className: "text-primary/69", drift: "5px", rotStart: "-10deg", rotEnd: "10deg", peak: "0.78" },
  { Icon: Flame, left: 72, delay: 0.45, duration: 3.25, size: 12, className: "text-primary/60", drift: "-6px", rotStart: "6deg", rotEnd: "-6deg", peak: "0.72" },
  { Icon: MessageCircle, left: 88, delay: 2.5, duration: 3.8, size: 14, className: "text-primary/71", drift: "10px", rotStart: "-14deg", rotEnd: "4deg", peak: "0.83" },
]

/** Colonne : fondu transparent haut / bas, opacité pleine au centre */
const COLUMN_VERTICAL_MASK =
  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)"

function LiveReactionsParticles({
  clipOverflow = true,
  edgeVerticalFade = false,
}: {
  clipOverflow?: boolean
  /** Variante colonne : masque vertical (pas de voile couleur par-dessus) */
  edgeVerticalFade?: boolean
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        clipOverflow ? "overflow-hidden" : "overflow-visible"
      )}
      style={
        edgeVerticalFade
          ? {
              maskImage: COLUMN_VERTICAL_MASK,
              WebkitMaskImage: COLUMN_VERTICAL_MASK,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }
          : undefined
      }
      aria-hidden
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={cn(
            "problem-live-particle absolute bottom-0 will-change-transform",
            p.className
          )}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift-x" as string]: p.drift,
            ["--rot-start" as string]: p.rotStart,
            ["--rot-end" as string]: p.rotEnd,
            ["--peak-op" as string]: p.peak,
          }}
        >
          <p.Icon size={p.size} strokeWidth={2} />
        </span>
      ))}
    </div>
  )
}

/**
 * Icônes façon live (cœur / flamme / commentaire).
 * - `text` : dégradé + contenu par-dessus (lisibilité sur un paragraphe).
 * - `column` : bandeau à côté d’un titre, icônes qui remontent sans masquer de texte.
 */
export function LiveReactionsBackdrop({
  children,
  className,
  gradientClassName,
  variant = "text",
}: {
  children?: ReactNode | null
  className?: string
  gradientClassName?: string
  variant?: "text" | "column"
}) {
  const isColumn = variant === "column"

  return (
    <div
      className={cn(
        "relative",
        isColumn ? "overflow-visible" : "overflow-hidden",
        className
      )}
      aria-hidden={isColumn}
    >
      <LiveReactionsParticles
        clipOverflow={!isColumn}
        edgeVerticalFade={isColumn}
      />
      {isColumn ? null : (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-card from-35% via-card/55 via-70% to-transparent",
            gradientClassName
          )}
          aria-hidden
        />
      )}
      {!isColumn && children != null ? (
        <div className="relative z-[2]">{children}</div>
      ) : null}
    </div>
  )
}
