import React from 'react';
import {
  FilamentModel,
  ModelRenderer,
  RenderCallbackContext,
  useFilamentContext,
} from 'react-native-filament';

/**
 * Renders an already-loaded model (from `useModel`) and slowly spins it about
 * its Y axis. Must live INSIDE a <FilamentView> — it registers a per-frame
 * render callback.
 *
 * Rotation is applied by multiplying a small per-frame delta directly onto the
 * model's root entity on the render thread. (Driving the <Model rotate> prop
 * with a shared value instead went through a transform listener that threw on
 * this stack.) `transformToUnitCube` sets the base fit once; the deltas compound
 * on top of it.
 */
export function AutoRotatingModel({
  model,
  speed = 0.45,
  enabled = true,
  castShadow = true,
}: {
  model: FilamentModel;
  /** Radians per second. */
  speed?: number;
  enabled?: boolean;
  castShadow?: boolean;
}) {
  const { transformManager } = useFilamentContext();
  const rootEntity = model.state === 'loaded' ? model.rootEntity : undefined;

  RenderCallbackContext.useRenderCallback(
    frameInfo => {
      'worklet';
      if (!enabled || rootEntity == null) {
        return;
      }
      transformManager.setEntityRotation(
        rootEntity,
        frameInfo.timeSinceLastFrame * speed,
        [0, 1, 0],
        true, // multiply onto the current transform
      );
    },
    [enabled, speed, rootEntity, transformManager],
  );

  return (
    <ModelRenderer model={model} transformToUnitCube castShadow={castShadow} />
  );
}
