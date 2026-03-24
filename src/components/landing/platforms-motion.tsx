"use client"

import { Children, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  BandcampIcon,
  BeatportIcon,
  SpotifyIcon,
  TiktokIcon,
  YoutubeIcon,
} from "./how-it-works/demos/platform-social-icons"
import { SoundCloudIcon } from "./how-it-works/demos/soundcloud-icon"
import {
  useInViewOnce,
  useReducedMotion,
} from "./how-it-works/demos/use-demo-animation"

const HD_STAGGER_MS = 108
const CARD_STAGGER_MS = 72
const BADGE_DELAY_AFTER_CARD_MS = 320

const PLATFORM_ICONS = {
  soundcloud: SoundCloudIcon,
  youtube: YoutubeIcon,
  bandcamp: BandcampIcon,
  beatport: BeatportIcon,
  tiktok: TiktokIcon,
  spotify: SpotifyIcon,
} as const

export type PlatformIconKey = keyof typeof PLATFORM_ICONS

export type PlatformCardData = {
  iconKey: PlatformIconKey
  name: string
  active: boolean
}

export function PlatformsAnimatedHeader({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.16)
  const active = reduced || inView
  const blocks = Children.toArray(children)

  return (
    <div ref={ref} className="mx-auto mb-14 max-w-2xl text-center">
      {blocks.map((child, i) => (
        <div
          key={i}
          className={cn(
            !reduced && !active && "opacity-0",
            active && !reduced && "animate-platform-hd-fade-up"
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

export function PlatformsAnimatedGrid({
  platforms,
  badgeActive,
  badgeSoon,
}: {
  platforms: readonly PlatformCardData[]
  badgeActive: string
  badgeSoon: string
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.12)
  const rootActive = reduced || inView

  return (
    <div
      ref={ref}
      className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
    >
      {platforms.map((platform, i) => {
        const Icon = PLATFORM_ICONS[platform.iconKey]
        const cardDelay = i * CARD_STAGGER_MS
        const badgeDelay =
          platform.active && rootActive && !reduced
            ? cardDelay + BADGE_DELAY_AFTER_CARD_MS
            : undefined

        return (
          <div
            key={platform.name}
            className={cn(
              !reduced && !rootActive && "opacity-0",
              rootActive &&
                !reduced &&
                (platform.active
                  ? "animate-platform-card-in-active"
                  : "animate-platform-card-in")
            )}
            style={
              rootActive && !reduced
                ? { animationDelay: `${cardDelay}ms` }
                : undefined
            }
          >
            <div
              className={cn(
                "relative flex flex-col items-center gap-3 rounded-xl border p-5 transition-transform hover:scale-105",
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
                <span
                  className={cn(
                    "absolute -right-2 -top-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm dark:bg-green-500",
                    rootActive &&
                      !reduced &&
                      "animate-platform-badge-settle"
                  )}
                  style={
                    badgeDelay != null
                      ? { animationDelay: `${badgeDelay}ms` }
                      : undefined
                  }
                >
                  {badgeActive}
                </span>
              ) : (
                <span className="absolute -right-2 -top-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {badgeSoon}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
