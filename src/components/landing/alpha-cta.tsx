import { SectionTopCurve } from "./section-curve"
import { AlphaCtaAnimatedInner } from "./alpha-cta-animated"

export function AlphaCta() {
  return (
    <section className="relative bg-primary py-20 text-primary-foreground md:py-28">
      <SectionTopCurve fill="primary" />
      <AlphaCtaAnimatedInner />
    </section>
  )
}
