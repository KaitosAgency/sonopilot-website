/**
 * URL canonique : remplacer en prod (ex. Vercel → NEXT_PUBLIC_SITE_URL).
 * Utilisée par metadata, sitemap et robots.
 */
export const siteConfig = {
  name: "Sonopilot",
  description:
    "Sonopilot aide les artistes émergents à sortir de l'anonymat — premiers retours, engagement qualifié, un seul hub pour piloter ta carrière musicale.",
  /** ex. https://www.sonopilot.com */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.sonopilot.com",
  /** URL de l'app (signup, login) */
  appUrl:
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://runroster.kaitos.agency",
  language: "en" as const,
  locale: "en_US" as const,
  /** Partage social (1200×630). Source vectorielle : `/og/sonopilot-og.svg` — régénérer le PNG avec `npm run og:png`. */
  ogImage: "/og/sonopilot-og.png",
  ogImageAlt:
    "Sonopilot — de l'anonymat à l'engagement, un hub pour piloter ta carrière musicale.",
  ogImageWidth: 1200,
  ogImageHeight: 630,
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

/** Société éditrice du site vitrine — mentions légales */
export const publisherConfig = {
  tradeName: "YellowBird.",
  representativeName: "Valentin LORIOT",
  street: "5 avenue Marx Dormoy",
  postalCode: "18000",
  city: "Bourges",
  country: "France",
  email: "contact@sonopilot.com",
  siret: "848 793 253 00016",
} as const;

/** Hébergeur du site (Next.js / déploiement courant) */
export const hostingConfig = {
  company: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Walnut, CA 91789, États-Unis",
  website: "https://vercel.com",
} as const;
