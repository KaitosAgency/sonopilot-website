"use client"

import { Disc3, LayoutDashboard, Users } from "lucide-react"
import { LandingClickableImage } from "./landing-clickable-image"
import { Children, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  useInViewOnce,
  useReducedMotion,
} from "./how-it-works/demos/use-demo-animation"

const HD_STAGGER_MS = 108
const ROW_TEXT_DELAY_MS = 0
const ROW_IMAGE_DELAY_MS = 140

const PILLAR_ICONS = {
  fanbase: Users,
  artists: Disc3,
  hub: LayoutDashboard,
} as const

export type PillarIconKey = keyof typeof PILLAR_ICONS

/** Données sérialisables (passées depuis le Server Component). */
export type PillarMotionData = {
  iconKey: PillarIconKey
  label: string
  manifesto: string
  description: string
  image: string
  imageAlt: string
}

/**
 * En-tête de section : kicker → titre → chapô (scroll + décalage), réutilisable (Produit, Parcours, etc.).
 */
export function PillarsAnimatedHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.16)
  const active = reduced || inView
  const blocks = Children.toArray(children)

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto mb-16 min-w-0 max-w-3xl text-center",
        className
      )}
    >
      {blocks.map((child, i) => (
        <div
          key={i}
          className={cn(
            !reduced && !active && "opacity-0",
            active && !reduced && "animate-pillar-hd-fade-up"
          )}
          style={
            active && !reduced
              ? { animationDelay: `${i * HD_STAGGER_MS}ms` }
              : undefined
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}

/**
 * Un pilier : texte en fade-up, capture depuis le côté extérieur en desktop (zigzag), léger lift en mobile.
 */
export function PillarAnimatedRow({
  pillar,
  index,
}: {
  pillar: PillarMotionData
  index: number
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.14)
  const active = reduced || inView
  const reverseLayout = index % 2 === 1
  const Icon = PILLAR_ICONS[pillar.iconKey]

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-8 md:gap-12 items-center",
        reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div
        className={cn(
          "max-w-lg flex-1",
          !reduced && !active && "opacity-0",
          active && !reduced && "animate-pillar-text-reveal"
        )}
        style={
          active && !reduced
            ? { animationDelay: `${ROW_TEXT_DELAY_MS}ms` }
            : undefined
        }
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {pillar.label}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl">
          {pillar.manifesto}
        </h3>
        <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
          {pillar.description}
        </p>
      </div>

      <div className="w-full flex-1">
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-border/60 shadow-lg shadow-black/5",
            !reduced && !active && "opacity-0",
            active &&
              !reduced &&
              cn(
                "pillar-img-anim",
                reverseLayout ? "pillar-img-anim--rtl" : "pillar-img-anim--ltr"
              )
          )}
          style={
            active && !reduced
              ? { animationDelay: `${ROW_IMAGE_DELAY_MS}ms` }
              : undefined
          }
        >
          <LandingClickableImage
            src={pillar.image}
            alt={pillar.imageAlt}
            width={1440}
            height={900}
            quality={92}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  )
}
