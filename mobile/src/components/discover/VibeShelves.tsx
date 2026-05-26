import { useEffect, useMemo } from 'react';
import {
  FlatList,
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
  filterVibeShelvesByCategory,
  type VibeShelf as VibeShelfData,
} from '@/src/data/discoverFeed';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, spacing } from '@/src/theme';

import { DISCOVER_EASING, discoverMotion } from './motion';

const t = theme.dark;
const CHIP_WIDTH = 160;
const CHIP_HEIGHT = 96;
const CHIP_GAP = 12;
const SNAP_INTERVAL = CHIP_WIDTH + CHIP_GAP;
const HEADING_ID = 'vibe-shelves-heading';

const accentColor: Record<string, string> = {
  primary: t.primary,
  'primary-soft': t.primary,
  'surface-alt': t.textSecondary,
  'text-muted': t.textMuted,
};

type VibeChipProps = {
  vibe: VibeShelfData;
  index: number;
  allowMotion: boolean;
  onSelect?: (vibeId: string) => void;
};

const VibeChip = ({ vibe, index, allowMotion, onSelect }: VibeChipProps) => {
  const opacity = useSharedValue(allowMotion ? 0 : 1);
  const translateY = useSharedValue(allowMotion ? 6 : 0);
  const scale = useSharedValue(1);
  const accent = accentColor[vibe.accentToken] ?? t.primary;

  useEffect(() => {
    if (!allowMotion) return;
    opacity.value = withDelay(
      index * discoverMotion.stagger,
      withTiming(1, { duration: discoverMotion.fast, easing: DISCOVER_EASING }),
    );
    translateY.value = withDelay(
      index * discoverMotion.stagger,
      withTiming(0, { duration: discoverMotion.fast, easing: DISCOVER_EASING }),
    );
  }, [allowMotion, index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.chipWrap, animatedStyle]}>
      <Pressable
        onPress={() => onSelect?.(vibe.id)}
        onPressIn={() => {
          if (allowMotion) {
            scale.value = withTiming(0.97, { duration: discoverMotion.press, easing: DISCOVER_EASING });
          }
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: discoverMotion.press, easing: DISCOVER_EASING });
        }}
        style={[styles.chip, { backgroundColor: `${accent}38` }]}
        accessibilityRole="button"
        accessibilityLabel={`${vibe.label}: ${vibe.subtitle}`}
      >
        <View style={[styles.chipHighlight, { backgroundColor: `${accent}0F` }]} />
        <View style={styles.chipCopy}>
          <Text style={styles.chipSubtitle} numberOfLines={1}>
            {vibe.subtitle}
          </Text>
          <Text style={styles.chipLabel} numberOfLines={2}>
            {vibe.label}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export type VibeShelvesProps = {
  shelves?: VibeShelfData[];
  activeCategoryId?: CategoryId | null;
  loading?: boolean;
  onSelect?: (vibeId: string) => void;
};

export const VibeShelves = ({
  shelves = [],
  activeCategoryId = null,
  loading = false,
  onSelect,
}: VibeShelvesProps) => {
  const reducedMotion = useReducedMotion();
  const allowMotion = !reducedMotion && !loading;
  const { width } = useWindowDimensions();

  const visibleShelves = useMemo(
    () => filterVibeShelvesByCategory(shelves, activeCategoryId),
    [shelves, activeCategoryId],
  );

  if (!loading && visibleShelves.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} accessibilityLabelledBy={HEADING_ID}>
      <Text
        style={styles.heading}
        accessibilityRole="header"
        nativeID={HEADING_ID}
      >
        In the mood for…
      </Text>

      <FlatList
        data={loading ? [] : visibleShelves}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        contentContainerStyle={[styles.listContent, { paddingRight: width * 0.1 }]}
        renderItem={({ item, index }) => (
          <VibeChip vibe={item} index={index} allowMotion={allowMotion} onSelect={onSelect} />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <View key={`vibe-loading-${index}`} style={styles.chipLoading} />
              ))}
            </View>
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
  heading: {
    marginBottom: spacing.lg,
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 25,
    letterSpacing: -0.44,
    color: t.text,
  },
  listContent: {
    gap: CHIP_GAP,
    paddingHorizontal: spacing.lg,
  },
  chipWrap: {
    width: CHIP_WIDTH,
  },
  chip: {
    width: CHIP_WIDTH,
    height: CHIP_HEIGHT,
    padding: spacing.md,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  chipHighlight: {
    ...StyleSheet.absoluteFill,
  },
  chipCopy: {
    gap: 4,
  },
  chipSubtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 0.44,
    color: t.textSecondary,
  },
  chipLabel: {
    fontFamily: fonts.display,
    fontSize: 17,
    lineHeight: 19,
    color: t.text,
  },
  loadingRow: {
    flexDirection: 'row',
    gap: CHIP_GAP,
  },
  chipLoading: {
    width: CHIP_WIDTH,
    height: CHIP_HEIGHT,
    borderRadius: 8,
    backgroundColor: t.surfaceAlt,
  },
});
