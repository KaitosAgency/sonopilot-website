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
    title: "Personnalise ton expérience",
    description:
      "Définis tes genres, tes centres d'intérêt et tes préférences de découverte — le tout depuis un seul onglet.",
    demo: "general" as const,
  },
  {
    number: "3",
    title: "Interagis avec ta communauté",
    description:
      "Découvre des profils pertinents, écoute et interagis — chaque geste est le tien. SoundCloud pour l'instant.",
    demo: "queue" as const,
  },
] as const

export type HowItWorksDemoId = (typeof howItWorksSteps)[number]["demo"]
