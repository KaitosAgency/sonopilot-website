import { Check } from "lucide-react"
import Image from "next/image"
import { AnimateOnScroll } from "./animate-on-scroll"

const points = [
  "Chaque follow, like, commentaire et repost est déclenché par toi.",
  "Quotas journaliers qui respectent les règles SoundCloud (50 follows, 75 likes, etc.).",
  "Commentaires courts, sans liens — pas de spam.",
  "Aucune action cachée ni automatisée à ton insu.",
]

export function Transparency() {
  return (
    <section id="transparence" className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 max-w-lg">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Zéro botting.
                <br />
                Zéro faux trafic.
              </h2>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                Sonopilot ne remplace pas une bonne prod ni la discipline de
                sortie. On aide à être un peu plus visible et à gagner du temps
                pour ce qui compte — ta communauté et les autres artistes.
              </p>

              <ul className="mt-8 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground font-light">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full">
              <div className="rounded-xl border border-border/60 shadow-lg shadow-black/5 overflow-hidden">
                <Image
                  src="/images/screenshots/sonopilot_sc_tracks.jpg"
                  alt="Onglet Tracks — barre de quotas journaliers (follow, like, comment, repost) et actions sur les tendances"
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
      </div>
    </section>
  )
}
