import type { ImageSourcePropType } from 'react-native';

/** Static cover-key → HSL tint for hero/tile backgrounds (no async image sampling on RN). */
const TINT_BY_COVER_KEY: Record<string, { h: number; s: number }> = {
  huberman: { h: 145, s: 28 },
  wsj: { h: 215, s: 22 },
  foreignAffairs: { h: 8, s: 24 },
  jayShetty: { h: 32, s: 30 },
  acquired: { h: 200, s: 26 },
  theDaily: { h: 42, s: 20 },
  revisionistHistory: { h: 18, s: 22 },
  smartLess: { h: 260, s: 18 },
};

function coverKeyFromSource(source: ImageSourcePropType): string | null {
  if (!source || typeof source !== 'object' || !('uri' in source)) return null;
  const uri = source.uri ?? '';
  if (uri.includes('9ad31912')) return 'huberman';
  if (uri.includes('cd0bbbae')) return 'wsj';
  if (uri.includes('d347d6a6')) return 'foreignAffairs';
  if (uri.includes('5ea169e2')) return 'jayShetty';
  return null;
}

export function getCoverTintHsl(cover: ImageSourcePropType): { h: number; s: number } {
  const key = coverKeyFromSource(cover);
  if (key && TINT_BY_COVER_KEY[key]) return TINT_BY_COVER_KEY[key];
  return { h: 220, s: 24 };
}

export function coverTintBackground(cover: ImageSourcePropType, lightness = 0.14): string {
  const { h, s } = getCoverTintHsl(cover);
  return `hsl(${h} ${s}% ${lightness * 100}%)`;
}
