import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const legalPaths = [
    "mentions-legales",
    "politique-de-confidentialite",
    "cgu",
  ] as const

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  for (const path of legalPaths) {
    entries.push({
      url: `${base}/${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    })
    entries.push({
      url: `${base}/fr/${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    })
  }

  return entries
}
