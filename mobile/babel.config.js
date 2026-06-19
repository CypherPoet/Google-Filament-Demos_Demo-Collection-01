module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Hoists `'worklet'`-annotated functions (render callbacks, camera
    // manipulator calls) so react-native-filament can run them on its
    // dedicated render thread. Keep this last in the plugin list.
    ['react-native-worklets-core/plugin', {processNestedWorklets: true}],
  ],
};
