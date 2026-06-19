export const site = {
  name: 'Filament Demo Lab',
  tagline:
    'A mobile-native 3D rendering exploration built with React Native Filament — GLB assets, PBR materials, cameras, lighting, gestures, and animation drawn by Google Filament over Metal.',
  repo: 'https://github.com/CypherPoet/Google-Filament-Demos_Demo-Collection-01',
  filamentUrl: 'https://github.com/google/filament',
  rnFilamentUrl: 'https://github.com/margelo/react-native-filament',
  stack: [
    'React Native 0.86',
    'react-native-filament 1.11',
    'TypeScript',
    'Google Filament (Metal)',
    'iOS Simulator',
  ],
};

export type DemoCard = {
  num: string;
  id: string;
  title: string;
  tagline: string;
  image: string;
  /** Optional screen recording; the lightbox plays this and uses `image` as its poster. */
  video?: string;
  demonstrates: string[];
  model: string;
};

export const demos: DemoCard[] = [
  {
    num: '01',
    id: 'basic',
    title: 'Basic GLB Viewer',
    tagline:
      'The simplest clean scene: one model, the engine’s default image-based lighting, and a gentle auto-spin.',
    image: '/media/demo-basic.png',
    video: '/media/spin.mp4',
    demonstrates: [
      'FilamentScene / FilamentView setup',
      'Loading a .glb with <Model>',
      'Default IBL + a shadow-casting directional light',
      'A per-frame render callback for rotation',
    ],
    model: 'BoomBox · CC0',
  },
  {
    num: '02',
    id: 'product',
    title: 'Interactive Product Viewer',
    tagline:
      'A portfolio-style viewer: drag to orbit, pinch to zoom, switch between three products, and reset the view.',
    image: '/media/demo-product.png',
    video: '/media/demo-product.mp4',
    demonstrates: [
      'useCameraManipulator (orbit camera)',
      'react-native-gesture-handler pan + pinch',
      'Runtime model swapping',
      'React Native overlay controls above the canvas',
    ],
    model: 'BoomBox · Toy Car · Water Bottle · CC0',
  },
  {
    num: '03',
    id: 'material',
    title: 'Material & Lighting',
    tagline:
      'One high-fidelity PBR asset under four runtime lighting rigs — making clear what Filament controls live versus what is baked into the GLB.',
    image: '/media/demo-material.png',
    video: '/media/demo-material.mp4',
    demonstrates: [
      'EnvironmentalLight (IBL) intensity control',
      'Directional light intensity, colour temperature, direction',
      'Lighting presets: Studio / Sunset / Night / Showroom',
      'Runtime lighting vs baked PBR texture maps',
    ],
    model: 'Flight Helmet · CC0',
  },
  {
    num: '04',
    id: 'pipeline',
    title: 'Asset Pipeline & Animation',
    tagline:
      'Skeletal animation playback plus the real glTF → GLB pipeline used to prepare every asset in the app.',
    image: '/media/demo-pipeline.png',
    video: '/media/demo-pipeline.mp4',
    demonstrates: [
      '<Animator> skeletal clip playback with cross-fade',
      'Switching animation clips at runtime',
      'multi-file glTF → single GLB conversion (gltf-pipeline)',
      'Draco trade-offs on texture-heavy assets',
    ],
    model: 'Fox (animated) · CC0 + CC BY 4.0',
  },
];

export type ModelRow = {
  name: string;
  source: string;
  author: string;
  license: string;
  attribution: string;
  size: string;
  usedIn: string;
};

export const models: ModelRow[] = [
  {
    name: 'BoomBox',
    source: 'Khronos glTF Sample Assets',
    author: 'Microsoft',
    license: 'CC0 1.0',
    attribution: 'Not required',
    size: '10.6 MB',
    usedIn: 'Demos 1 & 2',
  },
  {
    name: 'Toy Car',
    source: 'Khronos glTF Sample Assets',
    author: 'G. Odendahl & E. Chadwick',
    license: 'CC0 1.0',
    attribution: 'Not required',
    size: '5.4 MB',
    usedIn: 'Demo 2',
  },
  {
    name: 'Water Bottle',
    source: 'Khronos glTF Sample Assets',
    author: 'Microsoft',
    license: 'CC0 1.0',
    attribution: 'Not required',
    size: '9.0 MB',
    usedIn: 'Demo 2',
  },
  {
    name: 'Flight Helmet',
    source: 'Khronos glTF Sample Assets',
    author: 'Microsoft / Gary Hsu',
    license: 'CC0 1.0',
    attribution: 'Not required',
    size: '48 MB (converted to GLB)',
    usedIn: 'Demo 3',
  },
  {
    name: 'Fox',
    source: 'Khronos glTF Sample Assets',
    author: 'PixelMannen, tomkranis, @AsoboStudio, @scurest',
    license: 'CC0 1.0 + CC BY 4.0',
    attribution: 'Required (rig & conversion are CC BY 4.0)',
    size: '160 KB',
    usedIn: 'Demo 4',
  },
];

export type TransferRow = { concept: string; prior: string; filament: string };

export const transferNotes: TransferRow[] = [
  {
    concept: 'Scene graph',
    prior: 'THREE.Scene with a tree of Object3D nodes',
    filament: 'A Filament Scene of entities; <Model> adds a glTF asset’s entity tree',
  },
  {
    concept: 'Camera',
    prior: 'PerspectiveCamera(fov, aspect, near, far)',
    filament: '<Camera> with focal length (mm) + near/far; aspect from the view',
  },
  {
    concept: 'Orbit controls',
    prior: 'OrbitControls(camera, domElement)',
    filament: 'useCameraManipulator wired to gesture-handler pan/pinch',
  },
  {
    concept: 'Lights',
    prior: 'DirectionalLight, PointLight, SpotLight',
    filament: '<Light type="directional | point | spot"> with lux / lumen intensity',
  },
  {
    concept: 'Environment / IBL',
    prior: 'PMREMGenerator + scene.environment from an HDR',
    filament: '<EnvironmentalLight source={.ktx}> — HDR is pre-baked to KTX',
  },
  {
    concept: 'PBR materials',
    prior: 'MeshStandardMaterial (metalness / roughness)',
    filament: 'Same metal-rough model, authored in the GLB; lit identically',
  },
  {
    concept: 'glTF loading',
    prior: 'GLTFLoader().load(url)',
    filament: '<Model source={require(".glb")}> via Metro asset bundling',
  },
  {
    concept: 'Animation',
    prior: 'AnimationMixer + AnimationClip actions',
    filament: '<Animator animationIndex> with transitionDuration cross-fade',
  },
  {
    concept: 'Render loop',
    prior: 'requestAnimationFrame(animate)',
    filament: 'Filament Choreographer; useRenderCallback registers per-frame worklets',
  },
  {
    concept: 'Tone mapping / output',
    prior: 'WebGLRenderer tone mapping + sRGB output',
    filament: 'Filament View handles tone mapping + colour management natively',
  },
];
