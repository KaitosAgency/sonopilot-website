/** Aligné sur la RPC `get_public_landing_stats` (snake_case côté DB → camelCase API). */
export type PublicLandingStats = {
  qualifiedListeners: number
  similarArtists: number
  trendingTracks: number
  queuePending: number
}
