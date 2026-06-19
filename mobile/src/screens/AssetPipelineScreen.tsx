import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AnimationItem,
  Animator,
  Camera,
  FilamentScene,
  FilamentView,
  ModelRenderer,
  useModel,
} from 'react-native-filament';
import { MODELS } from '../assets';
import { DemoScaffold } from '../components/DemoScaffold';
import { StudioLight } from '../components/lighting';
import { useOrbitControls } from '../components/useOrbitControls';
import { InfoChip, SegmentedControl, SegmentOption } from '../components/ui';
import { Demo } from '../data/demos';
import { colors, spacing, typography } from '../theme';

type Props = { demo: Demo; onBack: () => void };

const FALLBACK_CLIPS: SegmentOption<string>[] = [
  { value: '0', label: 'Clip 1' },
  { value: '1', label: 'Clip 2' },
  { value: '2', label: 'Clip 3' },
];

const titleCase = (name: string) =>
  name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : name;

export function AssetPipelineScreen({ demo, onBack }: Props) {
  return (
    <FilamentScene>
      <PipelineStage demo={demo} onBack={onBack} />
    </FilamentScene>
  );
}

function PipelineStage({ demo, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const [clipIndex, setClipIndex] = useState(0);
  const [clips, setClips] = useState<AnimationItem[]>([]);

  const meta = MODELS.fox;
  const model = useModel(meta.source);
  const loading = model.state !== 'loaded';
  const { cameraManipulator, gesture, onLayout } = useOrbitControls({
    orbitHomePosition: [0, 0.1, 3.4],
  });

  const clipOptions: SegmentOption<string>[] = clips.length
    ? clips.map(clip => ({
        value: String(clip.index),
        label: titleCase(clip.name) || `Clip ${clip.index + 1}`,
      }))
    : FALLBACK_CLIPS;

  return (
    <View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <View
          style={StyleSheet.absoluteFill}
          collapsable={false}
          onLayout={onLayout}>
          <FilamentView style={StyleSheet.absoluteFill}>
            <StudioLight keyIntensity={14000} />
            <ModelRenderer model={model} transformToUnitCube>
              <Animator
                animationIndex={clipIndex}
                transitionDuration={0.25}
                onAnimationsLoaded={setClips}
              />
            </ModelRenderer>
            <Camera
              cameraManipulator={cameraManipulator}
              focalLengthInMillimeters={32}
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
          options={clipOptions}
          value={String(clipIndex)}
          onChange={value => setClipIndex(Number(value))}
        />
        <View style={styles.chips}>
          <InfoChip label="Source" value="multi-file glTF" />
          <InfoChip label="Tool" value="gltf-pipeline" />
          <InfoChip label="Ships as" value="single .glb" />
        </View>
        <Text style={styles.note}>
          Every model is bundled as a self-contained GLB. The Flight Helmet, for
          example, was packed from a 17-file glTF (.gltf + .bin + 15 textures)
          into one 48&nbsp;MB GLB; Draco trimmed only ~4% because it is
          texture-dominated. Skeletal clips like the Fox's play through the{' '}
          <Text style={styles.noteAccent}>Animator</Text> with cross-fading.
        </Text>
      </DemoScaffold>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.base },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  note: { ...typography.body, color: colors.textSecondary, lineHeight: 20 },
  noteAccent: { color: colors.accent, fontWeight: '600' },
});
