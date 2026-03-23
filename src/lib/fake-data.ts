/**
 * Données LP — profils et notifications.
 * Avatars / artworks : fichiers locaux (téléchargés depuis les URLs SoundCloud
 * stockées dans Supabase — table soundcloud_management).
 */

const A = (n: number) => `/images/lp-assets/avatar-${String(n).padStart(2, "0")}.jpg`
const W = (n: number) => `/images/lp-assets/artwork-${String(n).padStart(2, "0")}.jpg`

export interface FakeProfile {
  username: string
  avatarUrl: string
  genre: string
  country: string
  followers: number
}

export interface FakeNotification {
  type: "like" | "comment" | "follow" | "repost"
  username: string
  avatarUrl: string
  trackTitle?: string
  artworkUrl?: string
  comment?: string
  timeAgo: string
}

export const profiles: FakeProfile[] = [
  {
    username: "Igor Jaworski",
    avatarUrl: A(1),
    genre: "Trap",
    country: "PL",
    followers: 2415,
  },
  {
    username: "dj raylight",
    avatarUrl: A(2),
    genre: "DJ / Chill",
    country: "DE",
    followers: 836,
  },
  {
    username: "KiLLA",
    avatarUrl: A(3),
    genre: "Hip-Hop",
    country: "US",
    followers: 892,
  },
  {
    username: "Big Money",
    avatarUrl: A(4),
    genre: "Trap",
    country: "RU",
    followers: 128,
  },
  {
    username: "Max Sanchez",
    avatarUrl: A(5),
    genre: "Hip-Hop",
    country: "US",
    followers: 1540,
  },
  {
    username: "NSM Beats",
    avatarUrl: A(6),
    genre: "Trap",
    country: "FR",
    followers: 11172,
  },
  {
    username: "$tarfy",
    avatarUrl: A(7),
    genre: "Drill",
    country: "JP",
    followers: 42,
  },
  {
    username: "MN CLIQUE",
    avatarUrl: A(8),
    genre: "Drill",
    country: "IT",
    followers: 156,
  },
  {
    username: "Zenkey",
    avatarUrl: A(9),
    genre: "Hip-Hop",
    country: "VN",
    followers: 892,
  },
  {
    username: "Grek The Creator",
    avatarUrl: A(10),
    genre: "Hip-Hop",
    country: "RU",
    followers: 412,
  },
]

export const notifications: FakeNotification[] = [
  {
    type: "like",
    username: "Igor Jaworski",
    avatarUrl: A(1),
    trackTitle: "młody giet — ciało stałe",
    artworkUrl: W(1),
    timeAgo: "2 min",
  },
  {
    type: "follow",
    username: "dj raylight",
    avatarUrl: A(2),
    timeAgo: "5 min",
  },
  {
    type: "comment",
    username: "KiLLA",
    avatarUrl: A(3),
    trackTitle: "Label Dinner",
    artworkUrl: W(3),
    comment: "🔥🔥",
    timeAgo: "8 min",
  },
  {
    type: "repost",
    username: "Big Money",
    avatarUrl: A(4),
    trackTitle: "BMY Drugg — UGLY",
    artworkUrl: W(4),
    timeAgo: "12 min",
  },
  {
    type: "like",
    username: "Max Sanchez",
    avatarUrl: A(5),
    trackTitle: "Nothing To Lose",
    artworkUrl: W(5),
    timeAgo: "15 min",
  },
  {
    type: "follow",
    username: "NSM Beats",
    avatarUrl: A(6),
    timeAgo: "18 min",
  },
  {
    type: "comment",
    username: "$tarfy",
    avatarUrl: A(7),
    trackTitle: "JP DRILL DIS",
    artworkUrl: W(7),
    comment: "pépite",
    timeAgo: "22 min",
  },
  {
    type: "like",
    username: "MN CLIQUE",
    avatarUrl: A(8),
    trackTitle: "I PIU' GAY DI PV",
    artworkUrl: W(8),
    timeAgo: "25 min",
  },
  {
    type: "repost",
    username: "Zenkey",
    avatarUrl: A(9),
    trackTitle: "Night Shift — demo",
    artworkUrl: W(2),
    timeAgo: "28 min",
  },
  {
    type: "follow",
    username: "Grek The Creator",
    avatarUrl: A(10),
    timeAgo: "31 min",
  },
  {
    type: "comment",
    username: "NSM Beats",
    avatarUrl: A(6),
    trackTitle: "Type beat — 808",
    artworkUrl: W(6),
    comment: "clean mix",
    timeAgo: "34 min",
  },
]
