import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimateOnScroll } from "../animate-on-scroll"
import { howItWorksSteps, type HowItWorksDemoId } from "./steps-data"
import { ConnectSoundCloudDemo } from "./demos/connect-soundcloud-demo"
import { GeneralTabDemo } from "./demos/general-tab-demo"
import { QueueDemo } from "./demos/queue-demo"

function StepDemo({ id }: { id: HowItWorksDemoId }) {
  switch (id) {
    case "connect":
      return <ConnectSoundCloudDemo />
    case "general":
      return <GeneralTabDemo />
    case "queue":
      return <QueueDemo />
    default:
      return null
  }
}

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      className="relative overflow-hidden bg-muted/20 py-20 md:py-28 dark:bg-muted/15"
    >
      {/* Cadrillage type « zone de build » — sous tout le fond de la section */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)_/_0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)_/_0.4)_1px,transparent_1px)] bg-[length:4rem_4rem] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_50%,#000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,transparent_50%,#000_100%)] dark:bg-[linear-gradient(to_right,hsl(var(--border)_/_0.32)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)_/_0.32)_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Comment ça marche
            </h2>
            <p className="mt-4 font-light text-muted-foreground">
              Un seul tableau de bord pour plusieurs réseaux — connexion,
              pilotage, file d&apos;actions. SoundCloud disponible aujourd&apos;hui,
              extension prévue. Démos sans compte.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {howItWorksSteps.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 100}>
              <article
                className={cn(
                  "flex h-full flex-col items-center rounded-xl border border-border/60 bg-card/40 p-6 text-center shadow-sm shadow-black/[0.03] backdrop-blur-sm dark:bg-card/30 dark:shadow-black/20",
                  "md:p-7"
                )}
              >
                <div className="mb-6 flex min-h-[14rem] w-full min-w-0 flex-1 flex-col items-center justify-center overflow-visible">
                  <StepDemo id={step.demo} />
                </div>

                <span className="mb-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold tabular-nums text-primary-foreground">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 font-light leading-relaxed text-muted-foreground text-sm">
                  {step.description}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={300}>
          <div className="mx-auto mt-16 max-w-2xl border-t border-border/50 pt-14 text-center md:mt-20 md:pt-16">
            <span
              className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25"
              aria-hidden
            >
              <Star className="size-5 fill-primary-foreground" strokeWidth={1.5} />
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Plus de musique, moins de bruit.
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-light leading-relaxed text-muted-foreground">
              Les actions ne sont qu&apos;un levier. L&apos;objectif,
              c&apos;est de toucher les artistes et auditeurs qui comptent
              vraiment — et de faire grandir une communauté autour de ta
              musique, avec des gestes que tu choisis et que tu déclenches
              toi-même, toujours sous ton contrôle.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground/85">
              Sonopilot te libère du temps pour te concentrer sur ce qui fait
              la différence : créer, échanger, collaborer.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
