import Image from "next/image"
import { X } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"
import {
  BenefitStackItem,
  ComparisonColumnCard,
  ComparisonColumnTitle,
  ProblemMutedShell,
  ProblemScreenshotFrame,
} from "./problem-cards"

const without = [
  "Tu postes dans le vide — zéro retour, zéro signal",
  "Tu jongles entre SoundCloud, Spotify… sans vision d’ensemble",
  "Tu likes au hasard, en espérant être découvert",
  "Tu ne sais pas qui écoute vraiment ta musique",
  "Commentaires génériques, abonnés fantômes — on dirait des bots, pas des fans",
  "Les « boosters » vendent des chiffres, pas des conversations",
  "Pays, genre, stats : tout est flou",
  "Tu refuses le faux engagement — mais sans méthode, tu tournes en rond",
  "Tu finis par douter : ça vaut le coup ?",
]

const withCards: { title: string; body: string }[] = [
  {
    title: "Auditeurs qualifiés",
    body: "Des profils détectés selon tes styles — pas au hasard.",
  },
  {
    title: "Un hub central",
    body: "SoundCloud aujourd'hui, d'autres plateformes en préparation.",
  },
  {
    title: "Actions ciblées",
    body: "Follow, like, commentaire auprès des bonnes personnes.",
  },
  {
    title: "Tableaux clairs",
    body: "Pays, genre, stats pour chaque profil, en un coup d'œil.",
  },
  {
    title: "Du temps pour ta musique",
    body: "Moins de dispersion, plus d'échanges utiles avec ta communauté.",
  },
]

function SansAvecHeader() {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
        Problème
      </p>
      <h2
        id="sans-avec"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.35rem] leading-tight"
      >
        Tu publies, mais personne
        <br className="hidden sm:block" />
        ne répond vraiment ?
      </h2>
      <p className="mt-4 text-muted-foreground font-light text-base sm:text-lg">
        Fini la dispersion. Centralise ta visibilité et engage avec les bonnes
        personnes — sans botting, chaque action part de toi.
      </p>
    </div>
  )
}

export function Problem() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="sans-avec">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <SansAvecHeader />
        </AnimateOnScroll>

        <AnimateOnScroll delay={80}>
          <ProblemMutedShell>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
              <ComparisonColumnCard>
                <ComparisonColumnTitle variant="sans" />
                <ul className="space-y-3.5">
                  {without.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm">
                        <X className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </ComparisonColumnCard>

              <ComparisonColumnCard>
                <ComparisonColumnTitle variant="avec" />
                <div className="relative flex flex-col pt-1">
                  {withCards.map((card, i) => (
                    <BenefitStackItem
                      key={card.title}
                      index={i}
                      title={card.title}
                      body={card.body}
                    />
                  ))}
                </div>
              </ComparisonColumnCard>
            </div>

            <div className="mt-8 md:mt-10">
              <ProblemScreenshotFrame>
                <Image
                  src="/images/screenshots/sonopilot_sc_dashboard.jpg"
                  alt="Tableau de bord Sonopilot — modes de pilotage, files d'actions et commentaires rapides SoundCloud"
                  width={1600}
                  height={900}
                  quality={100}
                  className="w-full h-auto"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </ProblemScreenshotFrame>
            </div>
          </ProblemMutedShell>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
