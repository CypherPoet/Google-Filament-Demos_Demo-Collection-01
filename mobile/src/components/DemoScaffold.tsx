import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { Demo } from '../data/demos';
import { colors, radius, spacing, typography } from '../theme';
import { Eyebrow, GlassPanel } from './ui';

/**
 * Shared chrome rendered ON TOP of a screen's <FilamentView> (never inside it).
 * Lays out a header at the top, an optional control dock at the bottom, and a
 * fading "loading" veil while the model streams in.
 */
export function DemoScaffold({
  demo,
  insets,
  onBack,
  loading,
  loadingLabel,
  children,
}: {
  demo: Demo;
  insets: EdgeInsets;
  onBack: () => void;
  loading: boolean;
  loadingLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.root} pointerEvents="box-none">
      <View
        pointerEvents="box-none"
        style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
            <Text style={styles.backGlyph}>‹</Text>
          </Pressable>
          <View style={styles.headerText}>
            <Eyebrow>Demo {String(demo.index).padStart(2, '0')}</Eyebrow>
            <Text style={styles.title}>{demo.title}</Text>
            <Text style={styles.tagline}>{demo.tagline}</Text>
          </View>
        </View>
      </View>

      {children ? (
        <View
          pointerEvents="box-none"
          style={[styles.dock, { paddingBottom: insets.bottom + spacing.lg }]}>
          <GlassPanel style={styles.dockPanel}>{children}</GlassPanel>
        </View>
      ) : null}

      <LoadingVeil visible={loading} label={loadingLabel} />
    </View>
  );
}

function LoadingVeil({ visible, label }: { visible: boolean; label: string }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 360,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[styles.veil, { opacity }]}>
      <ActivityIndicator color={colors.accent} />
      <Text style={styles.veilText}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { ...StyleSheet.absoluteFillObject },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  back: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(14,16,22,0.74)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    color: colors.textPrimary,
    fontSize: 26,
    lineHeight: 28,
    marginTop: -2,
  },
  headerText: { flex: 1, paddingTop: 1 },
  title: { ...typography.title, color: colors.textPrimary, marginTop: 2 },
  tagline: { ...typography.body, color: colors.textSecondary, marginTop: 3 },
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
  },
  dockPanel: { gap: spacing.md },
  veil: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.base,
  },
  veilText: { ...typography.subtitle, color: colors.textSecondary },
});
