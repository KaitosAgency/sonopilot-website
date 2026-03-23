# Screenshots pour la landing page

## Cache après mise à jour

Le pilier **Artistes** utilise **`public/images/screenshots/sonopilot_sc_artists_details.jpg`**. Après remplacement du fichier, incrémente `?v=` dans `ARTISTS_SCREENSHOT` (`pillars.tsx`) si le navigateur garde l’ancienne version — `next.config` autorise les query sur `/images/**`.

## Format

- **WebP** (priorité) — meilleur ratio qualité/poids, supporté par tous les navigateurs modernes.
- **PNG** acceptable si tu ne peux pas exporter en WebP.
- Pas de JPEG (artefacts visibles sur les screenshots d'UI).

## Résolution

- **Largeur max : 2880 px** (= 1440 px d'affichage × 2 pour Retina).
- Pas besoin de dépasser 2880 px, Next.js `<Image>` redimensionne automatiquement.
- Si tu captures sur un écran 1080p, exporte en taille réelle (1920 px) — c'est suffisant.

## Nommage, orientation et ratio attendus

| Fichier | Contenu | Section LP | Orientation | Ratio cible |
|---------|---------|------------|-------------|-------------|
| `hero-dashboard.webp` | Dashboard principal — carte SoundCloud connectée, stats, toggle | Hero | **Horizontal** | 16:10 (ex. 2880×1800) |
| `pillar-fanbase.webp` | Onglet Auditeurs — tableau avec avatar, nom, pays, actions | Pilier 1 | **Horizontal** | 16:9 (ex. 2880×1620) |
| `pillar-artists.webp` | Onglet Artistes — tracks + boutons like/comment/follow | Pilier 2 | **Horizontal** | 16:9 |
| `pillar-hub.webp` | Sidebar avec toutes les plateformes (SoundCloud actif, reste grisé) | Pilier 3 | **Vertical** | 9:16 (ex. 540×960) — crop serré sur la sidebar seule |
| `step-signup.webp` | Écran d'inscription | Étape 1 | **Vertical** | 4:5 (ex. 1200×1500) — crop centré sur le formulaire |
| `step-connect.webp` | Carte SoundCloud avec bouton « Connecter » | Étape 2 | **Carré** | 1:1 (ex. 1200×1200) — crop sur la carte seule |
| `step-pilot.webp` | Barre quotas + 3 switches de pilotage | Étape 3 | **Horizontal** | 16:9 |
| `transparency-quotas.webp` | Barre quotas (zoom) | Transparence | **Horizontal** | 3:1 (ex. 2400×800) — bandeau large, crop serré sur la barre |
| `tracks-catalog.webp` | Page Mes Titres (optionnel) | Features / FAQ | **Horizontal** | 16:9 |
| `tracks-trends.webp` | Onglet Tracks tendances + repost (optionnel) | Pilier 2 / dédiée | **Horizontal** | 16:9 |

**Résumé rapide** :
- La plupart sont **horizontaux 16:9 ou 16:10** (screenshots classiques de l'app).
- La **sidebar** est un **crop vertical** (on ne montre que cette colonne).
- Le **formulaire d'inscription** est un **crop vertical 4:5** (centré sur le form).
- La **carte SoundCloud** déconnectée est un **crop carré 1:1**.
- La **barre de quotas** est un **bandeau large 3:1** (toute la largeur, peu de hauteur).

## Conseils de capture

- **Données de démo propres** : utilise un compte avec de vrais noms/avatars pour que ça rende bien.
- **Fenêtre ≈ 1440 × 900** pour un ratio cohérent.
- **Pas de barre d'adresse** ni de chrome navigateur — juste l'app.
- **Thème clair** (fond beige) — c'est le thème de la LP.
