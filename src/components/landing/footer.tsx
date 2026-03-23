import Image from "next/image"
import { siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-[hsl(228_10%_10%)] text-gray-400 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Logo/logo-sonopilot-only-icon-01.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              className="bg-transparent brightness-0 invert opacity-60"
            />
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href={siteConfig.appUrl + "/auth/signup"}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Accès alpha
            </a>
            <a
              href={siteConfig.appUrl + "/auth/login"}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Connexion
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
