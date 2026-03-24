"use client"

import { useI18n } from "@/components/providers/i18n-provider"
import { SectionKicker } from "./section-kicker"
import {
  PlatformsAnimatedGrid,
  PlatformsAnimatedHeader,
  type PlatformCardData,
} from "./platforms-motion"

const platforms: PlatformCardData[] = [
  { iconKey: "soundcloud", name: "SoundCloud", active: true },
  { iconKey: "youtube", name: "YouTube", active: false },
  { iconKey: "bandcamp", name: "Bandcamp", active: false },
  { iconKey: "beatport", name: "Beatport", active: false },
  { iconKey: "tiktok", name: "TikTok", active: false },
  { iconKey: "spotify", name: "Spotify", active: false },
]

export function Platforms() {
  const { messages } = useI18n()
  const pl = messages.platforms

  return (
    <section id="plateformes" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PlatformsAnimatedHeader>
          <SectionKicker>{pl.kicker}</SectionKicker>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {pl.titleLine1}
            <br className="hidden sm:block" />
            {pl.titleLine2}
          </h2>
          <p className="mt-4 font-light text-muted-foreground">{pl.sub}</p>
        </PlatformsAnimatedHeader>

        <PlatformsAnimatedGrid
          platforms={platforms}
          badgeActive={pl.badgeActive}
          badgeSoon={pl.badgeSoon}
        />
      </div>
    </section>
  )
}
