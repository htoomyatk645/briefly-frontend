import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@briefly/tokens';

import type { EditorialHeroItem } from '@/src/data/discoverFeed';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, radius, spacing } from '@/src/theme';

import { DISCOVER_EASING, discoverMotion } from './motion';

const t = theme.dark;
const CARD_HEIGHT = 320;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type EditorialHeroProps = {
  hero?: EditorialHeroItem | null;
  loading?: boolean;
  onPlay?: (id: string) => void;
};

export const EditorialHero = ({
  hero = null,
  loading = false,
  onPlay,
}: EditorialHeroProps) => {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(reducedMotion ? 1 : 0);
  const translateY = useSharedValue(reducedMotion ? 0 : 8);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (loading || !hero || reducedMotion) return;
    opacity.value = withTiming(1, { duration: discoverMotion.slow, easing: DISCOVER_EASING });
    translateY.value = withTiming(0, { duration: discoverMotion.slow, easing: DISCOVER_EASING });
  }, [hero, loading, opacity, reducedMotion, translateY]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  if (loading) {
    return (
      <View style={styles.section} accessibilityLabel="Loading brief of the week">
        <Text style={styles.label}>Brief of the week</Text>
        <View style={[styles.card, styles.cardLoading]} accessibilityRole="progressbar" />
      </View>
    );
  }

  if (!hero) {
    return <View style={styles.spacer} accessibilityElementsHidden />;
  }

  const titleId = `editorial-hero-title-${hero.id}`;

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Brief of the week</Text>

      <AnimatedPressable
        onPress={() => onPlay?.(hero.id)}
        onPressIn={() => {
          if (!reducedMotion) {
            scale.value = withTiming(0.985, { duration: discoverMotion.press, easing: DISCOVER_EASING });
          }
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: discoverMotion.press, easing: DISCOVER_EASING });
        }}
        style={[styles.card, cardStyle]}
        accessibilityRole="button"
        accessibilityLabel={`Play ${hero.episodeTitle} from ${hero.showName}`}
      >
        <Image source={hero.cover} style={styles.cover} accessibilityIgnoresInvertColors />
        <LinearGradient
          colors={[t.surface, `${t.bgPage}EB`, `${t.bgPage}73`, `${t.bgPage}00`]}
          locations={[0, 0.38, 0.58, 0.78]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        <View style={styles.content}>
          <Text style={styles.show}>{hero.showName}</Text>
          <Text style={styles.title} nativeID={titleId}>
            {hero.episodeTitle}
          </Text>
          <Text style={styles.brief} numberOfLines={2}>
            {hero.brief}
          </Text>

          <View style={styles.actions}>
            <View style={styles.durationPill}>
              <Text style={styles.duration}>{hero.durationLabel}</Text>
            </View>
            <Pressable
              onPress={(event) => {
                event.stopPropagation?.();
                onPlay?.(hero.id);
              }}
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
              accessibilityRole="button"
              accessibilityLabel={`Play the best parts of ${hero.episodeTitle}`}
            >
              <Text style={styles.ctaLabel}>Play the best parts</Text>
            </Pressable>
          </View>
        </View>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.md,
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1.32,
    textTransform: 'uppercase',
    color: t.textMuted,
  },
  card: {
    position: 'relative',
    height: CARD_HEIGHT,
    borderRadius: radius.cardSm,
    overflow: 'hidden',
    backgroundColor: t.surface,
  },
  cardLoading: {
    backgroundColor: t.surfaceAlt,
  },
  cover: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '67%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '60%',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    justifyContent: 'flex-end',
  },
  show: {
    marginBottom: spacing.sm,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    letterSpacing: 1.04,
    textTransform: 'uppercase',
    color: t.primary,
  },
  title: {
    marginBottom: 10,
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.52,
    color: t.text,
  },
  brief: {
    marginBottom: spacing.lg,
    maxWidth: 220,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: t.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  durationPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: t.surfaceAlt,
  },
  duration: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: t.textSecondary,
  },
  cta: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: t.primary,
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: t.onPrimary,
  },
  spacer: {
    height: CARD_HEIGHT,
  },
});
