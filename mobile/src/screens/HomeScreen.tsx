import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Demo, DEMOS, DemoId } from '../data/demos';
import { colors, radius, spacing, typography } from '../theme';
import { Eyebrow } from '../components/ui';

export function HomeScreen({ onOpen }: { onOpen: (id: DemoId) => void }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.xxl, paddingBottom: insets.bottom + spacing.xxl },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.badge}>
        <View style={styles.dot} />
        <Text style={styles.badgeText}>React Native · Google Filament</Text>
      </View>

      <Text style={styles.hero}>Filament{'\n'}Demo Lab</Text>
      <Text style={styles.lede}>
        A mobile-native 3D rendering tour — GLB assets, PBR materials, cameras,
        lighting, gestures, and animation, drawn by Filament's native engine over
        Metal.
      </Text>

      <View style={styles.list}>
        {DEMOS.map(demo => (
          <DemoCard key={demo.id} demo={demo} onPress={() => onOpen(demo.id)} />
        ))}
      </View>

      <Text style={styles.footer}>iOS Simulator · Metal · 4 scenes</Text>
    </ScrollView>
  );
}

function DemoCard({ demo, onPress }: { demo: Demo; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.glyphWrap}>
        <Text style={styles.glyph}>{demo.accentGlyph}</Text>
      </View>
      <View style={styles.cardBody}>
        <Eyebrow>Demo {String(demo.index).padStart(2, '0')}</Eyebrow>
        <Text style={styles.cardTitle}>{demo.title}</Text>
        <Text style={styles.cardTagline}>{demo.tagline}</Text>
        <Text style={styles.cardDemonstrates}>{demo.demonstrates}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.base },
  content: { paddingHorizontal: spacing.xl },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent },
  badgeText: { ...typography.label, color: colors.textSecondary },
  hero: {
    ...typography.hero,
    fontSize: 40,
    lineHeight: 44,
    color: colors.textPrimary,
    marginTop: spacing.xl,
  },
  lede: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  list: { marginTop: spacing.xxl, gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.baseElevated,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardPressed: { borderColor: colors.accentBorder, backgroundColor: '#181b22' },
  glyphWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: { fontSize: 22, color: colors.accent },
  cardBody: { flex: 1 },
  cardTitle: { ...typography.subtitle, fontSize: 17, color: colors.textPrimary, marginTop: 2 },
  cardTagline: { ...typography.body, color: colors.textSecondary, marginTop: 3, lineHeight: 19 },
  cardDemonstrates: { ...typography.label, color: colors.textDim, marginTop: spacing.sm },
  chevron: { fontSize: 26, color: colors.textDim, marginLeft: spacing.xs },
  footer: {
    ...typography.label,
    color: colors.textDim,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
