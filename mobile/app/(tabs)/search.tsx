import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { theme } from '@briefly/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InlineResults } from '@/src/components/search/InlineResults';
import { SearchEmpty } from '@/src/components/search/SearchEmpty';
import { SearchInput } from '@/src/components/search/SearchInput';
import {
  addRecentSearch,
  clearRecentSearches,
  readRecentSearches,
  removeRecentSearch,
} from '@/src/components/search/searchRecent';
import { useDebouncedClipSearch, type SearchIndexEntry } from '@/src/components/search/useSearchIndex';
import { spacing } from '@/src/theme';

const t = theme.dark;

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isTyping = query.trim().length > 0;
  const { previewMatches, totalCount, isPending } = useDebouncedClipSearch(query, 120);

  useEffect(() => {
    readRecentSearches().then(setRecentQueries);
    const frame = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  const commitQuery = useCallback(
    async (raw: string, options?: { fromMic?: boolean }) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      await addRecentSearch(trimmed);
      setRecentQueries(await readRecentSearches());
      const params: { q: string; from?: string } = { q: trimmed };
      if (options?.fromMic) {
        params.from = 'mic';
      }
      router.push({
        pathname: '/search/results',
        params,
      });
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    void commitQuery(query);
  }, [commitQuery, query]);

  const handleVoiceCommit = useCallback(
    (transcript: string) => {
      void commitQuery(transcript, { fromMic: true });
    },
    [commitQuery],
  );

  const handleRecentSelect = useCallback(
    (value: string) => {
      setQuery(value);
      void commitQuery(value);
    },
    [commitQuery],
  );

  const handleRecentRemove = useCallback(async (value: string) => {
    await removeRecentSearch(value);
    setRecentQueries(await readRecentSearches());
  }, []);

  const handleRecentClearAll = useCallback(async () => {
    await clearRecentSearches();
    setRecentQueries([]);
  }, []);

  const handleTrendingSelect = useCallback(
    (value: string) => {
      setQuery(value);
      void commitQuery(value);
    },
    [commitQuery],
  );

  const handleMoodSelect = useCallback(
    (moodQuery: string) => {
      void commitQuery(moodQuery);
    },
    [commitQuery],
  );

  const handlePlayClip = useCallback((entry: SearchIndexEntry) => {
    router.push('/(tabs)/now-playing');
  }, []);

  const handleOpenClip = useCallback((entry: SearchIndexEntry) => {
    router.push('/(tabs)/now-playing');
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + 96,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SearchInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          onVoiceCommit={handleVoiceCommit}
        />
        {isTyping ? (
          <InlineResults
            matches={previewMatches}
            totalCount={totalCount}
            isPending={isPending}
            query={query}
            onPlay={handlePlayClip}
            onOpenClip={handleOpenClip}
            onSeeAll={handleSubmit}
          />
        ) : null}
        <SearchEmpty
          recentQueries={recentQueries}
          loading={isLoading}
          isTyping={isTyping}
          onRecentSelect={handleRecentSelect}
          onRecentRemove={(value) => void handleRecentRemove(value)}
          onRecentClearAll={() => void handleRecentClearAll()}
          onTrendingSelect={handleTrendingSelect}
          onMoodSelect={handleMoodSelect}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: t.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
});
