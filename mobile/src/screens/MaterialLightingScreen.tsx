import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  FilamentScene,
  FilamentView,
  Float3,
  Light,
  ModelRenderer,
  useModel,
} from 'react-native-filament';
import { MODELS } from '../assets';
import { DemoScaffold } from '../components/DemoScaffold';
import { StableEnvironmentalLight } from '../components/lighting';
import { useOrbitControls } from '../components/useOrbitControls';
import { InfoChip, SegmentedControl, SegmentOption } from '../components/ui';
import { Demo } from '../data/demos';
import { colors, spacing, typography } from '../theme';

type Props = { demo: Demo; onBack: () => void };

type PresetId = 'studio' | 'sunset' | 'night' | 'showroom';

type LightingPreset = {
  label: string;
  /** Directional (key) light illuminance in lux. */
  dir: number;
  /** Key light colour temperature in Kelvin. */
  kelvin: number;
  direction: Float3;
};

// The image-based environment stays at a fixed ambient intensity. Its KTX
// buffer is released by <EnvironmentalLight> after the first frame, so changing
// its intensity at runtime would double-release the buffer and crash. The visual
// variety across presets therefore comes from the directional key light.
// Deliberately low so the directional key light — the thing that actually
// changes between presets — drives the look instead of being washed out by a
// bright, unchanging ambient.
const IBL_AMBIENT = 6500;

const PRESETS: Record<PresetId, LightingPreset> = {
  studio: { label: 'Studio', dir: 18000, kelvin: 6500, direction: [0.35, -0.6, -0.7] },
  sunset: { label: 'Sunset', dir: 30000, kelvin: 2300, direction: [-0.92, -0.18, -0.35] },
  night: { label: 'Night', dir: 3500, kelvin: 11500, direction: [0.25, -0.8, 0.35] },
  showroom: { label: 'Showroom', dir: 46000, kelvin: 5600, direction: [0, -0.85, -0.55] },
};

const PRESET_OPTIONS: SegmentOption<PresetId>[] = (
  Object.keys(PRESETS) as PresetId[]
).map(id => ({ value: id, label: PRESETS[id].label }));

export function MaterialLightingScreen({ demo, onBack }: Props) {
  return (
    <FilamentScene>
      <LightingStage demo={demo} onBack={onBack} />
    </FilamentScene>
  );
}

function LightingStage({ demo, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const [presetId, setPresetId] = useState<PresetId>('studio');
  const preset = PRESETS[presetId];

  const meta = MODELS.flightHelmet;
  const model = useModel(meta.source);
  const loading = model.state !== 'loaded';
  const { cameraManipulator, gesture, onLayout } = useOrbitControls({
    orbitHomePosition: [0, 0.15, 6],
    targetPosition: [0, 0.15, 0],
  });

  return (
    <View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <View
          style={StyleSheet.absoluteFill}
          collapsable={false}
          onLayout={onLayout}>
          <FilamentView style={StyleSheet.absoluteFill}>
            <StableEnvironmentalLight intensity={IBL_AMBIENT} />
            {/* react-native-filament's <Light> applies its props on mount and
                does not re-apply them in place, so swapping a preset left the
                scene unlit-by-the-key-light. Key on the preset to remount the
                light with the new intensity / temperature / direction. */}
            <Light
              key={presetId}
              type="directional"
              intensity={preset.dir}
              colorKelvin={preset.kelvin}
              direction={preset.direction}
              castShadows
            />
            <ModelRenderer model={model} transformToUnitCube />
            <Camera
              cameraManipulator={cameraManipulator}
              focalLengthInMillimeters={45}
            />
          </FilamentView>
        </View>
      </GestureDetector>

      <DemoScaffold
        demo={demo}
        insets={insets}
        onBack={onBack}
        loading={loading}
        loadingLabel={`Loading ${meta.label}…`}>
        <SegmentedControl
          options={PRESET_OPTIONS}
          value={presetId}
          onChange={setPresetId}
        />
        <View style={styles.chips}>
          <InfoChip label="Key light" value={`${Math.round(preset.dir / 1000)}k lux`} />
          <InfoChip label="Temp" value={`${preset.kelvin}K`} />
          <InfoChip label="IBL" value="6.5k ambient" />
        </View>
        <Text style={styles.note}>
          <Text style={styles.noteAccent}>Runtime in Filament:</Text> directional
          intensity, colour temperature, light direction, shadows, plus a fixed
          image-based ambient.{'  '}
          <Text style={styles.noteAccent}>Baked into the GLB:</Text> albedo,
          normal, and occlusion-roughness-metalness textures per material.
        </Text>
      </DemoScaffold>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.base },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  note: { ...typography.body, color: colors.textSecondary, lineHeight: 20 },
  noteAccent: { color: colors.textPrimary, fontWeight: '600' },
});
