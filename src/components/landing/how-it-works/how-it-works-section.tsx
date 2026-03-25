import { HowItWorksAnimatedBody } from "./how-it-works-animated"

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      className="relative overflow-visible bg-muted/20 py-20 md:py-28 dark:bg-muted/15"
    >
      {/* Cadrillage type « zone de build » — sous tout le fond de la section */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)_/_0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)_/_0.4)_1px,transparent_1px)] bg-[length:4rem_4rem] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_50%,#000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,transparent_50%,#000_100%)] dark:bg-[linear-gradient(to_right,hsl(var(--border)_/_0.32)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)_/_0.32)_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto min-w-0 max-w-6xl px-4 sm:px-6">
        <HowItWorksAnimatedBody />
      </div>
    </section>
  )
}
