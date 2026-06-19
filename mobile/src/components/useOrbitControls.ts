import { useMemo, useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { Float3, useCameraManipulator } from 'react-native-filament';

type Options = {
  orbitHomePosition?: Float3;
  targetPosition?: Float3;
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
export function useOrbitControls({ orbitHomePosition, targetPosition }: Options) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: orbitHomePosition ?? [0, 0.3, 3.6],
    targetPosition: targetPosition ?? [0, 0, 0],
    orbitSpeed: [0.05, 0.05],
  });

  // Mutable view height, kept current via onLayout and read inside gestures.
  const viewHeight = useRef(1);
  const lastScale = useRef(1);

  const onLayout = (event: LayoutChangeEvent) => {
    viewHeight.current = event.nativeEvent.layout.height;
  };

  const gesture = useMemo(() => {
    const flipY = (y: number) => viewHeight.current - y;

    const pan = Gesture.Pan()
      .runOnJS(true)
      .averageTouches(true)
      .maxPointers(1)
      .onBegin(event => {
        cameraManipulator?.grabBegin(event.x, flipY(event.y), false);
      })
      .onUpdate(event => {
        cameraManipulator?.grabUpdate(event.x, flipY(event.y));
      })
      .onFinalize(() => {
        cameraManipulator?.grabEnd();
      });

    const pinch = Gesture.Pinch()
      .runOnJS(true)
      .onBegin(() => {
        lastScale.current = 1;
      })
      .onUpdate(event => {
        const delta = (lastScale.current - event.scale) * 12;
        lastScale.current = event.scale;
        cameraManipulator?.scroll(event.focalX, flipY(event.focalY), delta);
      });

    return Gesture.Simultaneous(pan, pinch);
  }, [cameraManipulator]);

  return { cameraManipulator, gesture, onLayout };
}
