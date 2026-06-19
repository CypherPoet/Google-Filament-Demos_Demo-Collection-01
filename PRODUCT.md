# Product

## Register

brand

## Users

Technically literate visitors, broadly — there is no single persona, and the
site should read well to all of them:

- **React Native / mobile engineers** evaluating whether `react-native-filament`
  is viable for their own 3D work, especially on a bleeding-edge stack (RN 0.86,
  New Architecture, Xcode 26).
- **Graphics / 3D practitioners** coming from Three.js, Blender, or Godot, curious
  how familiar concepts (scene graph, IBL, PBR, orbit controls, animation) map onto
  Filament's API.
- **Peers, collaborators, and portfolio viewers** judging the craft of the work.

Their context: a short, self-directed visit — skimming to understand what the demos
show and to decide whether the approach (and the person behind it) is credible. They
are not transacting; they are forming an impression and, ideally, clicking through to
the source.

## Product Purpose

A showcase website for **Filament Demo Lab** — four mobile-native 3D rendering demos
built with React Native + Google Filament. The demos are the product; the site is the
vehicle that presents them. It documents what each demo demonstrates, how the native
render path works (GLB → Metro → react-native-filament → Filament/Metal → GPU), and how
prior 3D knowledge transfers to Filament — using screenshots, video, and write-ups, since
Filament renders natively on the device GPU and cannot run in a browser.

Success: a visitor leaves understanding what each of the four demos shows, convinced the
stack genuinely runs, and one click from the source.

## Brand Personality

**Precise · cinematic · confident.** Engineering-grade exactness meeting a showroom for
the renders. The voice is that of someone who knows graphics: specific, accurate, and
unhurried, with the polish to present 3D work like a gallery rather than a spec sheet.
The dark, GPU-literate dev-tool surface carries the precision; lighting, depth, and the
models-as-hero carry the cinema.

Emotional goal: *"this person knows what they're doing, and the work is real."* Trust
first, delight close behind.

## Anti-references

- **Generic SaaS landing page.** No gradient-blob hero, no identical feature-card grid,
  no pricing tiers, no "trusted by" logo wall. The page is a showcase, not a funnel.
- **Plain GitHub README.** No undesigned wall of text and tables. The content is technical,
  but it must be composed — hierarchy, pacing, and the renders doing visual work.
- **Adjacent guards:** never crypto/AI-hype (neon glass, gradients on everything,
  over-animation) and never toy/gamey (cartoonish, bubbly, emoji-as-decoration). Either
  would undercut the engineering credibility the brand depends on.

Note: monospace type reads as "developer costume" on most brands, but here it is earned —
the project is literally a graphics/rendering tool, so code, model ids, and the native
pipeline legitimately speak in mono.

## Design Principles

1. **The demos are the hero.** Every section earns its place by making a render or a
   technique land — not by decorating the page. Show, don't tell.
2. **Earn technical trust.** This is a bleeding-edge stack; claims must be accurate,
   specific, and verifiable (versions, licenses, the native path). Precision is the brand —
   a single hand-wavy or wrong detail costs more credibility than any visual flourish buys.
3. **Mobile-native honesty.** Never imply the renders run in the browser. The site
   *documents* a native-GPU runtime; the distinction between showcase and runtime stays
   crisp in copy and framing.
4. **Cinematic restraint.** Present the renders like a showroom — depth, lighting, the
   model centered and unobstructed — but let the work carry it. Nothing decorative should
   compete with the 3D.
5. **Respect the reader's literacy.** The audience is technical; lead with substance, skip
   marketing fluff, and keep the source one click away.

## Accessibility & Inclusion

- **WCAG 2.1 AA** across the board: body text ≥ 4.5:1, large/bold text ≥ 3:1. The site is
  dark-only (`color-scheme: dark`), so verify every text color against the near-black base
  and the elevated surfaces — muted grays on dark are the easiest place to fall below AA.
- **Honor `prefers-reduced-motion: reduce`** for all motion: the auto-playing spin video,
  card hovers, lightbox transitions, and any future scroll/entrance choreography. Provide a
  crossfade or instant alternative — never gate content visibility on a motion that a
  reduced-motion user won't see.
- **Keyboard + screen reader:** interactive elements (the screenshot lightbox, links,
  controls) stay keyboard-operable with visible focus and correct dialog semantics.
