import { useEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@briefly/tokens';

import type { CategoryId } from '@/src/data/discoverData';
import {
  filterBrieflyPicksByCategory,
  getBriefCover,
  type BrieflyPickList,
} from '@/src/data/discoverFeed';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, radius, spacing } from '@/src/theme';

import { DISCOVER_EASING, discoverMotion } from './motion';

const t = theme.dark;
const CARD_GAP = 16;
const HEADING_ID = 'briefly-picks-heading';

function curatorInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

type BrieflyPickCardProps = {
  pick: BrieflyPickList;
  index: number;
  cardWidth: number;
  allowMotion: boolean;
  onSelect?: (pickId: string) => void;
};

const BrieflyPickCard = ({
  pick,
  index,
  cardWidth,
  allowMotion,
  onSelect,
}: BrieflyPickCardProps) => {
  const opacity = useSharedValue(allowMotion ? 0 : 1);
  const translateY = useSharedValue(allowMotion ? 8 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!allowMotion) return;
    opacity.value = withDelay(
      index * 60,
      withTiming(1, { duration: discoverMotion.base, easing: DISCOVER_EASING }),
    );
    translateY.value = withDelay(
      index * 60,
      withTiming(0, { duration: discoverMotion.base, easing: DISCOVER_EASING }),
    );
  }, [allowMotion, index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const gridCoverIds = pick.coverIds.slice(0, 4);
  const extraCount = pick.coverIds.length > 4 ? pick.coverIds.length - 4 : 0;
  const titleId = `briefly-pick-title-${pick.id}`;

  return (
    <Animated.View style={[{ width: cardWidth }, animatedStyle]}>
      <Pressable
        onPress={() => onSelect?.(pick.id)}
        onPressIn={() => {
          if (allowMotion) {
            scale.value = withTiming(0.985, { duration: discoverMotion.press, easing: DISCOVER_EASING });
          }
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: discoverMotion.press, easing: DISCOVER_EASING });
        }}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        accessibilityRole="button"
        accessibilityLabel={pick.title}
      >
        <View style={styles.curator}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{curatorInitials(pick.curatorName)}</Text>
          </View>
          <View style={styles.curatorCopy}>
            <Text style={styles.curatorName}>{pick.curatorName}</Text>
            <Text style={styles.curatorRole}>{pick.curatorRole}</Text>
          </View>
        </View>

        <Text style={styles.title} nativeID={titleId} numberOfLines={2}>
          {pick.title}
        </Text>
        <Text style={styles.blurb} numberOfLines={2}>
          {pick.blurb}
        </Text>

        <View style={styles.coverGrid}>
          {gridCoverIds.map((coverId, coverIndex) => {
            const cover = getBriefCover(coverId);
            const isOverflowTile = extraCount > 0 && coverIndex === 3;

            return (
              <View key={coverId} style={styles.coverCell}>
                {cover ? (
                  <Image source={cover.cover} style={styles.coverArt} accessibilityIgnoresInvertColors />
                ) : (
                  <View style={styles.coverFallback} />
                )}
                {isOverflowTile ? (
                  <View style={styles.coverMore}>
                    <Text style={styles.coverMoreText}>+{extraCount}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export type BrieflyPicksProps = {
  picks?: BrieflyPickList[];
  activeCategoryId?: CategoryId | null;
  loading?: boolean;
  onSelect?: (pickId: string) => void;
  onSeeAll?: () => void;
};

export const BrieflyPicks = ({
  picks = [],
  activeCategoryId = null,
  loading = false,
  onSelect,
  onSeeAll,
}: BrieflyPicksProps) => {
  const reducedMotion = useReducedMotion();
  const allowMotion = !reducedMotion && !loading;
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.lg * 2 - CARD_GAP) / 1.1;

  const visiblePicks = useMemo(
    () => filterBrieflyPicksByCategory(picks, activeCategoryId),
    [picks, activeCategoryId],
  );

  if (!loading && visiblePicks.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} accessibilityLabelledBy={HEADING_ID}>
      <View style={styles.header}>
        <View style={styles.headline}>
          <Text style={styles.sectionTitle} accessibilityRole="header" nativeID={HEADING_ID}>
            Briefly Picks
          </Text>
          <Pressable
            onPress={onSeeAll}
            accessibilityRole="button"
            accessibilityLabel="See all collections"
          >
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Curated by humans who listen for a living.</Text>
      </View>

      <FlatList
        data={loading ? [] : visiblePicks}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + CARD_GAP}
        snapToAlignment="start"
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <BrieflyPickCard
            pick={item}
            index={index}
            cardWidth={cardWidth}
            allowMotion={allowMotion}
            onSelect={onSelect}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={[styles.cardLoading, { width: cardWidth }]} />
          ) : null
        }
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 25,
    letterSpacing: -0.44,
    color: t.text,
  },
  seeAll: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: t.textSecondary,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: fonts.body,
    fontSize: 13,
    letterSpacing: 0.26,
    color: t.textSecondary,
  },
  listContent: {
    gap: CARD_GAP,
    paddingHorizontal: spacing.lg,
  },
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: t.border,
    borderRadius: radius.cardSm,
    backgroundColor: t.surface,
  },
  cardPressed: {
    opacity: 0.95,
  },
  curator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.surfaceAlt,
  },
  avatarText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: t.primary,
  },
  curatorCopy: {
    flex: 1,
    gap: 2,
  },
  curatorName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: t.text,
  },
  curatorRole: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: t.textMuted,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    color: t.text,
  },
  blurb: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: t.textSecondary,
  },
  coverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  coverCell: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  coverArt: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverFallback: {
    flex: 1,
    backgroundColor: t.surfaceAlt,
  },
  coverMore: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(38, 26, 24, 0.6)',
  },
  coverMoreText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: t.text,
  },
  cardLoading: {
    height: 280,
    borderRadius: radius.cardSm,
    backgroundColor: t.surfaceAlt,
  },
});
