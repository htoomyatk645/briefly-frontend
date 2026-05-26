import { FEED_QUEUE } from '../feed/feedData'
import { PLAYER_EPISODES, PODCAST_COVERS } from '../../data/podcastCatalog'

export type LibraryShow = {
  id: string
  name: string
  hostName: string
  description: string
  coverSrc: string
}

export type ShowClip = {
  id: string
  showId: string
  episodeId: string
  title: string
  episodeTitle: string
  coverSrc: string
  durationSeconds: number
  momentOffsetSeconds: number
  listened: boolean
}

export const LIBRARY_SHOWS: LibraryShow[] = [
  {
    id: 'show-huberman',
    name: PLAYER_EPISODES.huberman.showName,
    hostName: 'Andrew Huberman, Ph.D.',
    description: 'Neuroscience tools for everyday life.',
    coverSrc: PODCAST_COVERS.huberman,
  },
  {
    id: 'show-wsj',
    name: PLAYER_EPISODES.wsj.showName,
    hostName: 'WSJ Podcasts',
    description: 'Tech and markets in ten minutes.',
    coverSrc: PODCAST_COVERS.wsj,
  },
  {
    id: 'show-fa',
    name: PLAYER_EPISODES.foreignAffairs.showName,
    hostName: 'Foreign Affairs',
    description: 'Ideas that shape global policy.',
    coverSrc: PODCAST_COVERS.foreignAffairs,
  },
  {
    id: 'show-jay',
    name: PLAYER_EPISODES.jayShetty.showName,
    hostName: 'Jay Shetty',
    description: 'Wisdom for a purposeful life.',
    coverSrc: PODCAST_COVERS.jayShetty,
  },
  {
    id: 'show-daily',
    name: 'The Daily',
    hostName: 'Michael Barbaro',
    description: 'One story, deeply reported.',
    coverSrc: PODCAST_COVERS.theDaily,
  },
  {
    id: 'show-acquired',
    name: 'Acquired',
    hostName: 'Ben Gilbert and David Rosenthal',
    description: 'How great companies are built.',
    coverSrc: PODCAST_COVERS.acquired,
  },
  {
    id: 'show-revisionist',
    name: 'Revisionist History',
    hostName: 'Malcolm Gladwell',
    description: 'Re-examining the overlooked.',
    coverSrc: PODCAST_COVERS.revisionistHistory,
  },
  {
    id: 'show-hardfork',
    name: 'Hard Fork',
    hostName: 'Kevin Roose and Casey Newton',
    description: 'Tech, power, and the future.',
    coverSrc: PODCAST_COVERS.hardFork,
  },
  {
    id: 'show-hibt',
    name: 'How I Built This',
    hostName: 'Guy Raz',
    description: 'Founders on the moments that mattered.',
    coverSrc: PODCAST_COVERS.howIBuiltThis,
  },
  {
    id: 'show-invisible',
    name: '99% Invisible',
    hostName: 'Roman Mars',
    description: 'Design is everywhere.',
    coverSrc: PODCAST_COVERS.invisible,
  },
  {
    id: 'show-ezra',
    name: 'The Ezra Klein Show',
    hostName: 'Ezra Klein',
    description: 'Big ideas, clearly argued.',
    coverSrc: PODCAST_COVERS.ezraKlein,
  },
  {
    id: 'show-radiolab',
    name: 'Radiolab',
    hostName: 'WNYC Studios',
    description: 'Science meets storytelling.',
    coverSrc: PODCAST_COVERS.radiolab,
  },
  {
    id: 'show-planet-money',
    name: 'Planet Money',
    hostName: 'NPR',
    description: 'The economy, explained.',
    coverSrc: PODCAST_COVERS.planetMoney,
  },
  {
    id: 'show-smartless',
    name: 'SmartLess',
    hostName: 'Jason Bateman, Sean Hayes, Will Arnett',
    description: 'Surprise guests, loose conversation.',
    coverSrc: PODCAST_COVERS.smartLess,
  },
  {
    id: 'show-darknet',
    name: 'Darknet Diaries',
    hostName: 'Jack Rhysider',
    description: 'True stories from the dark side of the internet.',
    coverSrc: PODCAST_COVERS.darknetDiaries,
  },
]

const SHOW_CLIP_SEEDS: Omit<ShowClip, 'listened'>[] = [
  {
    id: 'clip-huberman-sleep',
    showId: 'show-huberman',
    episodeId: 'feed-huberman',
    title: 'Protect the first ninety minutes of sleep',
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    coverSrc: PODCAST_COVERS.huberman,
    durationSeconds: 8 * 60 + 40,
    momentOffsetSeconds: 12 * 60 + 39,
  },
  {
    id: 'clip-huberman-light',
    showId: 'show-huberman',
    episodeId: 'feed-huberman',
    title: 'Morning light resets cortisol',
    episodeTitle: 'Light exposure and circadian rhythm',
    coverSrc: PODCAST_COVERS.huberman,
    durationSeconds: 6 * 60 + 15,
    momentOffsetSeconds: 6 * 60 + 20,
  },
  {
    id: 'clip-wsj-svb',
    showId: 'show-wsj',
    episodeId: 'feed-wsj',
    title: 'Contagion risk before markets opened',
    episodeTitle: PLAYER_EPISODES.wsj.episodeTitle,
    coverSrc: PODCAST_COVERS.wsj,
    durationSeconds: 5 * 60 + 30,
    momentOffsetSeconds: 4 * 60 + 12,
  },
  {
    id: 'clip-fa-realism',
    showId: 'show-fa',
    episodeId: 'feed-fa',
    title: 'Why realist leaders fail',
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    coverSrc: PODCAST_COVERS.foreignAffairs,
    durationSeconds: 9 * 60 + 10,
    momentOffsetSeconds: 18 * 60 + 5,
  },
  {
    id: 'clip-jay-meditation',
    showId: 'show-jay',
    episodeId: 'feed-jay',
    title: 'Meditate at sunrise',
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    coverSrc: PODCAST_COVERS.jayShetty,
    durationSeconds: 7 * 60 + 45,
    momentOffsetSeconds: 9 * 60 + 48,
  },
]

function buildShowClips(): ShowClip[] {
  const fromFeed: ShowClip[] = FEED_QUEUE.map((episode, index) => ({
    id: `clip-${episode.id}`,
    showId: episode.showId,
    episodeId: episode.id,
    title: episode.episodeTitle.split(':').pop()?.trim() ?? episode.episodeTitle,
    episodeTitle: episode.episodeTitle,
    coverSrc: episode.coverSrc,
    durationSeconds: Math.min(episode.durationSeconds, 12 * 60),
    momentOffsetSeconds: episode.startSeconds ?? index * 90,
    listened: index % 2 === 0,
  }))

  const extra = SHOW_CLIP_SEEDS.map((clip, index) => ({
    ...clip,
    listened: index % 3 === 0,
  }))

  return [...extra, ...fromFeed]
}

export const SHOW_CLIPS = buildShowClips()

export const SHOWS_GRID_PREVIEW = 12

export function getLibraryShowById(showId: string): LibraryShow | undefined {
  return LIBRARY_SHOWS.find((show) => show.id === showId)
}

export function getClipsForShow(showId: string): ShowClip[] {
  return SHOW_CLIPS.filter((clip) => clip.showId === showId)
}

export function getNextUpClipForShow(showId: string): ShowClip | undefined {
  return getClipsForShow(showId).find((clip) => !clip.listened)
}

export function formatClipDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
