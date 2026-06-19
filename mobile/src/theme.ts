/**
 * Shared design tokens for the Filament Demo Lab UI.
 *
 * The 3D content is rendered by Filament on a transparent surface; every screen
 * paints this dark "studio" backdrop behind the <FilamentView> so models read as
 * floating product shots. Keep the palette cohesive — one warm accent (a glowing
 * "filament" amber) against neutral charcoals.
 */
export const colors = {
  base: '#0B0C10',
  baseElevated: '#14161C',
  surface: 'rgba(255,255,255,0.06)',
  surfaceStrong: 'rgba(255,255,255,0.10)',
  border: 'rgba(255,255,255,0.12)',
  borderStrong: 'rgba(255,255,255,0.20)',

  textPrimary: '#F6F7F9',
  textSecondary: 'rgba(246,247,249,0.66)',
  textDim: 'rgba(246,247,249,0.42)',

  accent: '#FFA63D',
  accentSoft: 'rgba(255,166,61,0.16)',
  accentBorder: 'rgba(255,166,61,0.45)',
  cool: '#5AA9FF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const typography = {
  hero: { fontSize: 30, fontWeight: '700' as const, letterSpacing: 0.2 },
  title: { fontSize: 21, fontWeight: '700' as const, letterSpacing: 0.2 },
  subtitle: { fontSize: 15, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  label: { fontSize: 12, fontWeight: '600' as const, letterSpacing: 0.6 },
  mono: { fontSize: 12, fontWeight: '500' as const },
} as const;
