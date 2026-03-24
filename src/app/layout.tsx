import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { ComingSoonProvider } from "@/components/landing/coming-soon";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { getTranslations } from "@/lib/i18n/translations";
import { siteConfig } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F3EF" },
    { media: "(prefers-color-scheme: dark)", color: "#12141A" },
  ],
};

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      fr: `${siteConfig.url}/fr`,
      en: `${siteConfig.url}/`,
      "x-default": `${siteConfig.url}/`,
    },
  },
  icons: {
    icon: "/images/Logo/logo-sonopilot-only-icon-01.svg",
    apple: "/images/Logo/logo-sonopilot-only-icon-01.svg",
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const messages = getTranslations(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen font-sans`}
        style={
          {
            "--font-heading": "var(--font-sans)",
          } as React.CSSProperties
        }
      >
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="beforeInteractive"
            />
            <Script id="ga4-init" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
        <I18nProvider locale={locale} messages={messages}>
          <ComingSoonProvider>{children}</ComingSoonProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
