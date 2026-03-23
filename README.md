# Sonopilot — site vitrine (`/website`)

Next.js (App Router), React, Tailwind CSS, shadcn/ui. **Front uniquement**, pas de backend.

## Démarrage

```bash
npm install
cp .env.example .env.local   # optionnel : définir NEXT_PUBLIC_SITE_URL en prod
npm run dev
```

- [http://localhost:3000](http://localhost:3000)

## Scripts

| Commande   | Rôle                |
| ---------- | ------------------- |
| `npm run dev`   | Dev                 |
| `npm run build` | Build production    |
| `npm run start` | Serveur après build |
| `npm run lint`  | ESLint (config officielle Next « core-web-vitals ») |

## Marque & design (aligné `/app`)

- **Couleurs** : variables HSL dans `src/app/globals.css` (identique à l’app `sonopilot-app`).
  - Fond beige : `#F4F3EF` → `hsl(48 19% 95%)`
  - Primaire rouge : `#E76159` → `hsl(3 75% 63%)`
  - Texte gris : `#696B73` → `hsl(228 5% 43%)` (muted-foreground)
- **Typo** : [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts via `next/font`) — corps et titres. L’app utilise aussi **Aileron** pour les titres en fichiers locaux ; si tu ajoutes `public/fonts/Aileron/*.otf`, tu pourras brancher `localFont` et `--font-heading`.
- **Logos** : `public/images/Logo/` (copiés depuis `/app`).

## SEO & performance

- `metadata` + `viewport` dans `src/app/layout.tsx`
- `src/app/robots.ts`, `src/app/sitemap.ts`
- `src/lib/site.ts` : nom, description, URL canonique (`NEXT_PUBLIC_SITE_URL`)

## Composants shadcn

```bash
npx shadcn@latest add <name>
```

Configuration : `components.json`.

## Landing — ligne éditoriale

Promesse, transparence (pas de botting, actions utilisateur), cible petits artistes et positionnement honnête : voir **`docs/landing-messaging.md`**. Plan de page conversion : **`docs/landing-page-plan.md`**.
