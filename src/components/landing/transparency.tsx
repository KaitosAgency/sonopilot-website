import { SectionBottomCurve } from "./section-curve"
import { TransparencyAnimatedInner } from "./transparency-animated"

export function Transparency() {
  return (
    <section
      id="transparence"
      className="relative bg-card py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-visible">
          <TransparencyAnimatedInner />
        </div>
      </div>
      <SectionBottomCurve fill="card" />
    </section>
  )
}
