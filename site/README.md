# Filament Demo Lab — Showcase Site

A static [Astro](https://astro.build) site that showcases the mobile app with screenshots, a screen recording, write‑ups, and links. It does **not** run Filament — see the [root README](../README.md).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  pages/index.astro     # The single showcase page (all sections)
  layouts/Base.astro    # HTML shell, meta/OG tags, fonts
  data/content.ts       # Demo cards, model licensing rows, transfer-notes table
  styles/global.css     # Design tokens + component styles
public/media/           # Screenshots + spinning-model video (referenced by the page)
```

## Deploy

Configured for Netlify via the repo‑root [`netlify.toml`](../netlify.toml) (`base = "site"`, `command = "npm run build"`, `publish = "dist"`). Output is fully static — any static host works.
