import type { ComponentType } from "react"

import { AnimateOnScroll } from "./animate-on-scroll"
import {
  BandcampIcon,
  BeatportIcon,
  SpotifyIcon,
  TiktokIcon,
  YoutubeIcon,
} from "./how-it-works/demos/platform-social-icons"
import { SoundCloudIcon } from "./how-it-works/demos/soundcloud-icon"
import { cn } from "@/lib/utils"

type PlatformIcon = ComponentType<{ className?: string; size?: number }>

const platforms: { name: string; active: boolean; Icon: PlatformIcon }[] = [
  { name: "SoundCloud", active: true, Icon: SoundCloudIcon },
  { name: "YouTube", active: false, Icon: YoutubeIcon },
  { name: "Bandcamp", active: false, Icon: BandcampIcon },
  { name: "Beatport", active: false, Icon: BeatportIcon },
  { name: "TikTok", active: false, Icon: TiktokIcon },
  { name: "Spotify", active: false, Icon: SpotifyIcon },
]

export function Platforms() {
  return (
    <section id="plateformes" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Tous tes réseaux.
              <br className="hidden sm:block" />
              Un seul tableau de bord.
            </h2>
            <p className="mt-4 font-light text-muted-foreground">
              SoundCloud est la première intégration — les autres arrivent.
              Inscris-toi pour influencer la prochaine.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {platforms.map((platform) => {
              const Icon = platform.Icon
              return (
                <div
                  key={platform.name}
                  className={cn(
                    "relative flex flex-col items-center gap-3 rounded-xl border p-5 transition-all hover:scale-105",
                    platform.active
                      ? "border-primary/45 bg-primary/[0.06] shadow-sm dark:border-primary/40 dark:bg-primary/10"
                      : "border-border/60 bg-card opacity-60"
                  )}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center [&_svg]:max-h-full [&_svg]:max-w-full">
                    <Icon
                      size={32}
                      className={cn(
                        platform.active
                          ? "text-primary"
                          : "text-muted-foreground/50"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      platform.active
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {platform.name}
                  </span>
                  {platform.active ? (
                    <span className="absolute -right-2 -top-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm dark:bg-green-500">
                      Actif
                    </span>
                  ) : (
                    <span className="absolute -right-2 -top-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Bientôt
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
