"use client"

import { useState } from "react"
import {
  ExternalLink,
  Loader2,
  LogOut,
  MapPin,
  Settings,
  User,
  Zap,
} from "lucide-react"
import { useI18n } from "@/components/providers/i18n-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { SoundCloudIcon } from "./soundcloud-icon"

const PLATFORM_COLOR = "#ff5500"

/** Hauteur réservée au bloc profil (skeleton / données) — identique pour toutes les phases. */
export const PROFILE_BODY_HEIGHT_CLASS =
  "h-[15.125rem] min-h-[15.125rem] max-h-[15.125rem]"
/** Pied de carte : connexion, chargement ou pilotage — même hauteur partout. */
const CARD_FOOTER_CLASS =
  "flex h-[3.75rem] min-h-[3.75rem] max-h-[3.75rem] shrink-0 flex-col items-center justify-center rounded-lg bg-muted/30 px-3 py-0"

/** Pilule jeton : hauteur fixe, largeur au contenu (fit). */
const TOKEN_BADGE_BOX =
  "inline-flex h-[22px] min-h-[22px] max-h-[22px] shrink-0 items-center justify-start gap-1 whitespace-nowrap rounded-md px-1.5"

export type SoundCloudDemoPhase =
  | "disconnected"
  | "click"
  | "loading"
  | "connected"

const DEMO_STAT_VALUES = [2076, 467, 15, 3] as const
const SKELETON_STAT_SLOTS = 4

/** Corps de carte : titres, stats et lignes en skeleton (déconnecté + chargement + cartes décoratives). */
export function PlatformCardProfileSkeleton() {
  const bar = "rounded bg-muted"
  return (
    <div className="space-y-2" aria-hidden>
      <div className={cn("mx-auto h-6 w-[min(100%,180px)]", bar)} />
      <div className={cn("mx-auto h-3.5 w-24", bar)} />
      <div className="mx-auto flex min-h-[18px] items-center justify-center gap-1.5">
        <div className={cn("h-3 w-3 shrink-0 rounded-sm", bar)} />
        <div className={cn("h-3.5 w-40 max-w-full rounded-md", bar)} />
      </div>
      <div className="flex min-h-[24px] items-center justify-center">
        <div className={cn("h-5 w-20 rounded-full", bar)} />
      </div>
      <div className="grid min-h-[56px] grid-cols-4 gap-1.5 border-y border-border py-3 [grid-template-columns:repeat(4,minmax(0,1fr))]">
        {Array.from({ length: SKELETON_STAT_SLOTS }, (_, i) => (
          <div key={i} className="min-w-0 text-center">
            <div className={cn("mx-auto mb-0.5 h-4 w-8", bar)} />
            <div className={cn("mx-auto h-2.5 w-10", bar)} />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className={cn("mx-auto h-2.5 w-full max-w-[220px]", bar)} />
        <div className={cn("mx-auto h-2.5 w-full max-w-[190px]", bar)} />
      </div>
    </div>
  )
}

export function PlatformProfileCardDemo({
  phase,
  className,
  connectButtonClassName,
}: {
  phase: SoundCloudDemoPhase
  className?: string
  connectButtonClassName?: string
}) {
  const { messages, locale } = useI18n()
  const demo = messages.demos.platformProfile
  const planPrefix = messages.common.planPrefix
  const localeTag = locale === "fr" ? "fr-FR" : "en-US"
  const stats = [
    { label: demo.statFollowers, value: DEMO_STAT_VALUES[0] },
    { label: demo.statFollowing, value: DEMO_STAT_VALUES[1] },
    { label: demo.statTracks, value: DEMO_STAT_VALUES[2] },
    { label: demo.statPlaylists, value: DEMO_STAT_VALUES[3] },
  ]

  const [pilotingOn, setPilotingOn] = useState(true)

  const connected = phase === "connected"
  const loading = phase === "loading"
  const clicking = phase === "click"
  const showDisconnectedBody = phase === "disconnected" || clicking

  return (
    <Card
      className={cn(
        "relative mx-auto flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg shadow-black/5",
        className
      )}
    >
      <div
        className="relative h-[5.25rem] rounded-t-xl sm:h-24"
        style={{
          background: `linear-gradient(135deg, ${PLATFORM_COLOR} 0%, #1a1a2e 100%)`,
        }}
      >
        <div className="absolute left-3 top-3 z-[1] flex flex-col items-start gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center text-white/90">
              <SoundCloudIcon size={16} />
            </div>
            <span className="text-xs font-medium text-white/90">
              {demo.brandName}
            </span>
          </div>
          {connected ? (
            <div
              className={cn(TOKEN_BADGE_BOX, "bg-white shadow-sm")}
              title={demo.tokenTitleValid}
            >
              <span className="size-1 shrink-0 rounded-full bg-green-500" />
              <span className="text-[9px] font-medium tracking-wide text-green-600">
                {demo.tokenLabelValid}
              </span>
            </div>
          ) : loading ? (
            <div
              className={cn(TOKEN_BADGE_BOX, "bg-white/95 shadow-sm")}
              title={demo.tokenTitleLoading}
            >
              <Loader2 className="size-2.5 shrink-0 animate-spin text-primary" />
              <span className="text-[9px] font-medium tracking-wide text-foreground">
                {demo.tokenLabelLoading}
              </span>
            </div>
          ) : (
            <div
              className={cn(TOKEN_BADGE_BOX, "bg-white/15")}
              title={demo.tokenTitleUnlinked}
            >
              <span className="size-1 shrink-0 rounded-full bg-white/45" />
              <span className="text-[9px] font-medium tracking-wide text-white/85">
                {demo.tokenLabelUnlinked}
              </span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "absolute right-3 top-3 z-[1] flex flex-col items-end gap-0.5 transition-opacity",
            !connected && (loading || clicking) && "opacity-35",
            !connected && !loading && !clicking && "opacity-45"
          )}
        >
          <div className="flex items-center gap-0.5">
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"
              aria-hidden
            >
              <ExternalLink className="h-2.5 w-2.5 text-white/80" />
            </span>
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"
              aria-hidden
            >
              <Settings className="h-2.5 w-2.5 text-white/80" />
            </span>
          </div>
          <span
            className="flex h-5 w-5 items-center justify-center rounded-md bg-transparent text-white/60"
            aria-hidden
          >
            <LogOut className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>

      {/* Hors du bandeau : au-dessus du contenu (z-index), non rogné par overflow du header */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(5.25rem-2.5rem)] z-20 -translate-x-1/2 sm:top-[calc(6rem-2.5rem)]">
        <div
          className={cn(
            "pointer-events-auto flex size-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-white shadow-sm",
            connected && "bg-primary",
            !connected && "bg-muted"
          )}
        >
          {connected ? (
            <User
              className="size-11 text-primary-foreground"
              strokeWidth={1.25}
            />
          ) : loading ? (
            <Loader2 className="size-8 text-primary animate-spin" />
          ) : (
            <SoundCloudIcon size={32} className="text-white" />
          )}
        </div>
      </div>

      <CardContent className="flex min-w-0 flex-1 flex-col px-3 pb-3 pt-12 text-center">
        <div
          className={cn(
            "mb-3 flex shrink-0 flex-col overflow-hidden text-center",
            PROFILE_BODY_HEIGHT_CLASS
          )}
        >
          {connected ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <h3 className="mb-0.5 shrink-0 text-base font-bold leading-tight text-foreground">
                {demo.displayName}
              </h3>
              <p className="mb-1.5 shrink-0 text-xs text-muted-foreground">
                @{demo.username}
              </p>

              <div className="mb-2 flex min-h-0 shrink-0 items-center justify-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="line-clamp-1">{demo.location}</span>
              </div>

              <div className="mb-2 flex min-h-[22px] shrink-0 items-center justify-center">
                <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {planPrefix} {demo.plan}
                </span>
              </div>

              <div className="mb-2 grid min-h-0 w-full min-w-0 shrink-0 grid-cols-4 gap-1 border-y border-border py-2.5 [grid-template-columns:repeat(4,minmax(0,1fr))]">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0 px-0.5 text-center">
                    <div className="text-sm font-bold leading-none text-foreground tabular-nums">
                      {stat.value.toLocaleString(localeTag)}
                    </div>
                    <div className="mt-0.5 break-words text-[8px] leading-tight text-muted-foreground sm:text-[9px]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="line-clamp-4 min-h-0 flex-1 whitespace-pre-line text-xs leading-snug text-foreground">
                {demo.bio}
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-0 flex-col justify-start overflow-hidden">
              <PlatformCardProfileSkeleton />
            </div>
          )}
        </div>
        {connected ? (
          <div
            className={cn(
              CARD_FOOTER_CLASS,
              "flex-row items-center justify-between gap-2"
            )}
          >
            <div className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
              <Zap className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              <span className="text-xs font-medium text-foreground">
                {demo.piloting}
              </span>
            </div>
            <Switch
              checked={pilotingOn}
              onCheckedChange={setPilotingOn}
              className="shrink-0 scale-90"
            />
          </div>
        ) : loading ? (
          <div className={cn(CARD_FOOTER_CLASS, "gap-0.5")}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 shrink-0 animate-spin text-primary" />
              <span className="line-clamp-1 animate-pulse font-medium text-foreground/80">
                {demo.syncing}
              </span>
            </div>
            <p className="line-clamp-1 text-center text-[9px] leading-tight text-muted-foreground">
              {demo.syncHint}
            </p>
          </div>
        ) : (
          <div className={CARD_FOOTER_CLASS}>
            <Button
              type="button"
              variant="default"
              size="sm"
              className={cn(
                "h-8 w-full max-w-full rounded-md text-xs transition-transform",
                connectButtonClassName,
                clicking && "animate-demo-button-press"
              )}
              tabIndex={-1}
              aria-hidden
            >
              {demo.connectButton}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
