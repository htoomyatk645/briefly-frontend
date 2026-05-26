import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { IconClose } from './icons'
import { SkeletonShimmer } from './SkeletonShimmer'
import { TuneTopicRow } from './TuneTopicRow'
import { useTuneFeedPreferences } from './TuneFeedPreferencesContext'

export type TuneFeedContentProps = {
  titleId?: string
  showBack?: boolean
  onBack?: () => void
  autoFocusTitle?: boolean
}

export function TuneFeedContent({
  titleId: titleIdProp,
  showBack,
  onBack,
  autoFocusTitle = true,
}: TuneFeedContentProps) {
  const autoId = useId()
  const titleId = titleIdProp ?? `tune-feed-title-${autoId}`
  const titleRef = useRef<HTMLHeadingElement>(null)
  const backRef = useRef<HTMLButtonElement>(null)
  const resetDialogRef = useRef<HTMLDialogElement>(null)
  const {
    isLoading,
    preferences,
    topics,
    setTopicLevel,
    unmuteTopic,
    unmuteShow,
    resetToDefaults,
  } = useTuneFeedPreferences()

  const [exitingMutedKeys, setExitingMutedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isLoading) return
    if (showBack) {
      backRef.current?.focus()
      return
    }
    if (autoFocusTitle) {
      titleRef.current?.focus()
    }
  }, [autoFocusTitle, isLoading, showBack])

  const handleResetClick = () => {
    resetDialogRef.current?.showModal()
  }

  const handleResetConfirm = () => {
    resetToDefaults()
    resetDialogRef.current?.close()
  }

  const beginUnmute = (key: string, remove: () => void) => {
    setExitingMutedKeys((prev) => new Set(prev).add(key))
    window.setTimeout(() => {
      remove()
      setExitingMutedKeys((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }, 220)
  }

  if (isLoading) {
    return (
      <div className="tune-feed-content tune-feed-content--loading" aria-busy="true">
        <SkeletonShimmer className="tune-feed-content__title-skeleton" />
        <SkeletonShimmer className="tune-feed-content__subtitle-skeleton" />
        <div className="tune-feed-content__rows-skeleton">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonShimmer key={index} className="tune-feed-content__row-skeleton" />
          ))}
        </div>
        <SkeletonShimmer className="tune-feed-content__button-skeleton" />
      </div>
    )
  }

  const showTopics = preferences.hasListeningSignal && topics.length > 0
  const hasMuted =
    preferences.mutedTopics.length > 0 || preferences.mutedShows.length > 0

  return (
    <div className="tune-feed-content">
      {showBack ? (
        <button
          ref={backRef}
          type="button"
          className="tune-feed-content__back"
          onClick={onBack}
          aria-label="Back to Library"
        >
          Back to Library
        </button>
      ) : null}

      <header className="tune-feed-content__head">
        <h1 id={titleId} ref={titleRef} className="tune-feed-content__title" tabIndex={-1}>
          Tune your feed
        </h1>
        <p className="tune-feed-content__subtitle">
          Slide topics up or down. Mute what you're done with.
        </p>
      </header>

      <section className="tune-feed-section" aria-labelledby={`${titleId}-more`}>
        <h2 id={`${titleId}-more`} className="tune-feed-section__title">
          Show me more of
        </h2>
        {showTopics ? (
          <ul className="tune-feed-section__list">
            {topics.map((topic) => (
              <li key={topic.id}>
                <TuneTopicRow
                  topic={topic}
                  value={preferences.topicLevels[topic.id] ?? 0}
                  onChange={(level) => setTopicLevel(topic.id, level)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="tune-feed-empty" role="status">
            <p className="tune-feed-empty__title">
              Tune what shows up once you've listened to a few clips.
            </p>
            <p className="tune-feed-empty__caption">We need a small starting signal.</p>
          </div>
        )}
      </section>

      <section className="tune-feed-section" aria-labelledby={`${titleId}-muted`}>
        <h2 id={`${titleId}-muted`} className="tune-feed-section__title">
          Muted
        </h2>
        {hasMuted ? (
          <ul className="tune-feed-muted-list">
            {preferences.mutedTopics.map((name) => {
              const key = `topic:${name}`
              return (
                <motion.li
                  key={key}
                  className="tune-feed-muted-item"
                  animate={{ opacity: exitingMutedKeys.has(key) ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="tune-feed-muted-item__name">{name}</span>
                  <button
                    type="button"
                    className="tune-feed-muted-item__unmute"
                    onClick={() => beginUnmute(key, () => unmuteTopic(name))}
                    aria-label={`Un-mute ${name}`}
                  >
                    <IconClose />
                  </button>
                </motion.li>
              )
            })}
            {preferences.mutedShows.map((show) => {
              const key = `show:${show.id}`
              return (
                <motion.li
                  key={key}
                  className="tune-feed-muted-item"
                  animate={{ opacity: exitingMutedKeys.has(key) ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="tune-feed-muted-item__name">{show.name}</span>
                  <button
                    type="button"
                    className="tune-feed-muted-item__unmute"
                    onClick={() => beginUnmute(key, () => unmuteShow(show.id))}
                    aria-label={`Un-mute ${show.name}`}
                  >
                    <IconClose />
                  </button>
                </motion.li>
              )
            })}
          </ul>
        ) : (
          <p className="tune-feed-section__empty">Nothing muted right now.</p>
        )}
      </section>

      <section className="tune-feed-section tune-feed-section--reset">
        <button type="button" className="tune-feed-reset" onClick={handleResetClick}>
          Reset to defaults
        </button>
      </section>

      <dialog ref={resetDialogRef} className="tune-feed-dialog">
        <p className="tune-feed-dialog__copy">
          Reset all topic sliders and clear your muted list?
        </p>
        <div className="tune-feed-dialog__actions">
          <button
            type="button"
            className="tune-feed-dialog__cancel"
            onClick={() => resetDialogRef.current?.close()}
          >
            Cancel
          </button>
          <button type="button" className="tune-feed-dialog__confirm" onClick={handleResetConfirm}>
            Reset everything
          </button>
        </div>
      </dialog>
    </div>
  )
}
