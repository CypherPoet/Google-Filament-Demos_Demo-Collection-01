const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Let Metro bundle 3D model + Filament resource files as assets.
    //   glb     -> glTF binary models
    //   ktx     -> compressed image-based-lighting / skybox environments
    //   filamat -> compiled Filament materials
    assetExts: [...defaultConfig.resolver.assetExts, 'glb', 'ktx', 'filamat'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
