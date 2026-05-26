import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '@briefly/tokens';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, spacing } from '@/src/theme';

import { SEARCH_EASING, searchMotion } from './searchMotion';
import { displayPullQuote, type SearchIndexEntry } from './useSearchIndex';

export type InlineResultsProps = {
  matches: SearchIndexEntry[];
  totalCount: number;
  isPending?: boolean;
  query: string;
  onPlay: (entry: SearchIndexEntry) => void;
  onOpenClip: (entry: SearchIndexEntry) => void;
  onSeeAll: () => void;
};

const t = theme.dark;

type InlineRowProps = {
  entry: SearchIndexEntry;
  index: number;
  isPending: boolean;
  onPlay: (entry: SearchIndexEntry) => void;
  onOpenClip: (entry: SearchIndexEntry) => void;
};

const InlineRow = ({ entry, index, isPending, onPlay, onOpenClip }: InlineRowProps) => {
  const reducedMotion = useReducedMotion();
  const quote = displayPullQuote(entry);

  const content = (
    <View style={[styles.row, isPending && styles.rowPending]}>
      <Pressable
        style={styles.rowMain}
        onPress={() => onOpenClip(entry)}
        accessibilityRole="button"
        accessibilityLabel={`Open ${entry.showName}: ${quote}`}
      >
        <Image source={entry.cover} style={styles.cover} accessibilityIgnoresInvertColors />
        <View style={styles.copy}>
          <Text style={styles.quote} numberOfLines={2}>
            {quote}
          </Text>
          <Text style={styles.show} numberOfLines={1}>
            {entry.showName}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.play}
        onPress={() => onPlay(entry)}
        accessibilityRole="button"
        accessibilityLabel={`Play clip from ${entry.showName}`}
      >
        <Ionicons name="play" size={12} color={t.text} />
      </Pressable>
    </View>
  );

  if (reducedMotion) {
    return content;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * searchMotion.rowStagger)
        .duration(searchMotion.transition)
        .easing(SEARCH_EASING)}
    >
      {content}
    </Animated.View>
  );
};

const ResultsCounter = ({
  count,
  showSeeAllHint,
  onSeeAll,
}: {
  count: number;
  showSeeAllHint: boolean;
  onSeeAll: () => void;
}) => {
  const label = count === 1 ? '1 result' : `${count} results`;

  return (
    <View style={styles.counter}>
      <Text style={styles.counterCount} accessibilityLiveRegion="polite">
        {label}
      </Text>
      {showSeeAllHint ? (
        <Pressable
          onPress={onSeeAll}
          accessibilityRole="button"
          accessibilityLabel="See all search results"
        >
          <Text style={styles.seeAll}>Press Enter to see all →</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export const InlineResults = ({
  matches,
  totalCount,
  isPending = false,
  query,
  onPlay,
  onOpenClip,
  onSeeAll,
}: InlineResultsProps) => {
  const hasQuery = query.trim().length > 0;

  const renderItem = useCallback(
    ({ item, index }: { item: SearchIndexEntry; index: number }) => (
      <InlineRow
        entry={item}
        index={index}
        isPending={isPending}
        onPlay={onPlay}
        onOpenClip={onOpenClip}
      />
    ),
    [isPending, onOpenClip, onPlay],
  );

  if (!hasQuery) {
    return null;
  }

  if (matches.length === 0) {
    if (isPending) {
      return (
        <View style={styles.busy} accessibilityLabel="Search suggestions" accessibilityState={{ busy: true }}>
          <ActivityIndicator color={t.textSecondary} />
        </View>
      );
    }
    if (totalCount === 0) {
      return (
        <View style={styles.container} accessibilityLabel="Search suggestions">
          <Text style={styles.empty}>
            No clips match yet — try a topic, show name, or speaker
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container} accessibilityLabel="Search suggestions">
      <FlatList
        data={matches}
        keyExtractor={(item) => item.feedEpisodeId}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <ResultsCounter
        count={totalCount}
        showSeeAllHint={totalCount > 10}
        onSeeAll={onSeeAll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  busy: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: t.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowPending: {
    opacity: 0.7,
  },
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 44,
  },
  cover: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  quote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 18,
    color: t.text,
  },
  show: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: t.textMuted,
  },
  play: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.surfaceAlt,
  },
  separator: {
    height: spacing.sm,
  },
  counter: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  counterCount: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: t.textMuted,
  },
  seeAll: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: t.primary,
  },
});
