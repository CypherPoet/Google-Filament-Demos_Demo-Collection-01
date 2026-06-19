---
name: Filament Demo Lab
description: A spectral, instrument-precise dark showcase for mobile-native React Native + Google Filament 3D rendering demos.
colors:
  base: "oklch(0.15 0.02 280)"
  base-2: "oklch(0.185 0.022 281)"
  elevated: "oklch(0.215 0.024 283)"
  surface: "oklch(1 0 0 / 0.045)"
  surface-2: "oklch(1 0 0 / 0.08)"
  border: "oklch(1 0 0 / 0.1)"
  border-strong: "oklch(1 0 0 / 0.2)"
  text: "oklch(0.97 0.004 280)"
  text-2: "oklch(0.97 0.004 280 / 0.72)"
  text-3: "oklch(0.97 0.004 280 / 0.56)"
  iris: "oklch(0.72 0.16 286)"
  iris-bright: "oklch(0.79 0.15 288)"
  ink-on-accent: "oklch(0.17 0.03 286)"
  amber: "oklch(0.82 0.13 73)"
  cyan: "oklch(0.84 0.1 210)"
  license: "oklch(0.83 0.14 158)"
  spectrum-teal: "oklch(0.8 0.12 200)"
  spectrum-iris: "oklch(0.68 0.19 290)"
  spectrum-magenta: "oklch(0.7 0.23 340)"
  spectrum-amber: "oklch(0.82 0.14 70)"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(40px, 7vw, 68px)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(26px, 4vw, 38px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "11.5px"
    fontWeight: 600
    letterSpacing: "0.08em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "12.5px"
    fontWeight: 500
rounded:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  gutter: "24px"
  section: "clamp(56px, 9vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.iris-bright}"
    textColor: "{colors.ink-on-accent}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.iris}"
    textColor: "{colors.ink-on-accent}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.sm}"
    padding: "5px 10px"
  card:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  demo-badge:
    textColor: "{colors.amber}"
    rounded: "{rounded.sm}"
    padding: "4px 9px"
  note:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.md}"
    padding: "16px 18px"
---

# Design System: Filament Demo Lab

## 1. Overview

**Creative North Star: "The Render Bay"**

A darkened studio bay where each 3D model is mounted, lit, and presented. The interface is the matte, instrument-grade equipment that surrounds a lit subject — and the page itself is lit the way the demos are: by a spectral environment, the web echo of the image-based lighting (IBL) that lights every render inside the app. Precision and cinema in one surface: a faint blueprint grid of crosshair ticks carries the engineering exactness, while a prism-spectrum bloom carries the light.

The system commits to one cool near-black world (`base`, an OKLCH L0.15 surface with a faint iris cast) and lets a full spectrum live in the *atmosphere* rather than the chrome. The hero is washed by a diffuse bloom that sweeps teal → iris → magenta → amber; the bloom is anchored to the top of each page and dissolves as the reader descends, so the page opens cinematic and settles into substance. Interactive chrome stays disciplined: a single **iris** primary, **amber** reserved as the one warm signal, and quiet functional accents for code and licensing.

It explicitly rejects the **generic SaaS landing page** (gradient-blob hero, identical feature-card grid, pricing tiers, "trusted by" logos) and the **undesigned GitHub README** (a wall of text and tables with no hierarchy or craft). It is also not a clone of the upstream `react-native-filament` banner that inspired it: it borrows the spectral-render *energy* and makes it this showcase's own. The demos are always the hero; nothing decorative competes with a render.

**Key Characteristics:**
- Cool near-black surface; the color story lives in the atmosphere, not the UI chrome.
- A spectral bloom (teal→iris→magenta→amber) anchored to the hero, fading downward.
- A faint blueprint grid of `+` crosshair ticks + film grain for instrument-grade texture.
- One iris primary; amber rationed as the single warm signal.
- Flat surfaces, hairline borders, tonal layering — depth without heavy shadow.

## 2. Colors

A cool near-black canvas under a full prism spectrum that is spent almost entirely on atmosphere; the working UI is iris-led and tightly rationed.

### Primary
- **Spectral Iris** (`oklch(0.72 0.16 286)`): the heart of the spectrum and the one interactive accent — links, focus rings, the demonstrates-list bullets, the active architecture node, and card-hover borders. `iris-bright` (`oklch(0.79 0.15 288)`) lifts the primary button and the "Demo Lab" wordmark; `ink-on-accent` (`oklch(0.17 0.03 286)`) is the near-black text that rides on top of iris fills.

### Secondary
- **Filament Amber** (`oklch(0.82 0.13 73)`): the spectrum's warm end, demoted from a sole accent to a single recurring *signal* — the live status dot and the `DEMO 0x` badges. Its scarcity is what makes it read as "active / powered."

### Tertiary
- **Signal Cyan** (`oklch(0.84 0.1 210)`): functional only — inline code, model ids, sizes, and code-block keywords. Never interactive.
- **Permissive Green** (`oklch(0.83 0.14 158)`): semantic only — the CC0 / permissive-license chip.

### Neutral
- **Bay Black** (`oklch(0.15 0.02 280)`): the page surface, faintly iris-tinted.
- **Riser** (`oklch(0.185 0.022 281)`) / **Elevated** (`oklch(0.215 0.024 283)`): the two tonal steps up for the phone frame and cards.
- **Surface films** (`white @ 4.5%` / `8%`): chips, pills, ghost buttons, table headers.
- **Hairlines** (`white @ 10%` / `20%`): the only borders in the system.
- **Ink** — **Text** (`oklch(0.97 0.004 280)`), **Text-2** (`@72%`, body/secondary), **Text-3** (`@56%`, metadata). Text-3 is held at 56% opacity *on purpose*: it clears WCAG AA (≈5.8:1 on `elevated`) where a lighter muted gray would not.

### The Spectrum (atmosphere only)
The bloom stops — **teal** `oklch(0.8 0.12 200)`, **iris** `oklch(0.68 0.19 290)`, **magenta** `oklch(0.7 0.23 340)`, **amber** `oklch(0.82 0.14 70)` — exist only as low-alpha radial-gradient light. They never touch text, borders, or fills.

### Named Rules
**The Single Filament Rule.** Iris is the only interactive color and amber is the only warm signal; both are rationed. If a surface needs a third "look at me" color, the answer is hierarchy, not hue.

**The Spectrum-Stays-In-The-Air Rule.** The full prism lives in the atmosphere layer (bloom) and nowhere else. A spectral color on a button, a border, or body text is forbidden — it belongs to the light, not the object.

## 3. Typography

**Display / Body Font:** Inter (with `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
**Label / Mono Font:** JetBrains Mono (with `ui-monospace, 'SF Mono', Menlo, monospace`)

**Character:** One humanist-geometric sans carries everything from the display wordmark to body copy through committed weight and size contrast (400 → 800), paired with a monospace that is *earned* rather than decorative — this is a graphics/rendering tool, so code, model ids, versions, and license strings legitimately speak in mono.

### Hierarchy
- **Display** (800, `clamp(40px, 7vw, 68px)`, line-height 1.12, letter-spacing −0.03em): the hero wordmark only; `text-wrap: balance`.
- **Headline** (700, `clamp(26px, 4vw, 38px)`, −0.02em): section titles. The sub-page title runs slightly larger (800, `clamp(28px, 5vw, 44px)`).
- **Title** (700, 20px): card names.
- **Body** (400, 17px, line-height 1.65, capped ~64ch): section ledes and prose. `text-wrap: pretty` to limit orphans. Light-on-dark gets the generous 1.65 leading because light type reads lighter.
- **Label** (600, 11.5px, letter-spacing 0.08em, uppercase): table headers.
- **Mono** (500, 12.5px, JetBrains Mono): inline code, model ids, sizes, chips, the architecture flow.

### Named Rules
**The Earned-Mono Rule.** Monospace appears only where the content is literally code, an identifier, a version, or a license. It is never a costume for "this feels technical."

**The No-Gradient-Text Rule.** Display emphasis comes from weight, size, and a single solid color (iris) — never from `background-clip: text` over a gradient.

## 4. Elevation

Flat by default, with depth built from **tonal layering** (`base` → `base-2` → `elevated`) and hairline white borders rather than shadows. Shadow is a deliberate, scarce material: it appears only where something is genuinely lifted off the page or lit.

### Shadow Vocabulary
- **Hero lift** (`box-shadow: 0 40px 120px -40px oklch(0 0 0 / 0.8), 0 0 80px -30px oklch(0.68 0.19 290 / 0.45), inset 0 0 0 1px oklch(1 0 0 / 0.03)`): the phone mockup — a deep drop plus an iris glow so it reads as lit by the same environment.
- **Card hover** (`box-shadow: 0 24px 60px -34px oklch(0.68 0.19 290 / 0.5)`): an iris-tinted bloom that only appears on hover.
- **Lightbox** (`box-shadow: 0 40px 120px -30px oklch(0 0 0 / 0.9)`): the full-resolution viewer floating over a blurred backdrop.
- **Accent glow**: the amber live dot's soft halo and pulse.

### Named Rule
**The Flat-At-Rest Rule.** Surfaces are flat with a hairline border at rest. Shadow is a response to state (hover, float, lit) — if a static card has a drop shadow, it's wrong.

## 5. Components

### Buttons
- **Shape:** fully pill (999px).
- **Primary:** `iris-bright` fill with `ink-on-accent` (near-black) text, padding `12px 20px`; hover deepens to `iris` and lifts `translateY(-1px)`.
- **Ghost:** `surface` film with a `border-strong` hairline and `text` color; hover shifts to `surface-2` and an `iris-border` edge.
- **Focus / hover easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) — no bounce.

### Chips & Pills
- **Stack chip:** mono, `surface` film, `border` hairline, 8px radius — version/tech tags.
- **Status pill:** rounded-pill `surface`, with a pulsing **amber** dot as the live signal.
- **License chip:** mono, `surface-2`; the CC0 variant switches text + border to **Permissive Green**.

### Cards (demo gallery)
- **Corner Style:** 18px (`rounded.lg`).
- **Background:** `elevated`, with a `border` hairline; the image tile sits on an `elevated → base` gradient.
- **Shadow Strategy:** flat at rest; iris-tinted bloom + `-3px` lift on hover (see Elevation).
- **Border:** brightens to `iris-border` on hover.
- **Signature detail:** a mono **`DEMO 0x`** badge in amber, top-left over a blurred glass plate; demonstrates-list items use a small iris square marker.
- **Internal Padding:** 20px.

### Tables
- Bordered, 18px-radius wrapper; uppercase mono `label` headers on a `surface` film; `border` hairline row dividers; the last row drops its border. Inline values are mono in **cyan**.

### Inputs / Fields
No form inputs exist in this showcase. If added, follow the system: `surface` fill, `border-strong` hairline, `radius.md`, and an `iris` focus ring at `outline-offset: -2px` (matching the gallery tile's focus treatment).

### Navigation
No persistent nav bar — the home page is a single scroll, and the sub-page uses a mono-weighted **back-link** (`← Filament Demo Lab`) that shifts to `iris-bright` on hover. Footer links shift to `iris-bright` on hover.

### Signature Component — The Atmosphere
Two fixed/absolute layers behind all content, `aria-hidden`:
1. A full-page **blueprint grid** (a 56px SVG tile of faint `+` crosshair ticks) plus a **film-grain** overlay (`feTurbulence`, `mix-blend-mode: overlay`, ~0.4 opacity).
2. A **spectral bloom** (layered radial gradients: teal/iris/magenta/amber) anchored to the top of the page, masked to fade out by ~`1100px` so each page opens lit and calms below.

A full-width **spectral hairline** (`border-image` gradient, neutral with an iris-lit center) marks each new section — the recurring "prism" cadence that replaces a per-section text kicker.

## 6. Do's and Don'ts

### Do:
- **Do** keep the spectrum in the air. Spend the prism on the atmosphere bloom; keep working UI to iris + amber + neutrals.
- **Do** ration amber to a single warm signal (live dot, `DEMO 0x` badge). Scarcity is the point.
- **Do** build depth from tonal layers (`base`→`base-2`→`elevated`) and hairline borders; reserve shadow for genuinely-lifted/lit elements.
- **Do** keep every text color at WCAG AA on its surface — `text-3` is the floor at 56% opacity; verify any new muted tone hits ≥4.5:1.
- **Do** present each render full-bleed in its tile, the model centered and unobstructed; the demo is always the hero.
- **Do** give every animation a `prefers-reduced-motion` path — the auto-spin video pauses and exposes controls; the live-dot pulse and hover transitions collapse.
- **Do** mark new sections with the spectral hairline divider, not a text eyebrow.

### Don't:
- **Don't** use gradient text (`background-clip: text` over a gradient). Emphasis is weight, size, and a single solid iris.
- **Don't** use a `border-left`/`border-right` color stripe greater than 1px on cards, notes, or callouts. Use a full hairline border + a tint (see the attribution `.note`).
- **Don't** stack a tiny uppercase tracked **eyebrow** above every section — that cadence is banned; lead with the headline and let the spectral divider signal the section.
- **Don't** let it read as a **generic SaaS landing page**: no gradient-blob hero, no identical icon+heading+text card grid, no pricing tiers, no "trusted by" logo wall.
- **Don't** let it read as a **plain GitHub README**: technical content must be composed, with hierarchy and the renders doing visual work.
- **Don't** drift into crypto/AI-hype (decorative glassmorphism, gradients on everything) or toy/gamey styling — either undercuts the engineering credibility the brand depends on.
- **Don't** imply the renders run in the browser. The site documents a native-GPU (Metal) runtime; keep the phone/native framing honest.
- **Don't** put a spectral hue on a button, border, or body text — color belongs to the light, not the object.
