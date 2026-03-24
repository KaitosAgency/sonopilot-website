import Image from "next/image"
import { AnimateOnScroll } from "./animate-on-scroll"
import { ProblemComparisonAnimatedGrid } from "./problem-comparison-animate"
import { ProblemMutedShell, ProblemScreenshotFrame } from "./problem-cards"
import { SectionKicker } from "./section-kicker"

const without = [
  "Tu postes dans le vide — zéro retour, zéro signal",
  "Tu jongles entre SoundCloud, Spotify… sans vision d'ensemble",
  "Tu likes au hasard, en espérant être découvert",
  "Tu ne sais pas qui écoute vraiment ta musique",
  "Commentaires sans âme, abonnés qui disparaissent — pas de vraie communauté",
  "Les « boosters » vendent des chiffres, pas des conversations",
  "Pays, genre, stats : tout est flou",
  "Tu refuses le faux engagement — mais sans méthode, tu tournes en rond",
  "Tu finis par douter : ça vaut le coup ?",
]

const withCards: { title: string; body: string }[] = [
  {
    title: "Auditeurs qualifiés",
    body: "Des profils présentés selon tes styles — pas au hasard.",
  },
  {
    title: "Un hub central",
    body: "SoundCloud aujourd'hui, d'autres plateformes en préparation.",
  },
  {
    title: "Interactions ciblées",
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
      <SectionKicker>Problème</SectionKicker>
      <h2
        id="sans-avec"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.35rem] leading-tight"
      >
        Tu publies, mais personne
        <br className="hidden sm:block" />
        ne répond vraiment ?
      </h2>
      <p className="mt-4 text-muted-foreground font-light text-base sm:text-lg">
        Fini la dispersion. Centralise ta visibilité et connecte-toi avec les
        bonnes personnes — chaque interaction part de toi.
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

        <AnimateOnScroll delay={80} className="overflow-visible">
          <ProblemMutedShell>
            <div className="relative overflow-visible">
              {/* Calque halo : absolute, derrière grille + capture, déborde vers le haut sans être rogné */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[-8rem] z-[1] h-[calc(100%+8rem)] w-[min(100%,56rem)] max-w-[calc(100%-0.5rem)] -translate-x-1/2 sm:top-[-9.5rem] sm:h-[calc(100%+9.5rem)]"
                style={{
                  background:
                    "radial-gradient(ellipse 62% 52% at 50% 70%, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.14) 52%, transparent 80%)",
                }}
              />
              <div className="relative z-[2]">
                <ProblemComparisonAnimatedGrid
                  withoutItems={without}
                  withCards={withCards}
                />
                <div className="mt-8 md:mt-10">
                  <ProblemScreenshotFrame>
                    <Image
                      src="/images/screenshots/sc-dashboard-notifications.jpg?v=3"
                      alt="Tableau de bord Sonopilot — notifications et activité"
                      width={1600}
                      height={900}
                      quality={100}
                      className="w-full h-auto"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      unoptimized
                    />
                  </ProblemScreenshotFrame>
                </div>
              </div>
            </div>
          </ProblemMutedShell>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
