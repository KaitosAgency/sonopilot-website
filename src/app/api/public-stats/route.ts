/** Stats publiques : RPC PostgREST `get_public_landing_stats` (agrégats globaux). */
import type { PublicLandingStats } from "@/lib/public-stats"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export type { PublicLandingStats }

function supabaseEnv() {
  const base =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL ??
    null
  const anonKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    null
  return { base, anonKey }
}

function parseLandingPayload(raw: unknown): PublicLandingStats | null {
  if (!raw || typeof raw !== "object") return null
  const o = raw as Record<string, unknown>
  const q = (k: string) => {
    const v = o[k]
    if (typeof v === "number" && Number.isFinite(v)) return v
    if (typeof v === "string") {
      const n = Number(v)
      return Number.isFinite(n) ? n : null
    }
    return null
  }
  const qualifiedListeners = q("qualified_listeners")
  const similarArtists = q("similar_artists")
  const trendingTracks = q("trending_tracks")
  const queuePending = q("queue_pending")
  if (
    qualifiedListeners === null ||
    similarArtists === null ||
    trendingTracks === null ||
    queuePending === null
  ) {
    return null
  }
  return {
    qualifiedListeners,
    similarArtists,
    trendingTracks,
    queuePending,
  }
}

export async function GET() {
  const { base, anonKey } = supabaseEnv()

  if (!base || !anonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[public-stats] Variables manquantes : website/.env.local — " +
          "NEXT_PUBLIC_SUPABASE_URL + SUPABASE_ANON_KEY (ou VITE_* depuis app/.env)."
      )
    }
    return NextResponse.json(
      { stats: null, source: "missing_env" as const },
      { status: 200 }
    )
  }

  const url = `${base.replace(/\/$/, "")}/rest/v1/rpc/get_public_landing_stats`

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("[public-stats]", res.status, text)
      return NextResponse.json(
        { stats: null, source: "http_error" as const },
        { status: 200 }
      )
    }

    const raw: unknown = await res.json()
    const stats = parseLandingPayload(raw)
    if (!stats) {
      console.error("[public-stats] parse payload:", raw)
      return NextResponse.json(
        { stats: null, source: "parse_error" as const },
        { status: 200 }
      )
    }

    return NextResponse.json({ stats, source: "rest_rpc" as const })
  } catch (e) {
    console.error("[public-stats] fetch:", e)
    return NextResponse.json(
      { stats: null, source: "fetch_error" as const },
      { status: 200 }
    )
  }
}
