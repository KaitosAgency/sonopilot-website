/** Largeur des démos dans la grille « Comment ça marche ». */
export const howItWorksDemoStageClassName = "mx-auto w-full min-w-0"

/** Ordre des démos ; titres et descriptions viennent des fichiers i18n. */
export const howItWorksStepDemos = [
  { demo: "connect" as const },
  { demo: "general" as const },
  { demo: "queue" as const },
] as const

export type HowItWorksDemoId = (typeof howItWorksStepDemos)[number]["demo"]
