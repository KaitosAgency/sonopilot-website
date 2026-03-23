/**
 * URL canonique : remplacer en prod (ex. Vercel → NEXT_PUBLIC_SITE_URL).
 * Utilisée par metadata, sitemap et robots.
 */
export const siteConfig = {
  name: "Sonopilot",
  description:
    "Sonopilot aide les artistes émergents à sortir de l'anonymat — premiers retours, engagement qualifié, un seul hub pour piloter ta carrière musicale.",
  /** ex. https://sonopilot.com */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  /** URL de l'app (signup, login) */
  appUrl:
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://runroster.kaitos.agency",
  language: "fr" as const,
  locale: "fr_FR" as const,
  keywords: [
    "Sonopilot",
    "Music Marketing",
    "Music Promotion",
    "music promotion tool",
    "indie music promotion",
    "promote your music",
    "artist promotion",
    "music career",
    "musique",
    "marketing musical",
    "promotion musicale",
    "carrière musicale",
    "SoundCloud",
    "Spotify",
    "artistes indépendants",
    "artistes",
  ],
} as const;
