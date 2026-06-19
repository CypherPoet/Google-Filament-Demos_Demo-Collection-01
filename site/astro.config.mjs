// @ts-check
import { defineConfig } from 'astro/config';

// Static output (the default) — Astro emits a plain `dist/` folder that Netlify
// serves directly. No SSR adapter is needed for this showcase site.
// `site` is used for absolute URLs (sitemap, OG tags); update it to the real
// Netlify URL after the first deploy.
export default defineConfig({
  site: 'https://filament-demo-lab.netlify.app',
});
