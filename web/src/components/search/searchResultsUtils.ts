import { FEED_QUEUE } from '../feed/feedData'
import { LIBRARY_SHOWS } from '../library/libraryShowsData'
import { MOOD_TILES } from '../../data/searchData'
import { searchClips, type SearchIndexEntry } from './useSearchIndex'

const MOOD_SEARCH_TERMS: Record<string, string> = {
  'mood:sharpen-thinking': 'thinking history policy realism',
  'mood:make-me-laugh': 'laugh comedy smartless humor',
  'mood:wind-down': 'meditation mindfulness sleep calm',
  'mood:catch-up-week': 'news daily week federal economy',
}

export function normalizeSearchQuery(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.startsWith('mood:')) {
    return MOOD_SEARCH_TERMS[trimmed] ?? trimmed.replace(/^mood:/, '').replace(/-/g, ' ')
  }
  return trimmed
}

export function displayQueryLabel(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('mood:')) return trimmed
  const mood = MOOD_TILES.find((tile) => tile.moodQuery === trimmed)
  return mood?.label ?? trimmed.replace(/^mood:/, '').replace(/-/g, ' ')
}

export function clipMatchesForQuery(raw: string): SearchIndexEntry[] {
  const normalized = normalizeSearchQuery(raw)
  if (!normalized) return []
  return searchClips(normalized)
}

export type SearchShowHit = {
  showId: string
  name: string
  coverSrc: string
  episodeCountLabel: string
}

export function showsForQuery(raw: string, clips: SearchIndexEntry[]): SearchShowHit[] {
  const needle = normalizeSearchQuery(raw).toLowerCase()
  const clipShowIds = new Set(
    clips.map((clip) => FEED_QUEUE.find((ep) => ep.id === clip.feedEpisodeId)?.showId).filter(Boolean),
  )

  const hits = LIBRARY_SHOWS.filter((show) => {
    const haystack = `${show.name} ${show.hostName} ${show.description}`.toLowerCase()
    return needle.length === 0 || haystack.includes(needle) || clipShowIds.has(show.id)
  })

  return hits.map((show) => {
    const episodeCount = FEED_QUEUE.filter((ep) => ep.showId === show.id).length
    const clipCount = clips.filter(
      (clip) => FEED_QUEUE.find((ep) => ep.id === clip.feedEpisodeId)?.showId === show.id,
    ).length
    const count = Math.max(episodeCount, clipCount, 1)
    return {
      showId: show.id,
      name: show.name,
      coverSrc: show.coverSrc,
      episodeCountLabel: count === 1 ? '1 episode' : `${count} episodes`,
    }
  })
}

export type SearchPersonChip = {
  id: string
  name: string
  avatarSrc: string
}

function speakerKey(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

export function peopleFromClips(clips: SearchIndexEntry[]): SearchPersonChip[] {
  const map = new Map<string, SearchPersonChip>()
  for (const clip of clips) {
    const key = speakerKey(clip.speakerName)
    if (map.has(key)) continue
    map.set(key, {
      id: key,
      name: clip.speakerName,
      avatarSrc: clip.coverSrc,
    })
  }
  return Array.from(map.values())
}

export function filterClipsBySpeaker(
  clips: SearchIndexEntry[],
  speakerId: string | null,
): SearchIndexEntry[] {
  if (!speakerId) return clips
  return clips.filter((clip) => speakerKey(clip.speakerName) === speakerId)
}

export function pullQuoteForCard(entry: SearchIndexEntry): string {
  return entry.pullQuote ?? entry.episodeTitle
}
