/** Largeur des démos dans la grille « Comment ça marche ». */
export const howItWorksDemoStageClassName = "mx-auto w-full min-w-0"

export const howItWorksSteps = [
  {
    number: "1",
    title: "Connecte tes réseaux",
    description:
      "Liaison sécurisée en un clic, déconnexion à tout moment. SoundCloud disponible dès maintenant — d'autres plateformes arrivent.",
    demo: "connect" as const,
  },
  {
    number: "2",
    title: "Définis ton univers",
    description:
      "Choisis tes genres, tes préférences de découverte et ce qui t'intéresse — tout se règle depuis un seul onglet.",
    demo: "general" as const,
  },
  {
    number: "3",
    title: "Explore et interagis",
    description:
      "Parcours les profils et morceaux qui matchent ton son. Écoute, follow, like, commente — chaque interaction reste la tienne.",
    demo: "queue" as const,
  },
] as const

export type HowItWorksDemoId = (typeof howItWorksSteps)[number]["demo"]
