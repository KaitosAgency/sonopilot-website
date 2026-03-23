import { AnimateOnScroll } from "./animate-on-scroll"

export function Founder() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="rounded-2xl border border-border/60 bg-card p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
              👋
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl mb-6">
              Pourquoi Sonopilot existe
            </h2>

            <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
              <p>
                En tant qu&apos;artiste indépendant, j&apos;ai vécu la même
                frustration : <strong className="font-medium text-foreground">publier un morceau et
                n&apos;avoir aucun retour</strong>. Pas parce que la musique est
                mauvaise, mais parce que personne ne la voit.
              </p>
              <p>
                J&apos;ai cherché des outils pour m&apos;aider — la plupart
                vendaient du <strong className="font-medium text-foreground">faux engagement ou du
                botting</strong>. Pas mon truc.
              </p>
              <p>
                Alors j&apos;ai créé Sonopilot : un outil qui aide à{" "}
                <strong className="font-medium text-foreground">être un peu plus visible, honnêtement</strong>, en
                laissant l&apos;artiste aux commandes. Chaque action part de
                toi, chaque connexion est réelle.
              </p>
              <p>
                Le produit est en alpha — on le construit{" "}
                <strong className="font-medium text-foreground">avec</strong> les
                artistes, pas pour eux. Tes retours façonnent la prochaine
                fonctionnalité.
              </p>
            </div>

            <p className="mt-8 text-sm text-muted-foreground/60">
              — L&apos;équipe Sonopilot
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
