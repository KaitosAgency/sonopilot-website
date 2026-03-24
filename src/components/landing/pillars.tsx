"use client"

import { useMemo } from "react"
import { useI18n } from "@/components/providers/i18n-provider"
import {
  PillarAnimatedRow,
  PillarsAnimatedHeader,
  type PillarMotionData,
  type PillarIconKey,
} from "./pillar-motion"
import { SectionKicker } from "./section-kicker"
import { SectionTopCurve } from "./section-curve"

/** Fichier : `website/public/images/screenshots/sonopilot_sc_artists_details.jpg` */
const ARTISTS_SCREENSHOT =
  "/images/screenshots/sonopilot_sc_artists_details.jpg?v=3"

const PILLAR_IMAGES: Record<
  PillarIconKey,
  { image: string }
> = {
  fanbase: { image: "/images/screenshots/sonopilot_sc_audience.jpg" },
  artists: { image: ARTISTS_SCREENSHOT },
  hub: { image: "/images/screenshots/sonopilot_track_overview.jpg" },
}

export function Pillars() {
  const { messages } = useI18n()
  const p = messages.pillars

  const pillars: PillarMotionData[] = useMemo(
    () =>
      p.items.map((item) => ({
        iconKey: item.iconKey as PillarIconKey,
        label: item.label,
        manifesto: item.manifesto,
        description: item.description,
        image: PILLAR_IMAGES[item.iconKey as PillarIconKey].image,
        imageAlt: item.imageAlt,
      })),
    [p.items]
  )

  return (
    <section id="produit" className="relative bg-card py-20 md:py-28">
      <SectionTopCurve fill="card" className="h-12 md:h-16" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PillarsAnimatedHeader>
          <SectionKicker>{p.kicker}</SectionKicker>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {p.title}
          </h2>
          <p className="mt-5 text-lg font-medium leading-snug text-foreground sm:text-xl">
            {p.lead}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light text-muted-foreground">
            {p.sub}
          </p>
        </PillarsAnimatedHeader>

        <div className="space-y-16 md:space-y-24">
          {pillars.map((pillar, i) => (
            <PillarAnimatedRow key={pillar.label} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
