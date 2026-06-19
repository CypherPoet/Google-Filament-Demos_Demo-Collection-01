import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  FilamentScene,
  FilamentView,
  useModel,
} from 'react-native-filament';
import { MODELS } from '../assets';
import { AutoRotatingModel } from '../components/AutoRotatingModel';
import { StudioLight } from '../components/lighting';
import { DemoScaffold } from '../components/DemoScaffold';
import { useOrbitControls } from '../components/useOrbitControls';
import { InfoChip } from '../components/ui';
import { Demo } from '../data/demos';
import { colors, spacing, typography } from '../theme';

type Props = { demo: Demo; onBack: () => void };

export function BasicViewerScreen({ demo, onBack }: Props) {
  return (
    <FilamentScene>
      <BasicStage demo={demo} onBack={onBack} />
    </FilamentScene>
  );
}

function BasicStage({ demo, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const meta = MODELS.boomBox;
  const model = useModel(meta.source);
  const loading = model.state !== 'loaded';

  // The scene idles with a gentle auto-spin, but pauses it while the user is
  // actively orbiting or zooming so their input isn't fighting the rotation;
  // it resumes a moment after they let go.
  const [interacting, setInteracting] = useState(false);
  const { cameraManipulator, gesture, onLayout } = useOrbitControls({
    orbitHomePosition: [0, 0.3, 8.5],
    onInteractingChange: setInteracting,
  });

  return (
    <View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <View
          style={StyleSheet.absoluteFill}
          collapsable={false}
          onLayout={onLayout}>
          <FilamentView style={StyleSheet.absoluteFill}>
            <StudioLight />
            <AutoRotatingModel
              model={model}
              speed={0.4}
              enabled={!interacting}
            />
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
        <View style={styles.chips}>
          <InfoChip label="Model" value={meta.label} />
          <InfoChip label="Size" value={meta.size} />
          <InfoChip label="License" value={meta.license} />
        </View>
        <Text style={styles.note}>
          One GLB, the engine's bundled image-based environment, and a single
          shadow-casting directional light. The model is normalised to a unit
          cube so any asset frames the same way.
        </Text>
        <Text style={styles.hint}>Drag to orbit · pinch to zoom</Text>
      </DemoScaffold>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.base },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  note: { ...typography.body, color: colors.textSecondary, lineHeight: 20 },
  hint: { ...typography.body, color: colors.textDim },
});
