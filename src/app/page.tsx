import { permanentRedirect } from "next/navigation"

import { defaultLocale } from "@/lib/i18n/config"

/** Redirection fiable : `/` → locale par défaut (voir `defaultLocale` dans `i18n/config`). */
export default function RootRedirectPage() {
  permanentRedirect(`/${defaultLocale}`)
}
