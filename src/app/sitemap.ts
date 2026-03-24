import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const legalPaths = [
    "mentions-legales",
    "politique-de-confidentialite",
    "cgu",
  ] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    entries.push({
      url: `${base}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
    for (const path of legalPaths) {
      entries.push({
        url: `${base}/${lang}/${path}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }

  return entries;
}
