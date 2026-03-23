"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  {
    question: "Est-ce que vous achetez des streams ou des followers ?",
    answer:
      "Non. Aucun trafic artificiel. Chaque action (follow, like, commentaire, repost) est mise en file par toi et exécutée dans le respect des quotas SoundCloud. Rien n'est gonflé.",
  },
  {
    question: "Qui décide des actions ?",
    answer:
      "Toi. Tu actives les modes de pilotage (fanbase, artistes similaires, tendances) et tu choisis chaque action. Rien ne part à ton insu.",
  },
  {
    question: "Ça remplace un community manager ou une bonne prod ?",
    answer:
      "Non. Sonopilot est un complément pour gagner du temps et être un peu plus visible. La qualité de ta musique et ta régularité restent le fondement de ta carrière.",
  },
  {
    question: "SoundCloud seulement pour l'instant ?",
    answer:
      "Oui, c'est la première intégration de l'alpha. Spotify, YouTube, Bandcamp, Beatport et TikTok sont en développement — les alpha testeurs influenceront la prochaine plateforme.",
  },
  {
    question: "Mes données et mon compte SoundCloud sont-ils en sécurité ?",
    answer:
      "Connexion via OAuth sécurisé — tes identifiants ne sont jamais stockés chez nous. Tu peux te déconnecter et supprimer ton compte à tout moment.",
  },
  {
    question: "Quand les autres plateformes arriveront-elles ?",
    answer:
      "On construit avec les alpha testeurs. Rejoins-nous pour influencer la roadmap et être notifié dès l'arrivée de ta plateforme.",
  },
  {
    question: "C'est vraiment gratuit ?",
    answer:
      "Oui, pendant toute la durée de l'alpha. Pas de carte bancaire demandée, pas d'engagement.",
  },
]

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border/60">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-muted-foreground font-light leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <div className="border-t border-border/60">
          {items.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
