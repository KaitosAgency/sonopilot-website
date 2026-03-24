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
  return (
    <section id="plateformes" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PlatformsAnimatedHeader>
          <SectionKicker>Plateformes</SectionKicker>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tous tes réseaux.
            <br className="hidden sm:block" />
            Un seul tableau de bord.
          </h2>
          <p className="mt-4 font-light text-muted-foreground">
            SoundCloud est la première intégration — les autres arrivent.
            Inscris-toi pour influencer la prochaine.
          </p>
        </PlatformsAnimatedHeader>

        <PlatformsAnimatedGrid platforms={platforms} />
      </div>
    </section>
  )
}
