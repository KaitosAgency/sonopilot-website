"use client"

import Image from "next/image"
import { Headphones, UserPlus, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionKicker } from "./section-kicker"
import {
  useInViewOnce,
  useReducedMotion,
} from "./how-it-works/demos/use-demo-animation"

const SONOPILOT_LOGO = "/images/Logo/logo-sonopilot-full-color-01.svg"

const founderProfile = {
  name: "Valentin",
  handle: "@valentin",
  tagline: "Fondateur · Artiste indé",
  followers: 2400,
  following: 312,
  tracks: 14,
} as const

const HD_MS = 100
const P_STAGGER_MS = 85
const LIST_STAGGER_MS = 70
const LIST_BASE_MS = 420
const SIG_DELAY_MS = 620
const BADGE_DELAY_MS = 160

function formatCompactFr(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    const s = k >= 10
      ? Math.round(k).toString()
      : k.toFixed(1).replace(".0", "").replace(".", ",")
    return `${s}k`
  }
  return n.toLocaleString("fr-FR")
}

function FounderProfileBadge({
  className,
  active,
  reduced,
}: {
  className?: string
  active: boolean
  reduced: boolean
}) {
  return (
    <aside
      className={cn(
        "w-full max-w-[17.5rem] rounded-2xl border border-border/70 bg-gradient-to-b from-card to-muted/25 p-6 text-center shadow-md shadow-black/[0.04]",
        !reduced && !active && "opacity-0",
        active && !reduced && cn("pillar-img-anim", "pillar-img-anim--ltr"),
        className
      )}
      style={
        active && !reduced
          ? { animationDelay: `${BADGE_DELAY_MS}ms` }
          : undefined
      }
    >
      <div className="relative mx-auto mb-4 w-fit">
        <Image
          src="/images/lp-assets/valentin.jpg"
          alt="Valentin, fondateur de Sonopilot"
          width={280}
          height={280}
          className="h-28 w-28 rounded-full object-cover ring-[3px] ring-primary/20 ring-offset-2 ring-offset-card sm:h-32 sm:w-32"
          sizes="128px"
          priority={false}
        />
      </div>

      <p className="text-base font-semibold tracking-tight text-foreground">
        {founderProfile.name}
      </p>
      <p className="mt-0.5 text-xs font-medium text-primary">
        {founderProfile.handle}
      </p>
      <p className="mt-2 text-xs font-light leading-snug text-muted-foreground">
        {founderProfile.tagline}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
        <div
          className="flex flex-col items-center gap-1"
          aria-label={`${formatCompactFr(founderProfile.followers)} abonnés`}
        >
          <Users className="h-3.5 w-3.5 text-primary/70" aria-hidden />
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {formatCompactFr(founderProfile.followers)}
          </span>
        </div>
        <div
          className="flex flex-col items-center gap-1 border-x border-border/50"
          aria-label={`${founderProfile.following.toLocaleString("fr-FR")} abonnements`}
        >
          <UserPlus className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden />
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {founderProfile.following.toLocaleString("fr-FR")}
          </span>
        </div>
        <div
          className="flex flex-col items-center gap-1"
          aria-label={`${founderProfile.tracks} morceaux`}
        >
          <Headphones className="h-3.5 w-3.5 text-primary/70" aria-hidden />
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {founderProfile.tracks}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-center border-t border-border/60 pt-4">
        <img
          src={SONOPILOT_LOGO}
          alt="Sonopilot"
          width={140}
          height={36}
          decoding="async"
          draggable={false}
          className="h-5 w-auto max-w-[10rem] object-contain object-center opacity-90 sm:h-6"
        />
      </div>
    </aside>
  )
}

function revealClass(active: boolean, reduced: boolean) {
  return cn(
    !reduced && !active && "opacity-0",
    active && !reduced && "animate-pillar-hd-fade-up"
  )
}

function revealTextClass(active: boolean, reduced: boolean) {
  return cn(
    !reduced && !active && "opacity-0",
    active && !reduced && "animate-pillar-text-reveal"
  )
}

export function FounderAnimatedCard() {
  const reduced = useReducedMotion()
  const { ref, inView } = useInViewOnce(0.14)
  const active = reduced || inView

  const p1Delay = HD_MS * 2
  const p2Delay = p1Delay + P_STAGGER_MS

  return (
    <div ref={ref} className="rounded-2xl border border-border/60 bg-card p-8 sm:p-10 md:p-12">
      <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        <div className="min-w-0 flex-1 text-left">
          <div
            className={cn("mb-4", revealClass(active, reduced))}
            style={
              active && !reduced ? { animationDelay: "0ms" } : undefined
            }
          >
            <SectionKicker>Origine</SectionKicker>
          </div>

          <div
            className={cn("mb-6", revealClass(active, reduced))}
            style={
              active && !reduced
                ? { animationDelay: `${HD_MS}ms` }
                : undefined
            }
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Hey, c&apos;est Valentin 👋
            </h2>
          </div>

          <div
            className={cn(
              "space-y-4 font-light leading-relaxed text-muted-foreground",
              revealTextClass(active, reduced)
            )}
            style={
              active && !reduced
                ? { animationDelay: `${p1Delay}ms` }
                : undefined
            }
          >
            <p>
              Je développe Sonopilot{" "}
              <strong className="font-medium text-foreground">
                seul, en solo dev
              </strong>
              . Artiste indépendant, j&apos;ai vécu la même frustration que toi
              : publier un morceau et n&apos;avoir aucun retour — pas parce que
              la musique est mauvaise, mais parce que personne ne la voit.
            </p>
          </div>

          <div
            className={cn(
              "mt-4 space-y-4 font-light leading-relaxed text-muted-foreground",
              revealTextClass(active, reduced)
            )}
            style={
              active && !reduced
                ? { animationDelay: `${p2Delay}ms` }
                : undefined
            }
          >
            <p>
              En 2024, j&apos;ai commencé à{" "}
              <strong className="font-medium text-foreground">
                coder les premières fonctionnalités de découverte
              </strong>
              . Depuis, j&apos;affine le produit feature après feature avec une
              vision claire :
            </p>
          </div>

          <ul className="mt-4 space-y-2.5 pl-1">
            {(
              [
                <>
                  <strong className="font-medium text-foreground">Un seul hub</strong>{" "}
                  pour tous tes réseaux musicaux — plus besoin de jongler entre
                  dix onglets.
                </>,
                <>
                  <strong className="font-medium text-foreground">
                    Ton marketing
                  </strong>
                  , tes règles — chaque interaction part de toi, zéro faux engagement.
                </>,
                <>
                  <strong className="font-medium text-foreground">
                    Construit
                  </strong>{" "}
                  avec les artistes — le produit est en alpha, tes retours
                  façonnent la prochaine feature.
                </>,
              ] as const
            ).map((content, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-start gap-2.5",
                  revealTextClass(active, reduced)
                )}
                style={
                  active && !reduced
                    ? {
                        animationDelay: `${LIST_BASE_MS + i * LIST_STAGGER_MS}ms`,
                      }
                    : undefined
                }
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{content}</span>
              </li>
            ))}
          </ul>

          <p
            className={cn(
              "mt-8 text-sm text-muted-foreground/70",
              revealClass(active, reduced)
            )}
            style={
              active && !reduced
                ? { animationDelay: `${SIG_DELAY_MS}ms` }
                : undefined
            }
          >
            — Valentin · Solo dev & fondateur
          </p>
        </div>

        <FounderProfileBadge
          className="mx-auto shrink-0 lg:mx-0"
          active={active}
          reduced={reduced}
        />
      </div>
    </div>
  )
}
