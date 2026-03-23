import { AnimateOnScroll } from "./animate-on-scroll"

const platforms = [
  { name: "SoundCloud", active: true, color: "bg-orange-500" },
  { name: "Spotify", active: false, color: "bg-green-500" },
  { name: "YouTube", active: false, color: "bg-red-500" },
  { name: "Bandcamp", active: false, color: "bg-sky-500" },
  { name: "Beatport", active: false, color: "bg-emerald-400" },
  { name: "TikTok", active: false, color: "bg-neutral-800" },
]

export function Platforms() {
  return (
    <section id="plateformes" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Tous tes réseaux.
              <br className="hidden sm:block" />
              Un seul tableau de bord.
            </h2>
            <p className="mt-4 text-muted-foreground font-light">
              SoundCloud est la première intégration — les autres arrivent.
              Inscris-toi pour influencer la prochaine.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className={`relative flex flex-col items-center gap-3 rounded-xl border p-5 transition-all hover:scale-105 ${
                  platform.active
                    ? "border-primary/30 bg-primary/5 shadow-sm"
                    : "border-border/60 bg-card opacity-60"
                }`}
              >
                <div
                  className={`h-3 w-3 rounded-full ${
                    platform.active ? platform.color : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    platform.active
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {platform.name}
                </span>
                {platform.active ? (
                  <span className="absolute -top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Actif
                  </span>
                ) : (
                  <span className="absolute -top-2 right-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Bientôt
                  </span>
                )}
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
