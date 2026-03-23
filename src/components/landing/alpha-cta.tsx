import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site"
import { SectionTopCurve } from "./section-curve"

export function AlphaCta() {
  return (
    <section className="relative bg-primary py-20 text-primary-foreground md:py-28">
      <SectionTopCurve fill="primary" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Rejoins l&apos;alpha — 100 % gratuit
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-primary-foreground/80 font-light leading-relaxed">
          On construit Sonopilot avec les artistes, pas dans un bureau fermé.
          Ton avis compte, tes retours façonnent le produit.
        </p>

        <a
          href={siteConfig.appUrl + "/auth/signup"}
          className="mt-10 inline-flex h-12 px-8 items-center justify-center rounded-lg bg-white text-primary text-base font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Créer mon compte gratuitement
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>

        <p className="mt-6 text-xs text-primary-foreground/60 tracking-wide">
          Pas de carte bancaire · Tu peux partir quand tu veux
        </p>
      </div>
    </section>
  )
}
