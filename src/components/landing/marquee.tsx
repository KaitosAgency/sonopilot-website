"use client"

import Image from "next/image"
import { Heart, MessageCircle, UserPlus, Repeat2 } from "lucide-react"
import { profiles, notifications, type FakeNotification } from "@/lib/fake-data"
import { cn } from "@/lib/utils"

const typeIcon = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  repost: Repeat2,
}

const typeLabel: Record<string, (n: FakeNotification) => string> = {
  like: (n) => `a liké ${n.trackTitle}`,
  follow: () => "te suit maintenant",
  comment: (n) => `« ${n.comment} »`,
  repost: (n) => `a reposté ${n.trackTitle}`,
}

const typeDot: Record<string, string> = {
  like: "bg-rose-500",
  follow: "bg-primary",
  comment: "bg-amber-500",
  repost: "bg-green-600",
}

function ProfileCard({
  username,
  avatarUrl,
  genre,
  country,
  followers,
}: (typeof profiles)[number]) {
  return (
    <div className="shrink-0 w-[280px] max-w-[min(280px,85vw)] mx-2.5 rounded-xl border border-border/30 bg-card px-2.5 py-2 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 h-fit min-h-0">
      <div className="relative shrink-0 self-center">
      <Image
        src={avatarUrl}
        alt={username}
        width={36}
        height={36}
        quality={90}
        className="rounded-full object-cover w-9 h-9"
      />
        <span className="absolute -bottom-px -right-px w-3 h-3 rounded-full bg-green-500 border border-card" />
      </div>
      <div className="min-w-0 flex-1 text-left flex flex-col justify-center gap-0.5">
        <div className="flex items-baseline justify-between gap-2 min-h-[1.125rem]">
          <span className="text-xs font-semibold text-foreground truncate min-w-0">
            {username}
          </span>
          <span className="shrink-0 text-[10px] font-medium text-muted-foreground tabular-nums">
            {country}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground/70 leading-tight truncate">
          {genre} · {followers.toLocaleString("fr-FR")} abonnés
        </p>
      </div>
    </div>
  )
}

function NotifCard({ notif }: { notif: FakeNotification }) {
  const Icon = typeIcon[notif.type]
  const dotClass = typeDot[notif.type] ?? "bg-muted-foreground"

  return (
    <div
      className={cn(
        "shrink-0 w-[280px] max-w-[min(280px,85vw)] mx-2.5 rounded-xl border border-border/30 bg-card px-2.5 py-2 shadow-sm hover:shadow-md transition-shadow flex items-center gap-2.5 h-fit min-h-0"
      )}
    >
      <div className="relative shrink-0 self-center">
        <Image
          src={notif.avatarUrl}
          alt=""
          width={36}
          height={36}
          quality={90}
          className="rounded-full object-cover w-9 h-9"
        />
        <span
          className={cn(
            "absolute -bottom-px -right-px w-3.5 h-3.5 rounded-full border border-card flex items-center justify-center",
            dotClass
          )}
        >
          <Icon className="h-[7px] w-[7px] text-white" />
        </span>
      </div>

      {notif.artworkUrl ? (
        <Image
          src={notif.artworkUrl}
          alt=""
          width={32}
          height={32}
          quality={90}
          className="rounded-md shrink-0 object-cover w-8 h-8 border border-border/40 self-center"
        />
      ) : null}

      <div className="min-w-0 flex-1 py-0.5 leading-none">
        <p className="text-xs text-foreground truncate leading-snug">
          <span className="font-semibold">{notif.username}</span>{" "}
          <span className="text-muted-foreground">
            {typeLabel[notif.type](notif)}
          </span>
        </p>
        <p className="text-[10px] text-muted-foreground/50 mt-0.5 leading-none">
          il y a {notif.timeAgo}
        </p>
      </div>
    </div>
  )
}

export function Marquee() {
  const row1 = [
    ...profiles.slice(0, 3).map((p) => ({ type: "profile" as const, data: p })),
    ...notifications
      .slice(0, 2)
      .map((n) => ({ type: "notif" as const, data: n })),
    ...profiles.slice(3, 5).map((p) => ({ type: "profile" as const, data: p })),
    ...notifications
      .slice(2, 4)
      .map((n) => ({ type: "notif" as const, data: n })),
    ...profiles.slice(5, 7).map((p) => ({ type: "profile" as const, data: p })),
  ]

  const row2 = [
    ...notifications
      .slice(4, 6)
      .map((n) => ({ type: "notif" as const, data: n })),
    ...profiles.slice(7, 10).map((p) => ({ type: "profile" as const, data: p })),
    ...notifications
      .slice(6, 8)
      .map((n) => ({ type: "notif" as const, data: n })),
    ...profiles.slice(0, 3).map((p) => ({ type: "profile" as const, data: p })),
    ...notifications
      .slice(0, 2)
      .map((n) => ({ type: "notif" as const, data: n })),
  ]

  const doubled1 = [...row1, ...row1]
  const doubled2 = [...row2, ...row2]

  return (
    <section className="py-12" aria-label="Activité récente de la communauté">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/50 mb-6">
        Activité récente de la communauté
      </p>

      <div className="space-y-4 marquee-fade overflow-x-clip py-1">
        <div className="animate-marquee flex w-max items-center">
          {doubled1.map((item, i) =>
            item.type === "profile" ? (
              <ProfileCard key={`r1-${i}`} {...item.data} />
            ) : (
              <NotifCard key={`r1-${i}`} notif={item.data} />
            )
          )}
        </div>

        <div className="animate-marquee-reverse flex w-max items-center">
          {doubled2.map((item, i) =>
            item.type === "profile" ? (
              <ProfileCard key={`r2-${i}`} {...item.data} />
            ) : (
              <NotifCard key={`r2-${i}`} notif={item.data} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
