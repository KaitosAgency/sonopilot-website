import Image from "next/image"
import { Users, Disc3, LayoutDashboard } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const pillars = [
  {
    icon: Users,
    label: "Fanbase",
    manifesto: "Engage ceux qui matchent ton son — pas la foule.",
    description:
      "Sonopilot repère les auditeurs actifs alignés sur tes styles. Tu choisis qui suivre ; eux tombent sur ta musique. Chaque action part de toi.",
    image: "/images/screenshots/sonopilot_sc_audience.jpg",
    imageAlt:
      "Onglet Audience — tableau d'auditeurs qualifiés avec pays, genre et actions",
  },
  {
    icon: Disc3,
    label: "Artistes",
    manifesto: "Ton créneau, une seule scène — sans quitter l'app.",
    description:
      "Écoute, like, commente les morceaux des artistes qui te ressemblent. Lecteur intégré, profils clairs : moins d'onglets, plus d'échanges utiles.",
    image: "/images/screenshots/sonopilot_sc_artists_details.jpg",
    imageAlt:
      "Détail d'un artiste — profil, lecteur SoundCloud embarqué, actions (like, comment, follow)",
  },
  {
    icon: LayoutDashboard,
    label: "Hub",
    manifesto: "Un seul endroit pour piloter ce qui compte.",
    description:
      "Dashboard, titres SoundCloud, stats — centralisés. La suite du réseau (Spotify, YouTube…) arrive ; tu gardes le même réflexe.",
    image: "/images/screenshots/sonopilot_track_overview.jpg",
    imageAlt:
      "Page Mes Titres — catalogue SoundCloud avec plays, likes, commentaires",
  },
]

/** Bosse vers le haut (blanc qui remonte dans le beige) — cf. croquis rouge */
function PillarsTopCurve() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-full z-[1] h-12 w-full md:h-16"
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
    >
      <path
        fill="hsl(var(--card))"
        d="M0 72 L0 46 Q720 8 1440 46 L1440 72 Z"
      />
    </svg>
  )
}

export function Pillars() {
  return (
    <section id="produit" className="relative bg-card py-20 md:py-28">
      <PillarsTopCurve />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ce que Sonopilot change pour toi
            </h2>
            <p className="mt-5 text-lg font-medium leading-snug text-foreground sm:text-xl">
              Moins de tirage au hasard. Plus de décisions qui ont du sens — et
              toujours toi aux commandes.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm font-light text-muted-foreground">
              Pas de botting : tu lances chaque action. On t&apos;aide à voir
              clair ; le geste reste le tien.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-16 md:space-y-24">
          {pillars.map((pillar, i) => (
            <AnimateOnScroll key={pillar.label} delay={i * 100}>
              <div
                className={`flex flex-col gap-8 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center`}
              >
                <div className="max-w-lg flex-1">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <pillar.icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {pillar.label}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl">
                    {pillar.manifesto}
                  </h3>
                  <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex-1 w-full">
                  <div className="rounded-xl border border-border/60 shadow-lg shadow-black/5 overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      width={1440}
                      height={900}
                      quality={92}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
