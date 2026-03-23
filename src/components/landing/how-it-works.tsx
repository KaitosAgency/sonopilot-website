import Image from "next/image"
import { AnimateOnScroll } from "./animate-on-scroll"

const steps = [
  {
    number: "1",
    title: "Crée ton compte",
    description:
      "Inscription gratuite en quelques secondes — email ou Google. Pas de carte bancaire.",
    image: "/images/screenshots/sonopilot_signup.jpg",
    imageAlt: "Écran d'inscription Sonopilot",
  },
  {
    number: "2",
    title: "Connecte SoundCloud",
    description:
      "OAuth sécurisé : tes identifiants ne sont jamais stockés. Tu peux te déconnecter à tout moment.",
    image: "/images/screenshots/sonopilot_dashboard_sc_disconnected.jpg",
    imageAlt: "Dashboard avec bouton Connecter SoundCloud",
  },
  {
    number: "3",
    title: "Pilote tes actions",
    description:
      "Active les modes de pilotage, lance tes follows, likes et commentaires — suis tout depuis un seul endroit.",
    image: "/images/screenshots/sonopilot_sc_dashboard.jpg",
    imageAlt:
      "Onglet Général — 3 switches de pilotage, styles musicaux, commentaires rapides",
  },
]

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Comment ça marche
            </h2>
            <p className="mt-4 text-muted-foreground font-light">
              Trois étapes pour commencer à être visible.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 100}>
              <div
                className={`flex flex-col gap-8 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center`}
              >
                <div className="flex-1 max-w-lg">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="flex-1 w-full">
                  <div className="rounded-xl border border-border/60 shadow-lg shadow-black/5 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
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
