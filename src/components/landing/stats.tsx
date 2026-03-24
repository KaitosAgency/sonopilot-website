"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Disc3, TrendingUp, CircleUser } from "lucide-react"
import type { PublicLandingStats } from "@/lib/public-stats"

const POLL_MS = 30_000

type StatDef = {
  icon: typeof Users
  label: string
  sublabel?: string
  suffix?: string
  pick: (s: PublicLandingStats) => number | null
  /** Affichage du chiffre (ex. séparateurs milliers) */
  format?: (n: number) => string
}

const statDefs: StatDef[] = [
  {
    icon: Users,
    label: "Auditeurs qualifiés",
    pick: (s) => s.qualifiedListeners,
  },
  {
    icon: Disc3,
    label: "Artistes similaires",
    pick: (s) => s.similarArtists,
  },
  {
    icon: TrendingUp,
    label: "Tracks tendances",
    pick: (s) => s.trendingTracks,
  },
  {
    icon: CircleUser,
    label: "Utilisateurs inscrits",
    pick: (s) => s.registeredUsers,
    format: (n) => n.toLocaleString("fr-FR"),
  },
]

function StatCard({
  icon: Icon,
  label,
  sublabel,
  suffix,
  format,
  value,
  active,
  delay,
}: StatDef & {
  value: number | null
  active: boolean
  delay: number
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 opacity-0 translate-y-4 transition-all duration-700 ease-out"
      style={{
        ...(active
          ? { opacity: 1, transform: "translateY(0)", transitionDelay: `${delay}ms` }
          : {}),
      }}
    >
      <Icon className="h-5 w-5 text-primary/70 mb-1" />
      <span className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums min-h-[2.5rem] flex items-center justify-center">
        {value === null ? (
          <span className="text-muted-foreground font-light text-2xl">…</span>
        ) : (
          <>
            {format ? format(value) : value}
            {suffix ?? ""}
          </>
        )}
      </span>
      <span className="text-xs text-muted-foreground font-light text-center leading-snug max-w-[10rem]">
        {label}
        {sublabel ? (
          <span className="block text-[10px] opacity-80 mt-0.5">{sublabel}</span>
        ) : null}
      </span>
    </div>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [live, setLive] = useState<PublicLandingStats | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/public-stats", { cache: "no-store" })
        const data = (await res.json()) as {
          stats: PublicLandingStats | null
          source?: string
        }
        if (cancelled) return
        if (data.stats) {
          setLive(data.stats)
        } else {
          setLive(null)
          if (
            process.env.NODE_ENV === "development" &&
            data.source === "missing_env"
          ) {
            console.warn(
              "[Stats] Ajoute website/.env.local (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_ANON_KEY). Voir .env.example."
            )
          }
        }
      } catch {
        if (!cancelled) setLive(null)
      }
    }

    load()
    const id = window.setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  return (
    <section ref={ref} className="py-14 bg-card border-y border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {statDefs.map((def, i) => (
            <div key={def.label}>
              <StatCard
                {...def}
                value={live ? def.pick(live) : null}
                active={visible}
                delay={i * 120}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
