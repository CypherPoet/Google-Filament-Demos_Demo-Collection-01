import { useMemo, useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { Float3, useCameraManipulator } from 'react-native-filament';

type Options = {
  orbitHomePosition?: Float3;
  targetPosition?: Float3;
  /**
   * Fired when the user starts (true) and stops (false) actively touching the
   * view. Lets a screen pause an idle animation — e.g. the basic viewer's
   * auto-spin — while the camera is being driven, then resume it on release.
   */
  onInteractingChange?: (interacting: boolean) => void;
};

/**
 * Wires react-native-gesture-handler to Filament's orbit camera manipulator:
 *   - one-finger pan  -> orbit (grabBegin / grabUpdate / grabEnd)
 *   - two-finger pinch -> dolly zoom (scroll)
 *
 * Filament's viewport uses a bottom-left origin while gesture coordinates use a
 * top-left origin, so the Y axis is flipped against the measured view height.
 * Callbacks run on the JS thread (`runOnJS`) because this app intentionally
 * omits Reanimated — the manipulator forwards work to the render thread itself.
 */
export function useOrbitControls({
  orbitHomePosition,
  targetPosition,
  onInteractingChange,
}: Options) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: orbitHomePosition ?? [0, 0.3, 3.6],
    targetPosition: targetPosition ?? [0, 0, 0],
    orbitSpeed: [0.05, 0.05],
  });

  // Mutable view height, kept current via onLayout and read inside gestures.
  const viewHeight = useRef(1);
  const lastScale = useRef(1);
  // Pan and pinch run simultaneously; count active gestures so the interacting
  // flag only flips back off once the LAST pointer lifts, not when either ends.
  const activeGestures = useRef(0);

  const onLayout = (event: LayoutChangeEvent) => {
    viewHeight.current = event.nativeEvent.layout.height;
  };

  const gesture = useMemo(() => {
    const flipY = (y: number) => viewHeight.current - y;

    const beginInteraction = () => {
      activeGestures.current += 1;
      if (activeGestures.current === 1) {
        onInteractingChange?.(true);
      }
    };
    const endInteraction = () => {
      activeGestures.current = Math.max(0, activeGestures.current - 1);
      if (activeGestures.current === 0) {
        onInteractingChange?.(false);
      }
    };

    const pan = Gesture.Pan()
      .runOnJS(true)
      .averageTouches(true)
      .maxPointers(1)
      .onBegin(event => {
        beginInteraction();
        cameraManipulator?.grabBegin(event.x, flipY(event.y), false);
      })
      .onUpdate(event => {
        cameraManipulator?.grabUpdate(event.x, flipY(event.y));
      })
      .onFinalize(() => {
        cameraManipulator?.grabEnd();
        endInteraction();
      });

    const pinch = Gesture.Pinch()
      .runOnJS(true)
      .onBegin(() => {
        lastScale.current = 1;
        beginInteraction();
      })
      .onUpdate(event => {
        const delta = (lastScale.current - event.scale) * 12;
        lastScale.current = event.scale;
        cameraManipulator?.scroll(event.focalX, flipY(event.focalY), delta);
      })
      .onFinalize(() => {
        endInteraction();
      });

    return Gesture.Simultaneous(pan, pinch);
  }, [cameraManipulator, onInteractingChange]);

  return { cameraManipulator, gesture, onLayout };
}
