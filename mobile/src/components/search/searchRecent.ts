import AsyncStorage from '@react-native-async-storage/async-storage';

export const SEARCH_RECENT_STORAGE_KEY = 'briefly:search:recent';
export const SEARCH_RECENT_MAX = 5;

export async function readRecentSearches(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(SEARCH_RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .slice(0, SEARCH_RECENT_MAX);
  } catch {
    return [];
  }
}

export async function writeRecentSearches(queries: string[]): Promise<void> {
  const trimmed = queries
    .map((q) => q.trim())
    .filter(Boolean)
    .slice(0, SEARCH_RECENT_MAX);
  await AsyncStorage.setItem(SEARCH_RECENT_STORAGE_KEY, JSON.stringify(trimmed));
}

export async function addRecentSearch(query: string): Promise<void> {
  const trimmed = query.trim();
  if (!trimmed) return;
  const existing = await readRecentSearches();
  const next = [trimmed, ...existing.filter((item) => item !== trimmed)].slice(0, SEARCH_RECENT_MAX);
  await writeRecentSearches(next);
}

export async function removeRecentSearch(query: string): Promise<void> {
  const next = (await readRecentSearches()).filter((item) => item !== query);
  await writeRecentSearches(next);
}

export async function clearRecentSearches(): Promise<void> {
  await AsyncStorage.removeItem(SEARCH_RECENT_STORAGE_KEY);
}
