import { PLAYER_EPISODES } from '../../data/podcastCatalog'
import type { SavedClip } from './savedClipsTypes'

const SAVED_CLIPS_KEY = 'briefly-saved-clips-v1'

const SEED_CLIPS: SavedClip[] = [
  {
    id: 'save-huberman-sleep',
    episodeId: 'feed-huberman',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    coverSrc: PLAYER_EPISODES.huberman.coverSrc,
    sentenceBefore:
      'The single most important thing you can do for focus tomorrow is protect the first ninety minutes of sleep tonight.',
    clipProgress: 0.42,
    momentOffsetSeconds: 12 * 60 + 39,
    savedAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
  },
  {
    id: 'save-wsj-svb',
    episodeId: 'feed-wsj',
    showName: PLAYER_EPISODES.wsj.showName,
    episodeTitle: PLAYER_EPISODES.wsj.episodeTitle,
    coverSrc: PLAYER_EPISODES.wsj.coverSrc,
    sentenceBefore:
      'Regulators moved before markets opened because contagion risk was no longer theoretical.',
    clipProgress: 0.18,
    momentOffsetSeconds: 4 * 60 + 12,
    savedAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
  {
    id: 'save-fa-realism',
    episodeId: 'feed-fa',
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    coverSrc: PLAYER_EPISODES.foreignAffairs.coverSrc,
    sentenceBefore:
      'Realist leaders fail not from lack of vision but from misreading what their rivals are willing to bear.',
    clipProgress: 0.61,
    momentOffsetSeconds: 18 * 60 + 5,
    savedAt: new Date(Date.now() - 5 * 86_400_000).toISOString(),
  },
  {
    id: 'save-jay-meditation',
    episodeId: 'feed-jay',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    coverSrc: PLAYER_EPISODES.jayShetty.coverSrc,
    sentenceBefore:
      'Monks meditate at sunrise because the mind is least defended when the day has not yet made demands.',
    clipProgress: 0.33,
    momentOffsetSeconds: 9 * 60 + 48,
    savedAt: new Date(Date.now() - 8 * 86_400_000).toISOString(),
  },
  {
    id: 'save-huberman-light',
    episodeId: 'feed-huberman',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: 'Light exposure resets cortisol faster than caffeine',
    coverSrc: PLAYER_EPISODES.huberman.coverSrc,
    sentenceBefore:
      'Ten minutes of outdoor light within an hour of waking shifts your clock more reliably than any supplement stack.',
    clipProgress: 0.55,
    momentOffsetSeconds: 6 * 60 + 20,
    savedAt: new Date(Date.now() - 12 * 86_400_000).toISOString(),
  },
  {
    id: 'save-wsj-rates',
    episodeId: 'feed-wsj',
    showName: PLAYER_EPISODES.wsj.showName,
    episodeTitle: 'Why the Fed paused — and what it signals for Q3',
    coverSrc: PLAYER_EPISODES.wsj.coverSrc,
    sentenceBefore:
      'Markets priced a cut in September; the transcript suggests policymakers are still arguing about the word patient.',
    clipProgress: 0.27,
    momentOffsetSeconds: 2 * 60 + 40,
    savedAt: new Date(Date.now() - 14 * 86_400_000).toISOString(),
  },
  {
    id: 'save-fa-ukraine',
    episodeId: 'feed-fa',
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    episodeTitle: 'Escalation ladders are easier to climb than to descend',
    coverSrc: PLAYER_EPISODES.foreignAffairs.coverSrc,
    sentenceBefore:
      'Every party in the conflict believes time is on their side — that assumption is what makes de-escalation so rare.',
    clipProgress: 0.74,
    momentOffsetSeconds: 24 * 60 + 10,
    savedAt: new Date(Date.now() - 21 * 86_400_000).toISOString(),
  },
  {
    id: 'save-jay-habits',
    episodeId: 'feed-jay',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: 'The two-minute rule for habits that actually stick',
    coverSrc: PLAYER_EPISODES.jayShetty.coverSrc,
    sentenceBefore:
      'If you cannot do the habit in two minutes, you are still designing for the person you wish you were.',
    clipProgress: 0.48,
    momentOffsetSeconds: 14 * 60 + 2,
    savedAt: new Date(Date.now() - 28 * 86_400_000).toISOString(),
  },
]

function parseStored(raw: string | null): SavedClip[] | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as SavedClip[]
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function readSavedClips(): SavedClip[] {
  if (typeof window === 'undefined') return SEED_CLIPS
  const stored = parseStored(window.localStorage.getItem(SAVED_CLIPS_KEY))
  if (stored && stored.length > 0) return stored
  writeSavedClips(SEED_CLIPS)
  return SEED_CLIPS
}

export function writeSavedClips(clips: SavedClip[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SAVED_CLIPS_KEY, JSON.stringify(clips))
}

export const SAVED_RAIL_LIMIT = 8

export function sortSavedClipsNewest(clips: SavedClip[]): SavedClip[] {
  return [...clips].sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  )
}
