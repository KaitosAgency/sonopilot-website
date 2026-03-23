/** Largeur des démos dans la grille « Comment ça marche ». */
export const howItWorksDemoStageClassName = "mx-auto w-full min-w-0"

export const howItWorksSteps = [
  {
    number: "1",
    title: "Connecte SoundCloud",
    description:
      "OAuth : liaison en un clic, pas de stockage en clair, déconnexion à tout moment. Premier réseau disponible : SoundCloud.",
    demo: "connect" as const,
  },
  {
    number: "2",
    title: "Configure ton pilotage",
    description:
      "Onglet Général : modes (fanbase, similaires, tendances), styles, commentaires rapides — paramètres du compte connecté.",
    demo: "general" as const,
  },
  {
    number: "3",
    title: "Ajoute des actions en file",
    description:
      "Like, follow, commentaire depuis les tableaux. File unique, plafonds journaliers. SoundCloud pour l’instant.",
    demo: "queue" as const,
  },
] as const

export type HowItWorksDemoId = (typeof howItWorksSteps)[number]["demo"]
