# 🤝 Handoff: Filament Demo Lab — polish pass on the four demos

> 🎯 **Next Action**: Bring up the iOS Simulator dev loop (Metro is already running on `localhost:8081`; relaunch the app with the terminate → recompile-bundle → launch cycle in "Dev loop" below), then start polishing **Demo 1** in [`mobile/src/screens/BasicViewerScreen.tsx`](../../mobile/src/screens/BasicViewerScreen.tsx) — camera framing, lighting warmth, and adding a ground/shadow receiver.

## 🧾 Session Metadata
- Created: 2026-06-19T09:12:21Z
- Branch: main
- Repo: git@github.com:CypherPoet/Google-Filament-Demos_Demo-Collection-01.git (private)
- Live site: https://filament-demo-lab.netlify.app

### Recent Commits (for context)
  - d1da6fd 🐛 Fix FilamentAsset double-release when switching models in Demo 2
  - 9684f65 🙈 Ignore Netlify CLI local link state
  - d0f47e2 📝 Add live Netlify URL to README
  - 3750414 🎉 Initial commit — Filament Demo Lab

## 🔗 Handoff Chain

- **Continues from**: None (fresh start)
- **Supersedes**: None

## 📚 Source Artifacts

The canonical record for this work. Link by path/URL; do not restate their content here.

- **PRD / spec**: `docs/private/goal-descriptions/goal-01-demo-descriptions.md` (local only — gitignored; the original brief: RN Filament app + Netlify showcase, 4 demo screens, asset/licensing rules)
- **Project README** (the real source of truth for setup, demos, licensing, and the hard-won gotchas): [`README.md`](../../README.md)
- **Mobile README** (run instructions + file map): [`mobile/README.md`](../../mobile/README.md)
- **Asset licensing**: [`assets/model-notes.md`](../../assets/model-notes.md)
- **Session plan**: none
- **ADRs / design docs**: none
- **Issues / tickets**: none
- **Source PR**: none (committed directly to `main` on a brand-new repo)

## 📍 Current State Summary

The project is **complete and shipped**: a React Native + `react-native-filament` app with four demos (basic viewer, interactive product viewer, material/lighting, asset pipeline + animation) plus an Astro showcase site deployed live to Netlify. All four demos were verified **rendering and interacting** on the iOS Simulator (iPhone 17 Pro, iOS 26.5) — model switching, orbit/pinch, reset, lighting presets, and animation clip switching all work. The repo is pushed, the tree is clean, and the site serves correctly. The next session is a pure **polish pass** — nothing is broken; the goal is to make each demo look and feel more refined.

## 💡 Important Context

This is a **bleeding-edge stack** (RN 0.83.1 + New Architecture + Xcode 26 + react-native-filament 1.11) and it took five real fixes to build and run cleanly. All are documented in [`README.md`](../../README.md) under **🛠️ Notes & gotchas** — read that section before touching native code. The load-bearing ones for a polish pass:

- **Filament double-release pattern.** Any library component that *manually releases* a native handle inside a worklet effect double-fires on this stack and crashes (`"...has already been manually released!"`). This already bit `<EnvironmentalLight>` (KTX buffer) and `useModel` (FilamentAsset on in-place source swap). Avoid the library's `<DefaultLight>`/`<EnvironmentalLight>` — use the crash-safe [`mobile/src/components/lighting.tsx`](../../mobile/src/components/lighting.tsx) instead, and swap models by **remounting** (key change), never by changing `source` in place.
- **Animated transforms.** A shared-value `rotate` is *multiplied* onto the current transform each change — feeding an accumulating absolute angle blows the matrix up. Auto-rotation applies a per-frame **delta** directly to the root entity ([`AutoRotatingModel.tsx`](../../mobile/src/components/AutoRotatingModel.tsx)).
- **No Reanimated.** Intentionally omitted to shrink native build surface. Gestures run on the JS thread (`.runOnJS(true)`). Don't add Reanimated for polish unless truly needed — it changes the babel/worklets setup.
- **Stack is pinned** to `react-native-filament`'s own example versions (the maintainer-tested combo). Don't bump RN/filament casually.

### Dev loop (how to iterate and see changes)

Metro is running (background, `localhost:8081`). The app loads JS from Metro, so **JS edits require a relaunch** (the app re-fetches the bundle on launch). Host `sleep` is **blocked** in the Bash tool — wait via a `simctl io screenshot` loop or the computer-use `wait` action.

```bash
UDID=74179320-7692-439F-890D-D396B81FC36F; BID=org.reactjs.native.example.FilamentDemoLab
xcrun simctl terminate "$UDID" "$BID" 2>/dev/null
curl -s -o /dev/null "http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false"
xcrun simctl launch "$UDID" "$BID"
# then a screenshot-loop to wait for render, then: xcrun simctl io "$UDID" screenshot /tmp/x.png
```

- **To launch straight into a demo:** temporarily set the initial route in [`mobile/App.tsx`](../../mobile/App.tsx) (`useState<Route>('basic'|'product'|'material'|'pipeline')`) — **revert to `'home'` before committing.**
- **For clean screenshots:** temporarily add `LogBox.ignoreAllLogs()` to `App.tsx` to hide the dev warning toast — **remove it afterward** (it's intentionally not in the committed code).
- **To test taps/gestures:** `simctl` has no tap command. Use **computer-use** (`request_access` for "Simulator", then `left_click`/`left_click_drag` against the screenshot). The Simulator was at full tier this session.

## 🚧 Pending Work

### Immediate Next Steps (polish ideas, demo by demo)

1. **Demo 1 — Basic Viewer**: tune camera framing (currently `[0,0.12,4]`, 32mm); add a subtle ground plane so `castShadow` actually has a receiver (shadows currently render nowhere); consider a `<Skybox>` or gradient backdrop; refine spin speed.
2. **Demo 2 — Product Viewer**: camera resets on model switch (because switching remounts the stage) — consider preserving orbit state across switches; per-model framing (BoomBox/ToyCar/WaterBottle have different ideal distances); clamp zoom range; add a loading shimmer.
3. **Demo 3 — Material & Lighting**: IBL intensity is fixed to dodge the old crash — `StableEnvironmentalLight` is now crash-safe, so runtime IBL intensity variation could be restored; add a skybox toggle to *show* the environment; add an auto-rotate toggle; explore `KHR_materials_variants` if a model supports it.
4. **Demo 4 — Pipeline & Animation**: add play/pause + animation speed; show clip duration/name; consider a live size comparison (plain GLB vs Draco) using the kept `/tmp/flighthelmet/FlightHelmet-draco.glb` artifact.
5. **Cross-cutting**: real shadows (need a receiver plane in each scene); consistent camera framing across demos; tap haptics; screen-transition animation; accessibility labels on the segmented controls/buttons; a real app icon (currently default RN icon); re-capture media + re-deploy if visuals change materially.

### Blockers / Open Questions

- [ ] Repo is **private** — the site's "View source" link 404s for visitors. User was asked whether to make it public; **awaiting their decision**. Also offered Netlify dashboard continuous-deploy (currently CLI deploy only).

### Deferred Items

- Make the GitHub repo public (pending user decision, above).
- Wire continuous deploys by linking the repo in the Netlify dashboard (`netlify.toml` already configured).
- Site's Demo 2 screenshot uses BoomBox; the Toy Car render is more distinctive — swapping it would need a media re-capture + re-deploy.

## ⚠️ Constraints for Resuming Agent

### Potential Gotchas

- **Do NOT** feed an accumulating absolute angle to a shared-value `rotate` (compounds → Filament assert `!`). Per-frame delta or direct `setEntityRotation`.
- **Do NOT** switch `useModel`'s `source` in place (double-release). Remount via `key`.
- **Do NOT** manually release Filament buffers/assets in worklet effects on this stack; **do NOT** reintroduce the library's `<DefaultLight>`/`<EnvironmentalLight>`.
- **Do NOT** leave `App.tsx` route on a demo or `LogBox.ignoreAllLogs()` in the code when committing.
- **Do NOT** remove the `ios/Podfile` `post_install` fmt patch — `pod install` re-applies it every run; without it the native build fails under Xcode 26.
- Host `sleep` is blocked; Metro caches (use `npm start -- --reset-cache` or touch-file + re-curl if a JS change doesn't appear).
- `.claude/` is gitignored **except** `.claude/handoffs/` — don't commit session settings/launch.json.

### 🧰 Skills to Use

- `impeccable` — **when:** polishing the React Native overlay UI (visual hierarchy, spacing, motion, micro-interactions, empty/loading states). **why:** the overlays are the user-facing chrome and the main lever for "more polish."
- `run` — **when:** you need to launch/screenshot the app to see a change land. **why:** it knows this project's launch patterns; pairs with the Dev loop above.
- `better-icons` — **when:** adding a proper app icon or control glyphs. **why:** the app ships the default RN icon and uses unicode glyphs that could be upgraded.

## 🧠 Codebase Understanding

### Architecture Overview

Monorepo: `mobile/` (RN + Filament app) and `site/` (Astro showcase) — see [`README.md`](../../README.md) for the full picture. Filament's API is **declarative** (`<FilamentScene>/<FilamentView>/<Model>/<Camera>/<Light>`); per-frame work runs as **worklets** on Filament's render thread via `react-native-worklets-core`; React Native overlays sit **on top of** `FilamentView` (absolute layout), never inside it. A tiny `useState` router in `App.tsx` swaps screens (no navigation library).

### Critical Files

| File | Purpose | Relevance |
|------|---------|-----------|
| [`mobile/App.tsx`](../../mobile/App.tsx) | State router | Revert `route` to `'home'` before committing; don't leave `LogBox.ignoreAllLogs()` in |
| [`mobile/src/components/lighting.tsx`](../../mobile/src/components/lighting.tsx) | Crash-safe IBL (`StudioLight`/`StableEnvironmentalLight`) | Use these, not the library's light components; never manually-release the buffer |
| [`mobile/src/components/AutoRotatingModel.tsx`](../../mobile/src/components/AutoRotatingModel.tsx) | Per-frame delta rotation | Don't switch to an accumulating absolute angle |
| [`mobile/src/components/useOrbitControls.ts`](../../mobile/src/components/useOrbitControls.ts) | gesture-handler ↔ camera manipulator (JS thread) | Orbit/pinch tuning lives here (`orbitSpeed`, pinch sensitivity) |
| [`mobile/src/screens/*.tsx`](../../mobile/src/screens) | The four demos | Primary polish surface |
| [`mobile/src/theme.ts`](../../mobile/src/theme.ts) + [`components/ui.tsx`](../../mobile/src/components/ui.tsx) | Design tokens + UI kit | Where overlay visual polish should be centralized |
| [`mobile/ios/Podfile`](../../mobile/ios/Podfile) | `post_install` fmt patch | Keep it — required for Xcode 26 builds |
| [`mobile/metro.config.js`](../../mobile/metro.config.js) | `assetExts` for `glb`/`ktx` | Add extensions here if bundling new asset types |

### Key Patterns Discovered

- Load models with `useModel(require('....glb'))` → render via `<ModelRenderer model={...}>`; one `<FilamentScene>` per screen.
- **Key-on-change** for a clean remount whenever an in-place native swap would double-release (model id, reset nonce).
- Camera framing uses `transformToUnitCube` + a camera distance ~3–4 units; orbit demos use `useCameraManipulator` (orbit mode only).

## 🏁 Work Completed

### Tasks Finished

- [x] Four working demos (basic / product / material+lighting / pipeline+animation), verified rendering AND interacting on the iOS Simulator.
- [x] Astro showcase site built and **deployed live** (https://filament-demo-lab.netlify.app).
- [x] 5 CC0 models sourced + documented; Flight Helmet converted glTF→GLB; media captured (screenshots + screen recording) into `assets/showcase/` and `site/public/media/`.
- [x] Repo created + pushed to private `Google-Filament-Demos_Demo-Collection-01`.
- [x] Five build/runtime fixes landed (see commits + README gotchas).

### Files Modified

See `git log` (commits above). Whole project is new this session.

### Decisions Made

- **Lean native stack (no Reanimated)** — fewer bleeding-edge native modules → higher chance of a clean Xcode 26 build; gesture callbacks run on JS thread.
- **Pin to the library's example versions** — maintainer-tested combo, de-risks the native build.
- **Remount-on-change over in-place swaps** — sidesteps the library's worklet-effect double-release on this stack.
- **CC0-only assets** (excluded Damaged Helmet for its CC BY-NC component) — clean licensing for a portfolio/public artifact.

## 🌐 Environment State

### Tools/Services Used

- Xcode 26.5 + iOS 26.5 Simulator (iPhone 17 Pro, UDID `74179320-7692-439F-890D-D396B81FC36F`)
- CocoaPods 1.16.2 (system ruby 2.6.10; Homebrew ruby 4.0.5 available as fallback), Node 24, ffmpeg 8.1.1
- `gh` authed as CypherPoet; Netlify CLI authed as `cypherpoet@tutanota.com`, team slug `cypherpoet`

### Active Processes

- **Metro bundler** running in the background on `localhost:8081` (started with `--reset-cache`).
- iOS Simulator booted with the app installed (bundle id `org.reactjs.native.example.FilamentDemoLab`).

### Environment Variables

- None required. Netlify auth lives in the CLI's own config (not in the repo); there is no `.env`.

---

**Security Reminder**: Validate before finalizing.
