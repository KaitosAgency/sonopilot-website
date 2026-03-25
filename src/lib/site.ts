/**
 * URL canonique : remplacer en prod (ex. Vercel → NEXT_PUBLIC_SITE_URL).
 * Utilisée par metadata, sitemap et robots.
 */
export const siteConfig = {
  name: "Sonopilot",
  description:
    "Sonopilot helps emerging artists break through the noise — real feedback, meaningful engagement, one hub to steer your music career.",
  /** ex. https://www.sonopilot.com */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.sonopilot.com",
  /** URL de l'app (signup, login) */
  appUrl:
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://www.app.sonopilot.com",
  language: "en" as const,
  locale: "en_US" as const,
  /** Partage social (1200×630). Générer avec `npm run og:generate`. */
  ogImage: "/og/sonopilot-og.png",
  ogImageAlt:
    "Sonopilot — music career manager: connect SoundCloud, discover artists, grow your community.",
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
  tradeName: "KAITOS TECH PTE. LTD.",
  /** UEN (Singapore) */
  registrationNumber: "202608641K",
  incorporationDate: "26 February 2026",
  incorporationDateFr: "26 février 2026",
  street: "160 Robinson Road, #14-04 Singapore Business Federation Center",
  postalCode: "068914",
  city: "Singapore",
  country: "Singapore",
  email: "contact@sonopilot.com",
} as const;

/** Hébergeur du site (Next.js / déploiement courant) */
export const hostingConfig = {
  company: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Walnut, CA 91789, États-Unis",
  website: "https://vercel.com",
} as const;
