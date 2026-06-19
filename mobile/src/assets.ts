/**
 * Central registry of bundled `.glb` models.
 *
 * Metro bundles these because `glb` is registered in `metro.config.js`
 * `resolver.assetExts`. Each `require(...)` resolves to an asset reference that
 * react-native-filament's <Model source={...}> understands.
 *
 * All models come from the Khronos glTF Sample Assets project. Licenses are
 * documented in /assets/model-notes.md at the repo root.
 */
export type ModelId =
  | 'boomBox'
  | 'toyCar'
  | 'waterBottle'
  | 'avocado'
  | 'flightHelmet'
  | 'fox';

export type ModelMeta = {
  id: ModelId;
  /** require()'d asset, passed straight to <Model source>. */
  source: ReturnType<typeof require>;
  label: string;
  /** Approximate on-disk size of the .glb, shown in the UI. */
  size: string;
  license: string;
};

export const MODELS: Record<ModelId, ModelMeta> = {
  boomBox: {
    id: 'boomBox',
    source: require('../assets/models/BoomBox.glb'),
    label: 'BoomBox',
    size: '10.6 MB',
    license: 'CC0 1.0',
  },
  toyCar: {
    id: 'toyCar',
    source: require('../assets/models/ToyCar.glb'),
    label: 'Toy Car',
    size: '5.4 MB',
    license: 'CC0 1.0',
  },
  waterBottle: {
    id: 'waterBottle',
    source: require('../assets/models/WaterBottle.glb'),
    label: 'Water Bottle',
    size: '9.0 MB',
    license: 'CC0 1.0',
  },
  avocado: {
    id: 'avocado',
    source: require('../assets/models/Avocado.glb'),
    label: 'Avocado',
    size: '8.1 MB',
    license: 'CC0 1.0',
  },
  flightHelmet: {
    id: 'flightHelmet',
    source: require('../assets/models/FlightHelmet.glb'),
    label: 'Flight Helmet',
    size: '48 MB',
    license: 'CC0 1.0',
  },
  fox: {
    id: 'fox',
    source: require('../assets/models/Fox.glb'),
    label: 'Fox',
    size: '160 KB',
    license: 'CC0 + CC BY 4.0',
  },
};
