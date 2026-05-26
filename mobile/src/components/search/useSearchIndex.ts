import { useEffect, useMemo, useState } from 'react';

import {
  SEARCH_CLIP_METADATA,
  type SearchClipMetadata,
} from '@/src/data/searchClipMetadata';
import { SEARCH_FEED_QUEUE } from '@/src/data/searchFeed';

export type SearchIndexEntry = SearchClipMetadata & {
  searchableText: string;
};

const INLINE_PREVIEW_LIMIT = 3;

function buildSearchableText(clip: SearchClipMetadata): string {
  const parts = [
    clip.showName,
    clip.episodeTitle,
    clip.speakerName,
    clip.pullQuote ?? '',
    ...clip.topicTags,
  ];
  return parts.join(' ').toLowerCase();
}

function mergeFeedTiming(entry: SearchIndexEntry): SearchIndexEntry {
  const feed = SEARCH_FEED_QUEUE.find((ep) => ep.id === entry.feedEpisodeId);
  if (!feed) return entry;
  return {
    ...entry,
    cover: entry.cover ?? feed.cover,
    startSeconds: entry.startSeconds ?? feed.startSeconds,
  };
}

function buildSearchIndex(): SearchIndexEntry[] {
  const byFeedId = new Map<string, SearchIndexEntry>();

  for (const clip of SEARCH_CLIP_METADATA) {
    const searchableText = buildSearchableText(clip);
    const merged = mergeFeedTiming({ ...clip, searchableText });
    const existing = byFeedId.get(merged.feedEpisodeId);
    if (!existing) {
      byFeedId.set(merged.feedEpisodeId, merged);
      continue;
    }
    const combinedTags = [...new Set([...existing.topicTags, ...merged.topicTags])];
    byFeedId.set(merged.feedEpisodeId, {
      ...existing,
      topicTags: combinedTags,
      searchableText: buildSearchableText({
        ...existing,
        topicTags: combinedTags,
      }),
      pullQuote: existing.pullQuote ?? merged.pullQuote,
    });
  }

  return Array.from(byFeedId.values());
}

const SEARCH_INDEX = buildSearchIndex();

export function searchClips(query: string): SearchIndexEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return SEARCH_INDEX.filter((entry) => entry.searchableText.includes(normalized));
}

function useDebouncedValue(value: string, delayMs: number): string {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
}

export function useDebouncedClipSearch(query: string, debounceMs = 120) {
  const trimmed = query.trim();
  const debouncedQuery = useDebouncedValue(trimmed, debounceMs);
  const isPending = trimmed !== debouncedQuery;

  const allMatches = useMemo(() => searchClips(debouncedQuery), [debouncedQuery]);

  const previewMatches = useMemo(
    () => allMatches.slice(0, INLINE_PREVIEW_LIMIT),
    [allMatches],
  );

  return {
    isPending,
    totalCount: allMatches.length,
    previewMatches,
    debouncedQuery,
  };
}

export function truncatePullQuote(text: string, maxLength = 60): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}

export function displayPullQuote(entry: SearchIndexEntry): string {
  const source = entry.pullQuote ?? entry.episodeTitle;
  return truncatePullQuote(source, 60);
}
