import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { getEpisodeById } from '../feed/feedData'
import { pullQuoteForCard } from './searchResultsUtils'
import { useSearchCoverTintStyle } from './searchCoverTint'
import { SearchHeroPreviewAudio } from './searchHeroPreviewAudio'
import type { SearchIndexEntry } from './useSearchIndex'

export type HeroClipCardProps = {
  clip?: SearchIndexEntry
  loading?: boolean
  onPlay: (clip: SearchIndexEntry) => void
}

const PlayIcon = () => (
  <svg className="search-hero-clip__play-icon" viewBox="0 0 24 24" aria-hidden>
    <path d="M8 5.2v13.6L19 12 8 5.2z" fill="currentColor" />
  </svg>
)

export function HeroClipCard({ clip, loading = false, onPlay }: HeroClipCardProps) {
  const ref = useRef<HTMLElement>(null)
  const audioRef = useRef<SearchHeroPreviewAudio | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, {
    amount: 0.6,
    once: true,
    margin: '-8% 0px',
  })

  const tintStyle = useSearchCoverTintStyle(clip?.coverSrc ?? '')

  useEffect(() => {
    audioRef.current = new SearchHeroPreviewAudio()
    return () => {
      audioRef.current?.dispose()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (loading || !clip || prefersReducedMotion || !isInView) {
      void audioRef.current?.stop()
      return
    }

    const episode = getEpisodeById(clip.feedEpisodeId)
    const offset = clip.startSeconds ?? episode?.startSeconds ?? 0
    const duration = episode?.durationSeconds ?? 20 * 60

    void audioRef.current?.play(clip.feedEpisodeId, offset, duration)

    return () => {
      void audioRef.current?.stop()
    }
  }, [clip, isInView, loading, prefersReducedMotion])

  if (loading) {
    return (
      <article
        className="search-hero-clip search-hero-clip--skeleton"
        aria-hidden
      />
    )
  }

  if (!clip) {
    return null
  }

  const quote = pullQuoteForCard(clip)

  return (
    <article
      ref={ref}
      className="search-hero-clip"
      style={tintStyle}
      aria-label={`${clip.showName}: ${quote}`}
    >
      <div className="search-hero-clip__inner">
        <blockquote className="search-hero-clip__quote">{quote}</blockquote>
        <p className="search-hero-clip__speaker">{clip.speakerName}</p>
        <p className="search-hero-clip__show">{clip.showName}</p>
        <button
          type="button"
          className="search-hero-clip__play"
          onClick={() => onPlay(clip)}
          aria-label={`Play clip from ${clip.showName}`}
        >
          <PlayIcon />
        </button>
      </div>
    </article>
  )
}
