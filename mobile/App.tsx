/**
 * Filament Demo Lab — a React Native + react-native-filament showcase.
 *
 * A tiny state router swaps between a home menu and four full-screen demos.
 * No navigation library is used so the native dependency surface stays minimal
 * (Filament + worklets-core + gesture-handler). Every demo paints its own dark
 * studio backdrop and renders React Native overlays ON TOP of <FilamentView>,
 * never inside it.
 */
import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DEMOS, DemoId } from './src/data/demos';
import { colors } from './src/theme';
import { HomeScreen } from './src/screens/HomeScreen';
import { BasicViewerScreen } from './src/screens/BasicViewerScreen';
import { ProductViewerScreen } from './src/screens/ProductViewerScreen';
import { MaterialLightingScreen } from './src/screens/MaterialLightingScreen';
import { AssetPipelineScreen } from './src/screens/AssetPipelineScreen';

type Route = 'home' | DemoId;

const findDemo = (id: DemoId) => DEMOS.find(demo => demo.id === id)!;

function App() {
  const [route, setRoute] = useState<Route>('home');
  const goHome = () => setRoute('home');

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.base} />
        {route === 'home' && <HomeScreen onOpen={setRoute} />}
        {route === 'basic' && (
          <BasicViewerScreen demo={findDemo('basic')} onBack={goHome} />
        )}
        {route === 'product' && (
          <ProductViewerScreen demo={findDemo('product')} onBack={goHome} />
        )}
        {route === 'material' && (
          <MaterialLightingScreen demo={findDemo('material')} onBack={goHome} />
        )}
        {route === 'pipeline' && (
          <AssetPipelineScreen demo={findDemo('pipeline')} onBack={goHome} />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.base },
});

export default App;
