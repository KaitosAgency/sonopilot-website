# Messaging landing — Sonopilot

Référence pour la rédaction de la page d'accueil (promesse, transparence, cible).

**Plan section par section (conversion)** : voir [`landing-page-plan.md`](./landing-page-plan.md).

---

## Résumé du produit (ce qui existe vraiment)

### Vision

Regrouper **tous les réseaux musicaux** (SoundCloud, Spotify, YouTube, Bandcamp, Beatport, TikTok) dans **un seul hub** pour piloter sa visibilité et ses échanges.

### État actuel (alpha)

**Seul SoundCloud est actif.** Les autres plateformes sont affichées « bientôt disponible » dans l'app.

### Actions concrètes SoundCloud

| Action | Description | Limite / jour |
|--------|-------------|---------------|
| **Follow** | Suivre un utilisateur pertinent | 50 |
| **Unfollow** | Se désabonner | 50 |
| **Like** | Liker une track | 75 |
| **Comment** | Commentaire court (max 7 car., sans lien) | 50 |
| **Repost** | Reposter une track tendance | 3 |

### 3 modes de pilotage

1. **Engager avec sa fanbase** — follow/unfollow d'auditeurs détectés par style musical.
2. **Connecter avec des artistes similaires** — follow, like, commenter les tracks d'artistes du même créneau.
3. **Suivre les tendances** — reposter les meilleures tracks du moment dans son genre.

### SoundCloud — à venir

- **Détection de labels** dans ta niche — repérer les labels actifs pour cibler tes envois et interactions.
- **Playlists intelligentes** — création automatique de playlists pour autopromouvoir tes morceaux auprès du bon public.

### Gestion de catalogue

Édition des tracks SoundCloud depuis le hub : titre, artiste, genre, description, tags, artwork.

### Tableaux de gestion

Auditeurs, artistes et tracks dans des tableaux avec filtres, tri, pagination, recherche, actions groupées (bulk), lien direct SoundCloud, détail avec lecteur embarqué.

---

## SEO — mots-clés (à réinjecter dans titres, chapô, H2)

À combiner naturellement dans le corps de page (pas de bourrage) :

- **Anglais** : Music Marketing, Music Promotion, indie artist promotion, promote your music, music career, independent artists, organic growth, SoundCloud promotion, music discovery, fan engagement, artist tools, DIY musician.
- **Français** : marketing musical, promotion musicale, artistes indépendants, carrière musicale, visibilité musicale, découverte musicale, engagement authentique, outil pour musiciens.

Ces termes sont aussi listés dans `src/lib/site.ts` (`keywords`) pour les balises meta.

---

## Engagement produit & éthique

- **Pas de botting, pas de trafic artificiel.** Aucune action « automatique » opaque qui simule de l'engagement ou gonfle artificiellement les métriques.
- **Toutes les actions sont initiées par l'utilisateur.** L'artiste met en file chaque follow, like, commentaire ou repost. Rien ne part à son insu.
- **Quotas journaliers** respectant les règles SoundCloud (50 follows, 75 likes, etc.). Commentaires courts, sans liens.
- Ces formulations peuvent être reprises dans le hero, une bannière « transparence » ou la FAQ pour réduire le scepticisme et se distinguer des services douteux.

---

## Cible

- **Petits artistes** : artistes émergents, indépendants, qui manquent de visibilité et de retours qualifiés.
- Pas les grandes équipes marketing ou les artistes signés avec du budget promo.
- Des gens qui produisent eux-mêmes et veulent un coup de pouce honnête.

---

## Vision multi-réseaux (à mettre en avant sur la LP)

- L'objectif est de **centraliser** SoundCloud, Spotify, YouTube, Bandcamp, Beatport et TikTok.
- **Aujourd'hui** : SoundCloud est la seule intégration active.
- **Demain** : les artistes inscris à l'alpha influenceront la prochaine plateforme intégrée.
- Sur la LP : montrer les icônes de toutes les plateformes (SoundCloud en couleur, les autres grisées avec badge « bientôt »).

---

## Positionnement honnête (éviter la surpromesse)

- Sonopilot **ne remplace pas** le travail de rigueur et de qualité sur la musique, la cohérence artistique et la régularité de publication.
- Le produit **complète** ce travail en apportant :
  - un **peu plus de visibilité** là où l'artiste peine à être vu ;
  - un **gain de temps** en évitant la dispersion, pour **se concentrer sur** :
    - les **échanges avec leur communauté** ;
    - **l'engagement auprès d'autres artistes** (pair-à-pair, réseau pertinent).

---

## Blocs utiles sur la LP (copier / adapter)

**Transparence (court)**  
« Pas de botting ni de faux trafic — chaque action part de ton initiative. »

**Cible**  
« Pensé pour les petits artistes qui veulent sortir de l'anonymat sans tricher avec leur audience. »

**Rôle du produit**  
« Sonopilot ne remplace pas une bonne prod ni une discipline de sortie : ça aide à être un peu plus visible et à gagner du temps pour ce qui compte vraiment — ta communauté et les autres artistes. »

**Multi-réseaux**  
« Un seul tableau de bord pour tous tes réseaux musicaux. SoundCloud est déjà là ; Spotify, YouTube, Bandcamp et les autres suivent. »

**Actions concrètes**  
« Follow, like, commente, reposte — tu lances chaque action, on la met en file et on respecte les limites. »

---

## FAQ (suggestions)

- *Est-ce que vous achetez des streams / followers ?* → Non. Pas de trafic artificiel ; tout part de tes actions avec des quotas qui respectent les règles SoundCloud.
- *Qui décide des actions ?* → Toi. Chaque follow, like, commentaire ou repost est mis en file par toi, jamais lancé à ton insu.
- *Ça remplace un community manager / une bonne prod ?* → Non. C'est un complément pour gagner du temps et être un peu plus visible.
- *SoundCloud seulement pour l'instant ?* → Oui, c'est la première intégration. Spotify, YouTube, Bandcamp, Beatport et TikTok sont en développement.
- *Mes données & mon compte SoundCloud ?* → Connexion OAuth sécurisée. Tes credentials ne sont jamais stockés. Tu peux te déconnecter à tout moment.
- *Quand d'autres plateformes ?* → On construit avec les alpha testeurs. Rejoins-nous pour influencer la roadmap.
- *C'est vraiment gratuit ?* → Oui, pendant l'alpha. Pas de carte bancaire demandée.
