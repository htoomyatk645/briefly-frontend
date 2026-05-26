import { useCallback, useRef, type ReactNode } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { theme } from '@briefly/tokens';

import {
  MOOD_TILES,
  TRENDING_SEARCHES,
  type MoodTileItem,
  type TrendingSearchItem,
} from '@/src/data/searchData';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, radius, spacing } from '@/src/theme';

import { coverTintBackground } from './coverTint';
import { SEARCH_EASING, searchMotion } from './searchMotion';

const t = theme.dark;
const LONG_PRESS_MS = 500;

type SearchSectionProps = {
  index: number;
  children: ReactNode;
  animate?: boolean;
};

const SearchSection = ({ index, children, animate = true }: SearchSectionProps) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion || !animate) {
    return <View style={styles.section}>{children}</View>;
  }

  return (
    <Animated.View
      entering={FadeIn.delay(index * searchMotion.sectionStagger)
        .duration(searchMotion.entrance)
        .easing(SEARCH_EASING)}
      style={styles.section}
    >
      {children}
    </Animated.View>
  );
};

const SPARKLINE_SAMPLES = 12;

const SearchSparkline = ({ values }: { values: number[] }) => {
  const sampled = values.filter(
    (_, i) => i % Math.ceil(values.length / SPARKLINE_SAMPLES) === 0,
  );
  const max = Math.max(...sampled, 0.01);

  return (
    <View style={sparklineStyles.wrap} accessibilityElementsHidden>
      {sampled.map((v, i) => (
        <View
          key={i}
          style={[
            sparklineStyles.bar,
            { height: Math.max(3, (v / max) * 18) },
          ]}
        />
      ))}
    </View>
  );
};

const sparklineStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 20,
    width: 56,
  },
  bar: {
    flex: 1,
    backgroundColor: t.textMuted,
    borderRadius: 1,
    minWidth: 2,
  },
});

type TrendingCardProps = {
  item?: TrendingSearchItem;
  loading?: boolean;
  onSelect?: (query: string) => void;
};

const TrendingCard = ({ item, loading = false, onSelect }: TrendingCardProps) => {
  if (loading) {
    return <View style={[styles.trendingCard, styles.skeleton]} accessibilityElementsHidden />;
  }
  if (!item) return null;

  return (
    <Pressable
      style={styles.trendingCard}
      onPress={() => onSelect?.(item.query)}
      accessibilityRole="button"
      accessibilityLabel={`Search for ${item.query}: ${item.pullQuote}`}
    >
      <Image source={item.cover} style={styles.trendingCover} accessibilityIgnoresInvertColors />
      <View style={styles.trendingBody}>
        <Text style={styles.trendingQuote} numberOfLines={2}>
          {item.pullQuote}
        </Text>
        <View style={styles.trendingMeta}>
          <Text style={styles.trendingShow} numberOfLines={1}>
            {item.showName}
          </Text>
          <SearchSparkline values={item.volume24h} />
        </View>
      </View>
      <Text style={styles.trendingBadge}>{item.playCountLabel}</Text>
    </Pressable>
  );
};

type MoodTileProps = {
  item?: MoodTileItem;
  loading?: boolean;
  onSelect?: (moodQuery: string) => void;
};

const MoodTile = ({ item, loading = false, onSelect }: MoodTileProps) => {
  if (loading) {
    return <View style={[styles.moodTile, styles.skeleton]} accessibilityElementsHidden />;
  }
  if (!item) return null;

  const bg = coverTintBackground(item.cover, 0.16);

  return (
    <Pressable
      style={[styles.moodTile, { backgroundColor: bg }]}
      onPress={() => onSelect?.(item.moodQuery)}
      accessibilityRole="button"
      accessibilityLabel={`Browse mood: ${item.label}`}
    >
      <Text style={styles.moodLabel}>{item.label}</Text>
    </Pressable>
  );
};

type RecentRowProps = {
  queries: string[];
  loading?: boolean;
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClearAll: () => void;
};

const RecentRow = ({
  queries,
  loading = false,
  onSelect,
  onRemove,
  onClearAll,
}: RecentRowProps) => {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleLabelLongPress = useCallback(() => {
    cancelLongPress();
    longPressTimer.current = setTimeout(() => {
      onClearAll();
      longPressTimer.current = null;
    }, LONG_PRESS_MS);
  }, [cancelLongPress, onClearAll]);

  if (loading) {
    return (
      <View accessibilityLabel="Recent searches" accessibilityState={{ busy: true }}>
        <Text style={styles.sectionLabel}>Recent</Text>
        <View style={styles.recentChips}>
          {Array.from({ length: 4 }, (_, i) => (
            <View key={i} style={[styles.recentChip, styles.skeleton]} />
          ))}
        </View>
      </View>
    );
  }

  if (queries.length === 0) return null;

  return (
    <View accessibilityLabel="Recent searches">
      <Pressable
        onLongPress={handleLabelLongPress}
        onPressOut={cancelLongPress}
        accessibilityRole="text"
      >
        <Text style={styles.sectionLabel}>Recent</Text>
      </Pressable>
      <View style={styles.recentChips}>
        {queries.map((query) => (
          <View key={query} style={styles.recentWrap}>
            <Pressable
              style={styles.recentChip}
              onPress={() => onSelect(query)}
              accessibilityRole="button"
              accessibilityLabel={`Search for ${query}`}
            >
              <Text style={styles.recentText} numberOfLines={1}>
                {query}
              </Text>
            </Pressable>
            <Pressable
              style={styles.recentDismiss}
              onPress={() => onRemove(query)}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${query} from recent searches`}
              hitSlop={8}
            >
              <Text style={styles.recentDismissText}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export type SearchEmptyProps = {
  recentQueries: string[];
  loading?: boolean;
  isTyping?: boolean;
  onRecentSelect: (query: string) => void;
  onRecentRemove: (query: string) => void;
  onRecentClearAll: () => void;
  onTrendingSelect: (query: string) => void;
  onMoodSelect: (moodQuery: string) => void;
};

export const SearchEmpty = ({
  recentQueries,
  loading = false,
  isTyping = false,
  onRecentSelect,
  onRecentRemove,
  onRecentClearAll,
  onTrendingSelect,
  onMoodSelect,
}: SearchEmptyProps) => {
  const reducedMotion = useReducedMotion();
  const showRecent = !isTyping && (loading || recentQueries.length > 0);
  let sectionIndex = 0;

  const renderTrending: ListRenderItem<TrendingSearchItem | 'skeleton'> = ({ item }) => {
    if (item === 'skeleton') {
      return <TrendingCard loading />;
    }
    return <TrendingCard item={item} onSelect={onTrendingSelect} />;
  };

  const trendingData: (TrendingSearchItem | 'skeleton')[] = loading
    ? TRENDING_SEARCHES.map(() => 'skeleton' as const)
    : TRENDING_SEARCHES;

  const editorial = (
    <>
      <SearchSection index={sectionIndex++} animate={!isTyping}>
        <Text style={styles.sectionLabel}>Trending now</Text>
        <FlatList
          data={trendingData}
          keyExtractor={(item, index) =>
            item === 'skeleton' ? `skel-${index}` : item.id
          }
          renderItem={renderTrending}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.listGap} />}
        />
      </SearchSection>

      <SearchSection index={sectionIndex} animate={!isTyping}>
        <Text style={styles.sectionLabel}>Browse by mood</Text>
        <View style={styles.moodGrid}>
          {loading
            ? MOOD_TILES.map((item) => <MoodTile key={item.id} loading />)
            : MOOD_TILES.map((item) => (
                <View key={item.id} style={styles.moodCell}>
                  <MoodTile item={item} onSelect={onMoodSelect} />
                </View>
              ))}
        </View>
      </SearchSection>
    </>
  );

  return (
    <View style={styles.empty}>
      {showRecent ? (
        <SearchSection index={sectionIndex++}>
          <RecentRow
            queries={recentQueries}
            loading={loading}
            onSelect={onRecentSelect}
            onRemove={onRecentRemove}
            onClearAll={onRecentClearAll}
          />
        </SearchSection>
      ) : null}

      {reducedMotion ? (
        isTyping ? null : editorial
      ) : isTyping ? null : (
        <Animated.View
          entering={FadeIn.duration(searchMotion.editorialFade).easing(SEARCH_EASING)}
          exiting={FadeOut.duration(searchMotion.editorialFade).easing(SEARCH_EASING)}
        >
          {editorial}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    gap: spacing.xxl,
  },
  section: {
    gap: spacing.md,
  },
  sectionLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: t.textSecondary,
    marginBottom: spacing.sm,
  },
  listGap: {
    height: spacing.sm,
  },
  skeleton: {
    backgroundColor: t.surfaceAlt,
    opacity: 0.6,
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.cardSm,
    backgroundColor: t.surface,
    minHeight: 80,
  },
  trendingCover: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  trendingBody: {
    flex: 1,
    gap: spacing.xs,
  },
  trendingQuote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 18,
    color: t.text,
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  trendingShow: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 12,
    color: t.textMuted,
  },
  trendingBadge: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: t.textMuted,
    alignSelf: 'flex-start',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  moodCell: {
    width: '50%',
    padding: spacing.xs,
  },
  moodTile: {
    minHeight: 88,
    borderRadius: radius.cardSm,
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  moodLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    lineHeight: 18,
    color: t.text,
  },
  recentChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  recentWrap: {
    position: 'relative',
    maxWidth: '100%',
  },
  recentChip: {
    paddingVertical: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.xxl + spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: t.surfaceAlt,
    maxWidth: '100%',
  },
  recentText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: t.text,
  },
  recentDismiss: {
    position: 'absolute',
    right: spacing.sm,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    minWidth: 28,
    alignItems: 'center',
  },
  recentDismissText: {
    fontSize: 18,
    color: t.textMuted,
    lineHeight: 22,
  },
});
