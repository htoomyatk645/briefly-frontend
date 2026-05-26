import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { SearchResults } from '@/src/components/search/SearchResults';
import { addRecentSearch } from '@/src/components/search/searchRecent';

export default function SearchResultsScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = typeof q === 'string' ? q : Array.isArray(q) ? (q[0] ?? '') : '';

  useEffect(() => {
    if (query.trim()) {
      void addRecentSearch(query);
    }
  }, [query]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/search');
    }
  }, []);

  const handlePlayClip = useCallback((_episodeId: string, _seekSeconds?: number) => {
    router.push('/(tabs)/now-playing');
  }, []);

  const handleMoodSelect = useCallback((moodQuery: string) => {
    router.replace({ pathname: '/search/results', params: { q: moodQuery } });
  }, []);

  return (
    <SearchResults
      query={query}
      onPlayClip={handlePlayClip}
      onBack={handleBack}
      onMoodSelect={handleMoodSelect}
    />
  );
}
