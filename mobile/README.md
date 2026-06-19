# Filament Demo Lab — Mobile App

A React Native + [`react-native-filament`](https://github.com/margelo/react-native-filament) app with four 3D rendering demos. See the [root README](../README.md) for the full project overview, tech stack, asset licensing, and notes.

## Run on the iOS Simulator

Requires macOS, Xcode, CocoaPods, and Node ≥ 20.

```bash
npm install
cd ios && pod install && cd ..   # patches RN's vendored fmt for Xcode 26 (see Podfile post_install)
npm run ios
```

`npm run ios` starts Metro and builds/launches the app. If the bundle changes don't appear, restart Metro with `npm start -- --reset-cache`.

## Layout

```
App.tsx                     # State router: home menu → 4 demo screens
src/
  screens/
    HomeScreen.tsx          # Demo menu
    BasicViewerScreen.tsx   # Demo 1 — basic GLB viewer (auto-spin)
    ProductViewerScreen.tsx # Demo 2 — orbit/zoom, model switching, reset
    MaterialLightingScreen.tsx # Demo 3 — runtime lighting presets
    AssetPipelineScreen.tsx # Demo 4 — animation clips + pipeline notes
  components/
    lighting.tsx            # StudioLight / StableEnvironmentalLight (crash-safe IBL)
    useOrbitControls.ts     # gesture-handler ↔ Filament camera manipulator
    AutoRotatingModel.tsx   # per-frame Y rotation via render callback
    DemoScaffold.tsx, ui.tsx# React Native overlay chrome (sits ON TOP of FilamentView)
  assets.ts                 # require()'d .glb registry
  data/demos.ts             # Demo metadata
assets/models/*.glb         # Bundled CC0 / clearly-licensed models
```

## How the rendering is wired

- Each demo wraps its scene in `<FilamentScene>` (one engine/camera/view) and renders a full‑screen `<FilamentView>`.
- Models load via `useModel(require('....glb'))`; `glb`/`ktx` are registered as Metro `assetExts` in `metro.config.js`.
- Lighting uses image‑based lighting (`StableEnvironmentalLight`, from the engine's bundled `.ktx`) plus a directional key `<Light>`.
- Camera interaction uses `useCameraManipulator` (orbit) driven by `react-native-gesture-handler` pan/pinch on the JS thread.
- Per‑frame work (auto‑rotation, camera updates) runs as **worklets** on Filament's render thread via `react-native-worklets-core`.
- React Native UI is positioned **above** `FilamentView` with absolute layout — never as its children.
