import { useEffect, useMemo } from 'react';
import {
  FlatList,
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

import type { CategoryId } from '@/src/data/discoverData';
import { filterBriefsByCategory, type BriefCard } from '@/src/data/discoverFeed';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, spacing } from '@/src/theme';

import { DISCOVER_EASING, discoverMotion } from './motion';

const t = theme.dark;
const HEADING_ID = 'trending-briefs-heading';
const COLUMN_GAP = 16;

const PlayIcon = () => (
  <View style={styles.playTriangle} accessibilityElementsHidden />
);

type TrendingBriefRowProps = {
  rank: number;
  brief: BriefCard;
  onPlay?: (id: string) => void;
  allowPressMotion: boolean;
};

const TrendingBriefRow = ({ rank, brief, onPlay, allowPressMotion }: TrendingBriefRowProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      style={styles.row}
      accessibilityRole="text"
      accessibilityLabel={`Number ${rank}: ${brief.episodeTitle} by ${brief.showName}, ${brief.playCountLabel ?? ''}`}
    >
      <Text style={[styles.rank, rank <= 3 && styles.rankTop]}>{rank}</Text>

      <Image source={brief.cover} style={styles.cover} accessibilityIgnoresInvertColors />

      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={1}>
          {brief.episodeTitle}
        </Text>
        <Text style={styles.show} numberOfLines={1}>
          {brief.showName}
        </Text>
        {brief.playCountLabel ? (
          <Text style={styles.plays} numberOfLines={1}>
            {brief.playCountLabel}
          </Text>
        ) : null}
      </View>

      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={() => onPlay?.(brief.id)}
          onPressIn={() => {
            if (allowPressMotion) {
              scale.value = withTiming(0.92, { duration: discoverMotion.press, easing: DISCOVER_EASING });
            }
          }}
          onPressOut={() => {
            scale.value = withTiming(1, { duration: discoverMotion.press, easing: DISCOVER_EASING });
          }}
          style={styles.playButton}
          accessibilityRole="button"
          accessibilityLabel={`Play the best parts of ${brief.episodeTitle}`}
        >
          <PlayIcon />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export type TrendingBriefsProps = {
  briefs?: BriefCard[];
  activeCategoryId?: CategoryId | null;
  loading?: boolean;
  onPlay?: (id: string) => void;
};

export const TrendingBriefs = ({
  briefs = [],
  activeCategoryId = null,
  loading = false,
  onPlay,
}: TrendingBriefsProps) => {
  const reducedMotion = useReducedMotion();
  const allowMotion = !reducedMotion && !loading;
  const opacity = useSharedValue(allowMotion ? 0 : 1);

  useEffect(() => {
    if (!allowMotion) {
      opacity.value = 1;
      return;
    }
    opacity.value = 0;
    opacity.value = withTiming(1, { duration: discoverMotion.base, easing: DISCOVER_EASING });
  }, [activeCategoryId, allowMotion, opacity]);

  const animatedGridStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const visibleBriefs = useMemo(
    () => filterBriefsByCategory(briefs, activeCategoryId),
    [briefs, activeCategoryId],
  );

  if (!loading && visibleBriefs.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} accessibilityLabelledBy={HEADING_ID}>
      <View style={styles.header}>
        <View style={styles.headline}>
          <Text style={styles.sectionTitle} accessibilityRole="header" nativeID={HEADING_ID}>
            Trending Briefs Right Now
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Now</Text>
          </View>
        </View>
        <Text style={styles.sub}>Refreshed every hour</Text>
      </View>

      <Animated.View style={animatedGridStyle}>
        <FlatList
          data={loading ? [] : visibleBriefs}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item, index }) => (
            <View style={styles.gridCell}>
              <TrendingBriefRow
                rank={index + 1}
                brief={item}
                onPlay={onPlay}
                allowPressMotion={allowMotion}
              />
            </View>
          )}
          ListEmptyComponent={
            loading ? (
              <View style={styles.loadingGrid}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <View key={`trending-loading-${index}`} style={styles.rowLoading} />
                ))}
              </View>
            ) : null
          }
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  header: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 25,
    letterSpacing: -0.44,
    color: t.text,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: t.surfaceAlt,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: t.primaryHover,
  },
  sub: {
    marginTop: 6,
    fontFamily: fonts.body,
    fontSize: 12,
    color: t.textMuted,
  },
  gridContent: {
    paddingHorizontal: spacing.lg,
    gap: 14,
  },
  columnWrapper: {
    gap: COLUMN_GAP,
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 56,
    paddingVertical: 4,
  },
  rank: {
    width: 32,
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 28,
    textAlign: 'right',
    color: t.textSecondary,
  },
  rankTop: {
    color: t.primary,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    lineHeight: 16,
    color: t.text,
  },
  show: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 14,
    color: t.textMuted,
  },
  plays: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    lineHeight: 14,
    color: t.primary,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.primary,
  },
  playTriangle: {
    width: 0,
    height: 0,
    marginLeft: 2,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: t.onPrimary,
  },
  loadingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: COLUMN_GAP,
  },
  rowLoading: {
    width: '47%',
    height: 56,
    borderRadius: 4,
    backgroundColor: t.surfaceAlt,
  },
});
