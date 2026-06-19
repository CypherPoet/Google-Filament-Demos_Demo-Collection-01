import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

/** Frosted container used for headers and control docks. */
export function GlassPanel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.glass, style]}>{children}</View>;
}

/** Small uppercase caption, e.g. "DEMO 02" or a control group label. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

/** Read-only chip showing a key/value fact (model size, license, …). */
export function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value}</Text>
    </View>
  );
}

export type SegmentOption<T extends string> = { value: T; label: string };

/** Pill-shaped segmented control for switching models / presets / clips. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segmentTrack}>
      {options.map(option => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.label}
            style={[styles.segment, active && styles.segmentActive]}
            hitSlop={6}>
            <Text
              style={[styles.segmentText, active && styles.segmentTextActive]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Compact circular/rounded action button with a glyph + optional label. */
export function ActionButton({
  glyph,
  label,
  onPress,
  tone = 'neutral',
}: {
  glyph: string;
  label?: string;
  onPress: () => void;
  tone?: 'neutral' | 'accent';
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label ?? glyph}
      style={({ pressed }) => [
        styles.action,
        tone === 'accent' && styles.actionAccent,
        pressed && styles.actionPressed,
      ]}>
      <Text style={[styles.actionGlyph, tone === 'accent' && styles.actionGlyphAccent]}>
        {glyph}
      </Text>
      {label ? (
        <Text style={[styles.actionLabel, tone === 'accent' && styles.actionLabelAccent]}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  glass: {
    backgroundColor: 'rgba(14,16,22,0.74)',
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  eyebrow: {
    ...typography.label,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  chipLabel: {
    ...typography.label,
    color: colors.textDim,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  chipValue: { ...typography.mono, color: colors.textPrimary },
  segmentTrack: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.accentSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentBorder,
  },
  segmentText: { ...typography.subtitle, color: colors.textSecondary },
  segmentTextActive: { color: colors.accent },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
  },
  actionAccent: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentBorder,
  },
  actionPressed: { opacity: 0.6 },
  actionGlyph: { fontSize: 16, color: colors.textPrimary },
  actionGlyphAccent: { color: colors.accent },
  actionLabel: { ...typography.subtitle, color: colors.textPrimary },
  actionLabelAccent: { color: colors.accent },
});
