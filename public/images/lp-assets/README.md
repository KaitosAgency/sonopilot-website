# Assets LP (avatars & artworks)

Ces fichiers sont des copies locales des URLs SoundCloud stockées dans **Supabase** (`soundcloud_management`), pour éviter les 404 et le chargement distant.

## Régénérer

Depuis `website/` :

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\download-lp-assets.ps1
```

Puis aligner les noms de fichiers avec `src/lib/fake-data.ts` (fonctions `A()` / `W()`).

Pour récupérer de nouvelles URLs depuis la base, utiliser le MCP Supabase (`execute_sql`) sur le projet **Sonopilot** et mettre à jour le script + `fake-data.ts`.
