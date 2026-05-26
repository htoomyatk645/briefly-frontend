import { Ionicons } from '@expo/vector-icons';
import { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '@briefly/tokens';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, radius, spacing } from '@/src/theme';

import { coverTintBackground } from './coverTint';
import { SEARCH_PLAY_ACCENT, SEARCH_EASING, searchMotion } from './searchMotion';
import { pullQuoteForCard } from './searchResultsUtils';
import type { SearchIndexEntry } from './useSearchIndex';

const t = theme.dark;

export type HeroClipCardProps = {
  clip?: SearchIndexEntry;
  loading?: boolean;
  onPlay: (clip: SearchIndexEntry) => void;
};

export const HeroClipCard = ({ clip, loading = false, onPlay }: HeroClipCardProps) => {
  const reducedMotion = useReducedMotion();
  const hasPreviewedRef = useRef(false);

  const handleLayout = useCallback(() => {
    if (loading || !clip || reducedMotion || hasPreviewedRef.current) return;
    hasPreviewedRef.current = true;
    // Audio preview stub — native player not wired for hero preview yet.
  }, [clip, loading, reducedMotion]);

  if (loading) {
    return (
      <View
        style={[styles.hero, styles.skeleton]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    );
  }

  if (!clip) {
    return null;
  }

  const quote = pullQuoteForCard(clip);
  const bg = coverTintBackground(clip.cover, 0.14);

  const inner = (
    <View
      style={[styles.hero, { backgroundColor: bg }]}
      onLayout={handleLayout}
      accessibilityLabel={`${clip.showName}: ${quote}`}
    >
      <View style={styles.inner}>
        <Text style={styles.quote} accessibilityRole="text">
          &ldquo;{quote}&rdquo;
        </Text>
        <Text style={styles.speaker}>{clip.speakerName}</Text>
        <Text style={styles.show}>{clip.showName}</Text>
        <Pressable
          style={styles.play}
          onPress={() => onPlay(clip)}
          accessibilityRole="button"
          accessibilityLabel={`Play clip from ${clip.showName}`}
        >
          <Ionicons name="play" size={22} color={t.onPrimary} />
        </Pressable>
      </View>
    </View>
  );

  if (reducedMotion) {
    return inner;
  }

  return (
    <Animated.View entering={FadeIn.duration(searchMotion.entrance).easing(SEARCH_EASING)}>
      {inner}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.card,
    minHeight: 220,
    overflow: 'hidden',
  },
  skeleton: {
    backgroundColor: t.surfaceAlt,
    opacity: 0.6,
  },
  inner: {
    flex: 1,
    padding: spacing.xxl,
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  quote: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 28,
    color: t.text,
  },
  speaker: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: t.textSecondary,
    marginTop: spacing.sm,
  },
  show: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: t.textMuted,
  },
  play: {
    position: 'absolute',
    right: spacing.xxl,
    bottom: spacing.xxl,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: SEARCH_PLAY_ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
