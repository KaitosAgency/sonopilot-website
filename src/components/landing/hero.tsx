"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Repeat2,
} from "lucide-react"
import { notifications, type FakeNotification } from "@/lib/fake-data"
import { ComingSoonTrigger } from "./coming-soon"
import { cn } from "@/lib/utils"
import { sectionEyebrowClasses } from "./section-kicker"

/** Emplacements irréguliers (hauteur + côté) — une entrée par notification */
const HERO_NOTIF_SLOTS: { notifIndex: number; side: "left" | "right"; top: string }[] = [
  { notifIndex: 0, side: "left", top: "7%" },
  { notifIndex: 3, side: "right", top: "5%" },
  { notifIndex: 6, side: "left", top: "20%" },
  { notifIndex: 1, side: "right", top: "26%" },
  { notifIndex: 9, side: "left", top: "38%" },
  { notifIndex: 4, side: "right", top: "34%" },
  { notifIndex: 7, side: "left", top: "52%" },
  { notifIndex: 2, side: "right", top: "48%" },
  { notifIndex: 10, side: "right", top: "64%" },
  { notifIndex: 5, side: "left", top: "61%" },
  { notifIndex: 8, side: "right", top: "82%" },
]

/** Ordre d'apparition entrelacé gauche/droite (pas 0,1,2,3…) */
const NOTIF_SHOW_ORDER = [4, 0, 9, 2, 7, 1, 10, 3, 6, 5, 8] as const

const typeConfig = {
  like: {
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    label: (n: FakeNotification) => `a liké ${n.trackTitle}`,
  },
  follow: {
    icon: UserPlus,
    color: "text-primary",
    bg: "bg-primary/10",
    label: () => "te suit maintenant",
  },
  comment: {
    icon: MessageCircle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: (n: FakeNotification) => `a commenté « ${n.comment} »`,
  },
  repost: {
    icon: Repeat2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: (n: FakeNotification) => `a reposté ${n.trackTitle}`,
  },
}

function SonareOrb({ className, alt }: { className?: string; alt?: boolean }) {
  const rippleAnim = alt ? "sonare-ripple-alt" : "sonare-ripple"
  const rippleDur = alt ? "7s" : "5s"
  const delays = [0, 0.5, 1, 1.5, 2]

  return (
    <svg
      viewBox="0 0 200 200"
      width={200}
      height={200}
      className={cn("block", className)}
    >
      <defs>
        <radialGradient id={alt ? "sonare-glow-alt" : "sonare-glow"} cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="hsl(3 75% 63%)" />
          <stop offset="40%" stopColor="hsl(3 75% 63%)" stopOpacity={0.15} />
          <stop offset="100%" stopColor="hsl(3 75% 63%)" stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* Mobile : atténuer seulement le glow (dégradé), pas les anneaux sonar */}
      <g className="max-md:opacity-[0.42] md:opacity-100">
        <g style={{ animation: "sonare-float 30s ease-in-out infinite", transformOrigin: "center" }}>
          <circle
            cx={100} cy={100} r={12}
            fill={`url(#${alt ? "sonare-glow-alt" : "sonare-glow"})`}
            style={{ animation: "sonare-blob 15s ease-in-out infinite", transformOrigin: "center", opacity: 0.7 }}
          />
        </g>
        <circle
          cx={100} cy={100} r={70}
          fill={`url(#${alt ? "sonare-glow-alt" : "sonare-glow"})`}
          style={{ animation: "sonare-glow 15s ease-in-out infinite", transformOrigin: "center" }}
        />
      </g>
      <g>
        {delays.map((d, i) => (
          <circle
            key={i}
            cx={100} cy={100} r={30 + i * 10}
            fill="none"
            stroke="hsl(3 75% 63%)"
            strokeWidth={0.1}
            opacity={0.15}
            style={{
              animation: `${rippleAnim} ${rippleDur} ease-in-out infinite`,
              animationDelay: `${d}s`,
              transformOrigin: "center",
            }}
          />
        ))}
      </g>
    </svg>
  )
}

function NotifToast({
  notif,
  visible,
  side,
}: {
  notif: FakeNotification
  visible: boolean
  side: "left" | "right"
}) {
  const cfg = typeConfig[notif.type]
  const Icon = cfg.icon

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-xl border border-border/60 bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg transition-all duration-500 w-[280px]",
        visible
          ? "opacity-100 translate-x-0"
          : side === "left"
            ? "opacity-0 -translate-x-8"
            : "opacity-0 translate-x-8",
        side === "left" ? "xl:-translate-x-4" : "xl:translate-x-4"
      )}
    >
      <Image
        src={notif.avatarUrl}
        alt=""
        width={36}
        height={36}
        quality={90}
        className="rounded-full shrink-0 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-foreground truncate">
          <span className="font-medium">{notif.username}</span>{" "}
          <span className="text-muted-foreground">{cfg.label(notif)}</span>
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">
          il y a {notif.timeAgo}
        </p>
      </div>
      <div className={cn("shrink-0 rounded-full p-1.5", cfg.bg)}>
        <Icon className={cn("h-3.5 w-3.5", cfg.color)} />
      </div>
    </div>
  )
}

const BADGE_SEQUENCE = [2, 3, 4, 5] as const

function HeroNotifBell() {
  const [step, setStep] = useState(0)
  const count = BADGE_SEQUENCE[step]

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % BADGE_SEQUENCE.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative select-none"
      aria-hidden
    >
      <div className="rounded-2xl border border-border/50 bg-card/90 p-2.5 shadow-md shadow-black/5 ring-1 ring-black/[0.03]">
        <Bell className="h-7 w-7 text-foreground sm:h-8 sm:w-8" strokeWidth={1.75} />
      </div>
      <span
        key={count}
        className="animate-hero-notif-badge absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold tabular-nums text-primary-foreground shadow-md ring-2 ring-background"
      >
        {count}
      </span>
    </div>
  )
}

export function Hero() {
  const [activeIndices, setActiveIndices] = useState<number[]>([])

  useEffect(() => {
    const show = (idx: number) => {
      setActiveIndices((prev) => [...prev, idx])
      setTimeout(() => {
        setActiveIndices((prev) => prev.filter((i) => i !== idx))
      }, 3500)
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    const n = notifications.length
    const cycleMs = n * 2400 + 1200
    NOTIF_SHOW_ORDER.forEach((notifIdx, i) => {
      const delay = 700 + i * 1750 + (i % 4) * 280
      const repeat = () => {
        show(notifIdx)
        timers.push(setTimeout(repeat, cycleMs))
      }
      timers.push(setTimeout(repeat, delay))
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-x-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className={cn(sectionEyebrowClasses, "mb-8")}>
            Alpha gratuite · Accès anticipé
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl !leading-[1.08]">
            Ta musique mérit<span className="relative inline-block">e<span className="pointer-events-none absolute left-5 md:left-20 -translate-x-1/2 -top-12 sm:-top-12 md:-top-12"><span className="pointer-events-auto inline-block rotate-[8deg]"><HeroNotifBell /></span></span></span>
            <br />
            <span className="text-primary">d&apos;être entendue.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            Sonopilot connecte les artistes émergents avec les bonnes personnes
            — premiers retours, engagement qualifié, un seul hub pour tout
            suivre et développer ta communauté musicale.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <ComingSoonTrigger className="inline-flex h-12 px-8 items-center justify-center rounded-lg bg-primary text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
              Rejoindre l&apos;alpha gratuit
              <ArrowRight className="ml-2 h-4 w-4" />
            </ComingSoonTrigger>
            <a
              href="#comment-ca-marche"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              Voir comment ça marche
              <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <p className="mt-6 text-xs text-muted-foreground/60 tracking-wide">
            Sans carte bancaire · 100 % gratuit
          </p>
        </div>

        {/* Sonare — derrière le texte ; plus bas sur mobile pour souligner l'aperçu produit */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 top-[62%] translate-y-4 md:top-[56%] md:translate-y-0 lg:top-[55%]"
        >
          <SonareOrb className="scale-[10] md:scale-[12]" />
        </div>

        <div className="relative z-10 mt-16 md:mt-20">
          <div className="relative z-10 mx-auto max-w-5xl">
            {/* Hauteur = screenshot : positions + côtés irréguliers */}
            <div
              aria-hidden
              className="hidden md:block absolute inset-0 z-10 pointer-events-none"
            >
              {HERO_NOTIF_SLOTS.map((slot) => {
                const notif = notifications[slot.notifIndex]
                if (!notif) return null
                return (
                  <div
                    key={`slot-${slot.notifIndex}`}
                    className={cn(
                      "absolute w-[280px] max-w-[min(280px,calc(100vw-28rem))] pointer-events-auto -translate-y-1/2",
                      slot.side === "left"
                        ? "-left-2 xl:-left-4"
                        : "-right-2 xl:-right-4"
                    )}
                    style={{ top: slot.top }}
                  >
                    <NotifToast
                      notif={notif}
                      visible={activeIndices.includes(slot.notifIndex)}
                      side={slot.side}
                    />
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl border border-border/60 bg-card shadow-2xl shadow-black/8">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/images/screenshots/sonopilot_sc_artists.jpg?v=2"
                  alt="Sonopilot — vue artistes avec découverte de profils"
                  width={2880}
                  height={1800}
                  quality={92}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  className="block w-full h-auto rounded-xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-xl bg-gradient-to-t from-background to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
