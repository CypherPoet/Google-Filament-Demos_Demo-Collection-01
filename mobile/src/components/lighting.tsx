import React from 'react';
import {
  Float3,
  Light,
  useBuffer,
  useFilamentContext,
  useWorkletEffect,
} from 'react-native-filament';

/**
 * Image-based lighting from the engine's bundled environment, set up so it does
 * NOT crash under this stack.
 *
 * The built-in <EnvironmentalLight> manually calls `buffer.release()` right
 * after `setIndirectLight`. Under react-native-filament 1.11 + worklets-core on
 * the new architecture, that worklet effect fires more than once and the second
 * run hits an already-freed pointer ("FilamentBuffer has already been manually
 * released!"). Here we never release manually — `useBuffer` frees the buffer on
 * unmount instead — which is safe even if the effect re-runs.
 */
export function StableEnvironmentalLight({
  intensity = 20000,
  source = { uri: 'RNF_default_env_ibl.ktx' },
}: {
  intensity?: number;
  source?: Parameters<typeof useBuffer>[0]['source'];
}) {
  const { engine } = useFilamentContext();
  const buffer = useBuffer({ source, releaseOnUnmount: true });

  useWorkletEffect(() => {
    'worklet';
    if (buffer == null) {
      return;
    }
    // setIndirectLight copies the environment into the engine, so the buffer can
    // safely outlive this call and be released later on unmount.
    engine.setIndirectLight(buffer, intensity, 3);
  });

  return null;
}

/**
 * A sensible default rig: image-based ambient + one shadow-casting directional
 * key light. Drop-in replacement for the library's <DefaultLight> that avoids
 * the buffer double-release crash.
 */
export function StudioLight({
  iblIntensity = 20000,
  keyIntensity = 12000,
  kelvin = 6500,
  direction = [0.3, -0.7, -0.6],
}: {
  iblIntensity?: number;
  keyIntensity?: number;
  kelvin?: number;
  direction?: Float3;
}) {
  return (
    <>
      <StableEnvironmentalLight intensity={iblIntensity} />
      <Light
        type="directional"
        intensity={keyIntensity}
        colorKelvin={kelvin}
        direction={direction}
        castShadows
      />
    </>
  );
}
