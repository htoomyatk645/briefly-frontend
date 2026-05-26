import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { theme } from '@briefly/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MOOD_TILES } from '@/src/data/searchData';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, radius, spacing } from '@/src/theme';

import { coverTintBackground } from './coverTint';
import { HeroClipCard } from './HeroClipCard';
import { SEARCH_EASING, searchMotion } from './searchMotion';
import {
  clipMatchesForQuery,
  displayQueryLabel,
  filterClipsBySpeaker,
  peopleFromClips,
  pullQuoteForCard,
  showsForQuery,
  type SearchPersonChip,
  type SearchShowHit,
} from './searchResultsUtils';
import type { SearchIndexEntry } from './useSearchIndex';

const t = theme.dark;
const SHOW_CARD_WIDTH = 200;
const SHOW_SNAP_INTERVAL = SHOW_CARD_WIDTH + spacing.md;

type SearchResultsProps = {
  query: string;
  onPlayClip: (episodeId: string, seekSeconds?: number) => void;
  onBack: () => void;
  onMoodSelect?: (moodQuery: string) => void;
};

type ResultsSectionProps = {
  index: number;
  children: ReactNode;
};

const ResultsSection = ({ index, children }: ResultsSectionProps) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <View style={styles.section}>{children}</View>;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * searchMotion.sectionStagger)
        .duration(searchMotion.entrance)
        .easing(SEARCH_EASING)}
      style={styles.section}
    >
      {children}
    </Animated.View>
  );
};

const ClipTile = ({
  clip,
  onPlay,
}: {
  clip: SearchIndexEntry;
  onPlay: (clip: SearchIndexEntry) => void;
}) => {
  const quote = pullQuoteForCard(clip);
  const bg = coverTintBackground(clip.cover, 0.12);

  return (
    <View style={[styles.clipTile, { backgroundColor: bg }]}>
      <View style={styles.clipTileBody}>
        <Text style={styles.clipQuote} numberOfLines={4}>
          &ldquo;{quote}&rdquo;
        </Text>
        <Text style={styles.clipShow} numberOfLines={1}>
          {clip.showName}
        </Text>
      </View>
      <Pressable
        style={styles.clipPlay}
        onPress={() => onPlay(clip)}
        accessibilityRole="button"
        accessibilityLabel={`Play clip from ${clip.showName}`}
      >
        <Ionicons name="play" size={12} color={t.text} />
      </Pressable>
    </View>
  );
};

const ClipRow2Up = ({
  clips,
  loading,
  onPlay,
}: {
  clips: SearchIndexEntry[];
  loading: boolean;
  onPlay: (clip: SearchIndexEntry) => void;
}) => {
  if (loading) {
    return (
      <View style={styles.clipRow} accessibilityElementsHidden>
        <View style={[styles.clipTile, styles.skeleton]} />
        <View style={[styles.clipTile, styles.skeleton]} />
      </View>
    );
  }
  if (clips.length === 0) return null;

  return (
    <View style={styles.clipRow}>
      {clips.slice(0, 2).map((clip) => (
        <View key={clip.feedEpisodeId} style={styles.clipCell}>
          <ClipTile clip={clip} onPlay={onPlay} />
        </View>
      ))}
    </View>
  );
};

const ShowScrollerItem = ({
  show,
  onShowSelect,
}: {
  show: SearchShowHit;
  onShowSelect?: (showId: string) => void;
}) => (
  <Pressable
    style={styles.showItem}
    onPress={() => onShowSelect?.(show.showId)}
    accessibilityRole="button"
    accessibilityLabel={`${show.name}, ${show.episodeCountLabel}`}
  >
    <Image source={show.cover} style={styles.showCover} accessibilityIgnoresInvertColors />
    <Text style={styles.showName} numberOfLines={2}>
      {show.name}
    </Text>
    <Text style={styles.showMeta}>{show.episodeCountLabel}</Text>
  </Pressable>
);

const ShowsScroller = ({
  shows,
  loading,
  onShowSelect,
}: {
  shows: SearchShowHit[];
  loading: boolean;
  onShowSelect?: (showId: string) => void;
}) => {
  const { width } = useWindowDimensions();

  const renderItem: ListRenderItem<SearchShowHit | 'skeleton'> = ({ item }) => {
    if (item === 'skeleton') {
      return <View style={[styles.showItem, styles.skeleton]} />;
    }
    return <ShowScrollerItem show={item} onShowSelect={onShowSelect} />;
  };

  if (!loading && shows.length === 0) return null;

  const data: (SearchShowHit | 'skeleton')[] = loading
    ? Array.from({ length: 4 }, () => 'skeleton' as const)
    : shows;

  return (
    <View>
      <Text style={styles.showsLabel}>Also in shows</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) =>
          item === 'skeleton' ? `sk-${index}` : item.showId
        }
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SHOW_SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={[
          styles.showsTrack,
          { paddingRight: width - SHOW_SNAP_INTERVAL },
        ]}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      />
    </View>
  );
};

function personInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

const PeopleChipRow = ({
  people,
  activeSpeakerId,
  onSelect,
}: {
  people: SearchPersonChip[];
  activeSpeakerId: string | null;
  onSelect: (speakerId: string | null) => void;
}) => {
  if (people.length === 0) return null;

  return (
    <View accessibilityLabel="People mentioned">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.peopleTrack}>
        {people.map((person) => {
          const isActive = activeSpeakerId === person.id;
          return (
            <Pressable
              key={person.id}
              style={[styles.personChip, isActive && styles.personChipActive]}
              onPress={() => onSelect(isActive ? null : person.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={person.name}
            >
              <View style={[styles.personAvatarWrap, { backgroundColor: t.surfaceAlt }]}>
                <Text style={styles.personFallback}>{personInitials(person.name)}</Text>
              </View>
              <Text style={styles.personName} numberOfLines={1}>
                {person.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const MoodTileCompact = ({
  label,
  moodQuery,
  cover,
  onSelect,
}: {
  label: string;
  moodQuery: string;
  cover: SearchIndexEntry['cover'];
  onSelect: (q: string) => void;
}) => (
  <Pressable
    style={[styles.moodCompact, { backgroundColor: coverTintBackground(cover, 0.14) }]}
    onPress={() => onSelect(moodQuery)}
    accessibilityRole="button"
    accessibilityLabel={`Browse mood: ${label}`}
  >
    <Text style={styles.moodCompactLabel}>{label}</Text>
  </Pressable>
);

export const SearchResults = ({
  query,
  onPlayClip,
  onBack,
  onMoodSelect,
}: SearchResultsProps) => {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);

  const allClips = useMemo(() => clipMatchesForQuery(query), [query]);
  const filteredClips = useMemo(
    () => filterClipsBySpeaker(allClips, activeSpeakerId),
    [allClips, activeSpeakerId],
  );
  const heroClip = filteredClips[0];
  const rowClips = filteredClips.slice(1, 3);
  const shows = useMemo(() => showsForQuery(query, allClips), [query, allClips]);
  const people = useMemo(() => peopleFromClips(allClips), [allClips]);
  const label = displayQueryLabel(query);
  const suggestedMoods = MOOD_TILES.slice(0, 3);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, [query]);

  useEffect(() => {
    setActiveSpeakerId(null);
  }, [query]);

  const handlePlay = useCallback(
    (clip: SearchIndexEntry) => {
      onPlayClip(clip.feedEpisodeId, clip.startSeconds);
    },
    [onPlayClip],
  );

  const clipBlock = (
    <>
      <HeroClipCard clip={heroClip} loading={isLoading} onPlay={handlePlay} />
      <ClipRow2Up clips={rowClips} loading={isLoading} onPlay={handlePlay} />
    </>
  );

  if (!isLoading && allClips.length === 0) {
    return (
      <ScrollView
        style={styles.page}
        contentContainerStyle={[
          styles.pageContent,
          { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xxl },
        ]}
      >
        <Pressable
          style={styles.back}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back to search"
        >
          <Ionicons name="chevron-back" size={22} color={t.textSecondary} />
          <Text style={styles.backLabel}>Search</Text>
        </Pressable>
        <View style={styles.resultsEmpty} accessibilityRole="text">
          <Text style={styles.resultsEmptyTitle}>Nothing for &lsquo;{label}&rsquo; yet</Text>
          <Text style={styles.resultsEmptyBody}>
            Try a topic, show name, or someone you&apos;d want to hear from.
          </Text>
          <View style={styles.moodSuggestions}>
            {suggestedMoods.map((mood) => (
              <MoodTileCompact
                key={mood.id}
                label={mood.label}
                moodQuery={mood.moodQuery}
                cover={mood.cover}
                onSelect={onMoodSelect ?? (() => {})}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  let sectionIndex = 0;

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={[
        styles.pageContent,
        { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        style={styles.back}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back to search"
      >
        <Ionicons name="chevron-back" size={22} color={t.textSecondary} />
        <Text style={styles.backLabel}>Search</Text>
      </Pressable>

      <ResultsSection index={sectionIndex++}>
        {reducedMotion ? (
          <View style={styles.clipsInner}>{clipBlock}</View>
        ) : (
          <Animated.View
            key={activeSpeakerId ?? 'all'}
            entering={FadeIn.duration(searchMotion.clipCrossfade).easing(SEARCH_EASING)}
            exiting={FadeOut.duration(searchMotion.clipCrossfade).easing(SEARCH_EASING)}
            style={styles.clipsInner}
          >
            {clipBlock}
          </Animated.View>
        )}
      </ResultsSection>

      <ResultsSection index={sectionIndex++}>
        <ShowsScroller shows={shows} loading={isLoading} />
      </ResultsSection>

      {!isLoading && people.length > 0 ? (
        <ResultsSection index={sectionIndex}>
          <PeopleChipRow
            people={people}
            activeSpeakerId={activeSpeakerId}
            onSelect={setActiveSpeakerId}
          />
        </ResultsSection>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: t.bg,
  },
  pageContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xxl,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 44,
    marginBottom: spacing.sm,
  },
  backLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: t.textSecondary,
  },
  section: {
    gap: spacing.lg,
  },
  clipsInner: {
    gap: spacing.lg,
  },
  clipRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  clipCell: {
    flex: 1,
  },
  clipTile: {
    borderRadius: radius.cardSm,
    minHeight: 160,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  clipTileBody: {
    flex: 1,
    gap: spacing.sm,
  },
  clipQuote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    color: t.text,
  },
  clipShow: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: t.textMuted,
  },
  clipPlay: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: t.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeleton: {
    backgroundColor: t.surfaceAlt,
    opacity: 0.6,
  },
  showsLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: t.textSecondary,
    marginBottom: spacing.md,
  },
  showsTrack: {
    paddingLeft: 0,
  },
  showItem: {
    width: SHOW_CARD_WIDTH,
    gap: spacing.sm,
  },
  showCover: {
    width: 88,
    height: 88,
    borderRadius: 6,
  },
  showName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: t.text,
  },
  showMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: t.textMuted,
  },
  peopleTrack: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  personChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: t.border,
    backgroundColor: t.surface,
    maxWidth: 200,
  },
  personChipActive: {
    borderColor: t.primary,
    backgroundColor: t.primarySoft,
  },
  personAvatarWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personFallback: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 9,
    color: t.textMuted,
  },
  personName: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: t.text,
    flexShrink: 1,
  },
  resultsEmpty: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  resultsEmptyTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 30,
    color: t.text,
  },
  resultsEmptyBody: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: t.textSecondary,
  },
  moodSuggestions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  moodCompact: {
    padding: spacing.lg,
    borderRadius: radius.cardSm,
    minHeight: 56,
    justifyContent: 'center',
  },
  moodCompactLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: t.text,
  },
});
