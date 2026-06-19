/**
 * Metadata for the four demo screens, surfaced on the home menu and as the
 * header of each demo. Kept declarative so the showcase website can mirror the
 * same copy.
 */
export type DemoId = 'basic' | 'product' | 'material' | 'pipeline';

export type Demo = {
  id: DemoId;
  index: number;
  title: string;
  tagline: string;
  /** One-liner describing what the screen demonstrates technically. */
  demonstrates: string;
  accentGlyph: string;
};

export const DEMOS: Demo[] = [
  {
    id: 'basic',
    index: 1,
    title: 'Basic GLB Viewer',
    tagline: 'A single model, default lighting, gentle auto-spin.',
    demonstrates: 'FilamentView · Model · Camera · image-based lighting',
    accentGlyph: '◆',
  },
  {
    id: 'product',
    index: 2,
    title: 'Interactive Product Viewer',
    tagline: 'Drag to orbit, pinch to zoom, switch models, reset view.',
    demonstrates: 'useCameraManipulator · gesture-handler · model swapping',
    accentGlyph: '✦',
  },
  {
    id: 'material',
    index: 3,
    title: 'Material & Lighting',
    tagline: 'Same PBR asset under four runtime lighting rigs.',
    demonstrates: 'EnvironmentalLight · directional Light · runtime vs baked',
    accentGlyph: '❉',
  },
  {
    id: 'pipeline',
    index: 4,
    title: 'Asset Pipeline & Animation',
    tagline: 'glTF → GLB conversion notes and skeletal animation playback.',
    demonstrates: 'Animator · glTF-Transform pipeline · clip switching',
    accentGlyph: '⟳',
  },
];
