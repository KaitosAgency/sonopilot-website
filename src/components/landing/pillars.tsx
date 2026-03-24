import {
  PillarAnimatedRow,
  PillarsAnimatedHeader,
  type PillarMotionData,
} from "./pillar-motion"
import { SectionKicker } from "./section-kicker"
import { SectionTopCurve } from "./section-curve"

/** Fichier : `website/public/images/screenshots/sonopilot_sc_artists_details.jpg` */
const ARTISTS_SCREENSHOT =
  "/images/screenshots/sonopilot_sc_artists_details.jpg?v=3"

const pillars: PillarMotionData[] = [
  {
    iconKey: "fanbase",
    label: "Fanbase",
    manifesto: "Explore les auditeurs qui matchent ton son.",
    description:
      "Sonopilot te présente les auditeurs actifs dans tes genres. Consulte leurs profils, découvre leur activité — et décide si tu veux les suivre.",
    image: "/images/screenshots/sonopilot_sc_audience.jpg",
    imageAlt:
      "Onglet Audience — profils d'auditeurs qualifiés avec pays et genre",
  },
  {
    iconKey: "artists",
    label: "Artistes",
    manifesto: "Ton créneau, une seule scène — sans quitter l'app.",
    description:
      "Écoute, like, commente les morceaux des artistes qui te ressemblent. Lecteur intégré, profils clairs : moins d'onglets, plus d'échanges utiles.",
    image: ARTISTS_SCREENSHOT,
    imageAlt:
      "Détail d'un artiste — profil et lecteur SoundCloud embarqué",
  },
  {
    iconKey: "hub",
    label: "Hub",
    manifesto: "Un seul endroit pour gérer ce qui compte.",
    description:
      "Dashboard, titres SoundCloud, stats — centralisés. La suite du réseau (Spotify, YouTube…) arrive ; tu gardes le même réflexe.",
    image: "/images/screenshots/sonopilot_track_overview.jpg",
    imageAlt:
      "Page Mes Titres — catalogue SoundCloud avec plays, likes, commentaires",
  },
]

export function Pillars() {
  return (
    <section id="produit" className="relative bg-card py-20 md:py-28">
      <SectionTopCurve fill="card" className="h-12 md:h-16" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PillarsAnimatedHeader>
          <SectionKicker>Produit</SectionKicker>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ce que Sonopilot change pour toi
          </h2>
          <p className="mt-5 text-lg font-medium leading-snug text-foreground sm:text-xl">
            Moins de tirage au hasard. Plus de décisions qui ont du sens — et
            toujours toi aux commandes.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light text-muted-foreground">
            Tu navigues, tu écoutes, tu décides. On t&apos;aide à voir clair
            ; le geste reste le tien.
          </p>
        </PillarsAnimatedHeader>

        <div className="space-y-16 md:space-y-24">
          {pillars.map((pillar, i) => (
            <PillarAnimatedRow key={pillar.label} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
