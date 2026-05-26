import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FeedHeroCard } from '../components/feed/FeedHeroCard'
import { getEpisodeById } from '../components/feed/feedData'
import { useSavedClipsContext } from '../components/library/SavedClipsContext'
import SavedClipCard from '../components/library/SavedClipCard'
import { IconArrowLeft, IconCheck } from '../components/library/icons'
import {
  formatClipDuration,
  getClipsForShow,
  getLibraryShowById,
  getNextUpClipForShow,
} from '../components/library/libraryShowsData'
import { readFollowedShowIds, writeFollowedShowIds } from '../components/library/followShowsStorage'
import { ShowProfileSkeleton } from '../components/library/ShowProfileSkeleton'
import { useCoverTintHsl } from '../components/library/useCoverTintHsl'
import {
  markShowProfileOpenedFromLibrary,
  useShowProfileBack,
} from '../components/library/useShowProfileBack'
import type { ShowClip } from '../components/library/libraryShowsData'
import '../components/library/showProfile.css'

const CLIPS_PAGE_SIZE = 20

function clipBelongsToShow(episodeId: string, showId: string): boolean {
  return getEpisodeById(episodeId)?.showId === showId
}

export default function ShowProfile() {
  const { showId = '' } = useParams<{ showId: string }>()
  const navigate = useNavigate()
  const goBack = useShowProfileBack()
  const backRef = useRef<HTMLButtonElement>(null)
  const savedRailRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { clips: savedClips, onPlayClip, playMoment, removeClip } = useSavedClipsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(CLIPS_PAGE_SIZE)
  const [followedIds, setFollowedIds] = useState(() => readFollowedShowIds())

  const show = getLibraryShowById(showId)
  const coverTint = useCoverTintHsl(show?.coverSrc ?? '')
  const allClips = useMemo(() => (show ? getClipsForShow(show.id) : []), [show])
  const nextUp = show ? getNextUpClipForShow(show.id) : undefined
  const showSaves = useMemo(
    () =>
      savedClips.filter((clip) =>
        show ? clipBelongsToShow(clip.episodeId, show.id) : false,
      ),
    [savedClips, show],
  )
  const visibleClips = allClips.slice(0, visibleCount)
  const hasMore = visibleCount < allClips.length

  useEffect(() => {
    markShowProfileOpenedFromLibrary()
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [showId])

  useEffect(() => {
    backRef.current?.focus()
  }, [show])

  useEffect(() => {
    setVisibleCount(CLIPS_PAGE_SIZE)
  }, [showId])

  const toggleFollow = () => {
    setFollowedIds((prev) => {
      const next = new Set(prev)
      if (next.has(showId)) next.delete(showId)
      else next.add(showId)
      writeFollowedShowIds(next)
      return next
    })
  }

  const playClip = (clip: ShowClip) => {
    playMoment({
      episodeId: clip.episodeId,
      seekSeconds: clip.momentOffsetSeconds,
    })
  }

  if (isLoading) {
    return <ShowProfileSkeleton />
  }

  if (!show) {
    return (
      <div className="show-profile show-profile--error">
        <p className="show-profile__error-title">Couldn&apos;t load this show.</p>
        <button type="button" className="show-profile__error-back" onClick={() => navigate('/library')}>
          Back to Library
        </button>
      </div>
    )
  }

  const isFollowing = followedIds.has(show.id)
  const heroStyle = {
    '--cover-tint-hsl': coverTint,
  } as CSSProperties

  const heroEntrance = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }

  return (
    <div className="show-profile" style={heroStyle}>
      <div className="show-profile__hero">
        <div className="show-profile__hero-tint" aria-hidden />
        <button
          ref={backRef}
          type="button"
          className="show-profile__back"
          onClick={goBack}
          aria-label="Back to Library"
        >
          <IconArrowLeft />
        </button>
        <button
          type="button"
          className={`show-profile__follow${isFollowing ? ' show-profile__follow--active' : ''}`}
          onClick={toggleFollow}
          aria-pressed={isFollowing}
        >
          {isFollowing ? (
            <>
              <IconCheck />
              Following
            </>
          ) : (
            'Follow'
          )}
        </button>

        <motion.div
          className="show-profile__hero-inner"
          initial={heroEntrance.initial}
          animate={heroEntrance.animate}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={show.coverSrc}
            alt=""
            className="show-profile__hero-cover"
            width={200}
            height={200}
          />
          <div className="show-profile__hero-copy">
            <h1 className="show-profile__name">{show.name}</h1>
            <p className="show-profile__host">{show.hostName}</p>
          </div>
        </motion.div>
      </div>

      <div className="show-profile__body">
        {nextUp ? (
          <section className="show-profile__section" aria-labelledby="show-next-up-heading">
            <h2 id="show-next-up-heading" className="show-profile__section-title">
              Next up
            </h2>
            <FeedHeroCard
              coverSrc={nextUp.coverSrc}
              showName={show.name}
              title={nextUp.title}
              episodeTitle={nextUp.episodeTitle}
              durationLabel={formatClipDuration(nextUp.durationSeconds)}
              onPress={() => playClip(nextUp)}
            />
          </section>
        ) : null}

        <section className="show-profile__section" aria-labelledby="show-saves-heading">
          <h2 id="show-saves-heading" className="show-profile__section-title">
            Your saves from this show
          </h2>
          {showSaves.length === 0 ? (
            <p className="show-profile__inline-empty">Nothing saved from this show yet.</p>
          ) : (
            <div
              ref={savedRailRef}
              className="library-rail saved-rail show-profile__saved-rail"
              role="list"
              aria-label={`Saved clips from ${show.name}`}
            >
              {showSaves.map((clip) => (
                <div key={clip.id} role="listitem" className="saved-rail__item">
                  <SavedClipCard
                    clip={clip}
                    railRef={savedRailRef}
                    layout="rail"
                    onPlay={onPlayClip}
                    onUnsave={removeClip}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="show-profile__section" aria-labelledby="show-clips-heading">
          <h2 id="show-clips-heading" className="show-profile__section-title">
            All clips
          </h2>
          <ul className="show-profile__clip-list">
            {visibleClips.map((clip) => (
              <li key={clip.id}>
                <button
                  type="button"
                  className="show-profile__clip-row"
                  onClick={() => playClip(clip)}
                  aria-label={`Play ${clip.title} from ${clip.episodeTitle}`}
                >
                  <img
                    src={clip.coverSrc}
                    alt=""
                    className="show-profile__clip-art"
                    width={56}
                    height={56}
                  />
                  <span className="show-profile__clip-copy">
                    <span className="show-profile__clip-title">{clip.title}</span>
                    <span className="show-profile__clip-episode">{clip.episodeTitle}</span>
                  </span>
                  <span className="show-profile__clip-duration">
                    {formatClipDuration(clip.durationSeconds)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {hasMore ? (
            <button
              type="button"
              className="show-profile__load-more"
              onClick={() => setVisibleCount((count) => count + CLIPS_PAGE_SIZE)}
            >
              Load more
            </button>
          ) : null}
        </section>
      </div>
    </div>
  )
}
