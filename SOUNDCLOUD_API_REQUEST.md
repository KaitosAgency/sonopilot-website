# SoundCloud API Access Request — Sonopilot

## What is Sonopilot?

Sonopilot is a community discovery hub for independent musicians. It helps artists find relevant listeners and other artists within their genre on SoundCloud, browse profiles, and manage their presence from a single dashboard.

The product is built and maintained by a solo developer (Valentin) who is also an independent artist — the project was born out of a personal frustration with the difficulty of connecting with the right audience as an emerging musician.

## How Sonopilot uses the SoundCloud API

Sonopilot connects via **OAuth** — no credentials are stored. Users can disconnect and delete their account at any time.

Core features:
- **Profile discovery**: surfaces active listeners and artists aligned with the user's musical genres (based on public profile data: genres, followers, activity).
- **Artist exploration**: integrated SoundCloud player, artist profiles, track browsing — all within one interface instead of multiple browser tabs.
- **Dashboard**: centralized view of the user's SoundCloud catalog (tracks, plays, likes, comments) for quick oversight.

Every interaction (follow, like, comment) is **individually initiated by the user** through the interface. Sonopilot does not perform any action without explicit user input.

## 18 months of internal testing — what we learned

We have been testing Sonopilot internally with a small group of artists for approximately **18 months**, using a development API setup. Here is what we observed:

### What Sonopilot did NOT do
- **No fake traffic.** Streams, plays, and listener counts were not inflated. Profiles with little content did not see artificial growth.
- **No audience boosting.** Accounts that were inactive or had few tracks did not gain followers or engagement from using Sonopilot. The tool does not create engagement out of nothing.
- **No content promotion.** Sonopilot does not promote tracks, push content into feeds, or manipulate recommendations in any way.

### What Sonopilot DID do for active, consistent artists
- **More meaningful conversations.** Artists who were already active and posting regularly saw a significant increase in **comments and direct messages** from listeners who genuinely engaged with their music — giving feedback, sharing thoughts, and starting real conversations.
- **Artist collaborations.** Several collaborations between artists were initiated through connections made via Sonopilot — both online (remix exchanges, feature requests) and in-person (studio sessions, live events).
- **Time savings.** Instead of switching between tabs and manually searching for profiles, artists could browse relevant listeners and artists from one place, freeing up time for what matters: creating music and nurturing their community.
- **Engagement with the right people.** The key outcome was not "more numbers" but **better connections** — interactions with active users who actually listen, respond, and come back.

### Summary

Sonopilot works as a **discovery and community-building tool**, not a growth hack. It benefits artists who are already doing the work (releasing music, engaging with their community) by making it easier to find and connect with the right people. It does not replace effort, and it does not create results for inactive profiles.

## Why we are requesting official API access

We want to move from our development/testing setup to an official API integration so that we can:

1. **Open the alpha to more artists** — we currently have a small waitlist of independent musicians who want to try Sonopilot.
2. **Comply fully with SoundCloud's API guidelines** — we want to operate transparently and within the official framework.
3. **Build a sustainable integration** — as we expand to other platforms (Spotify, YouTube, etc.), SoundCloud remains our first and primary integration, and we want it to be solid.

## Technical details

- **Stack**: Next.js (React), Supabase (auth + database), deployed on Vercel.
- **OAuth flow**: standard SoundCloud OAuth2 — users authorize via SoundCloud's consent screen, tokens are stored securely, refresh is handled automatically.
- **Rate limiting**: built-in safeguards to stay well within API rate limits. We do not attempt to maximize API calls.
- **Data usage**: we only access public profile data (username, genre, followers, tracks, public activity). No private data is accessed or stored beyond what OAuth provides.

## About the founder

Valentin is a solo developer and independent artist based in France. Sonopilot started as a personal project to solve his own problem: publishing music and getting no response — not because the music was bad, but because no one saw it. After 18 months of building and testing, the product is ready for a wider alpha launch.

- Website: [sonopilot.com](https://sonopilot.com)
- Contact: [à compléter]

---

*This document was prepared to accompany our SoundCloud API access request. We are happy to provide a demo, answer any questions, or share additional technical documentation.*
