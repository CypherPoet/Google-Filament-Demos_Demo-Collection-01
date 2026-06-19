import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  FilamentScene,
  FilamentView,
  ModelRenderer,
  useModel,
} from 'react-native-filament';
import { MODELS, ModelId } from '../assets';
import { DemoScaffold } from '../components/DemoScaffold';
import { StudioLight } from '../components/lighting';
import { useOrbitControls } from '../components/useOrbitControls';
import { ActionButton, SegmentedControl, SegmentOption } from '../components/ui';
import { Demo } from '../data/demos';
import { colors, spacing, typography } from '../theme';

type Props = { demo: Demo; onBack: () => void };

const PRODUCTS: SegmentOption<ModelId>[] = [
  { value: 'boomBox', label: 'BoomBox' },
  { value: 'toyCar', label: 'Toy Car' },
  { value: 'waterBottle', label: 'Bottle' },
];

export function ProductViewerScreen({ demo, onBack }: Props) {
  const [modelId, setModelId] = useState<ModelId>('boomBox');
  const [resetNonce, setResetNonce] = useState(0);

  return (
    <FilamentScene>
      <ProductStage
        // Remounting on reset recreates the camera manipulator at its home
        // position; `modelId` lives here so the selection survives a reset.
        key={resetNonce}
        demo={demo}
        onBack={onBack}
        modelId={modelId}
        onSelectModel={setModelId}
        onReset={() => setResetNonce(n => n + 1)}
      />
    </FilamentScene>
  );
}

function ProductStage({
  demo,
  onBack,
  modelId,
  onSelectModel,
  onReset,
}: Props & {
  modelId: ModelId;
  onSelectModel: (id: ModelId) => void;
  onReset: () => void;
}) {
  const insets = useSafeAreaInsets();
  const meta = MODELS[modelId];
  const model = useModel(meta.source);
  const loading = model.state !== 'loaded';
  const { cameraManipulator, gesture, onLayout } = useOrbitControls({
    orbitHomePosition: [0, 0.3, 3.6],
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
            <ModelRenderer model={model} transformToUnitCube />
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
          options={PRODUCTS}
          value={modelId}
          onChange={onSelectModel}
        />
        <View style={styles.controlRow}>
          <Text style={styles.hint}>Drag to orbit · pinch to zoom</Text>
          <ActionButton glyph="⟲" label="Reset" tone="accent" onPress={onReset} />
        </View>
      </DemoScaffold>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.base },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  hint: { ...typography.body, color: colors.textDim, flexShrink: 1 },
});
