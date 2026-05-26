import { motion } from 'framer-motion'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Toggle } from '../ui/Toggle'
import '../ui/toggle.css'
import { FeedDecisionsSheet } from './FeedDecisionsSheet'
import { IconMoreVertical, IconTag } from './icons'
import { SegmentedControl } from './SegmentedControl'
import { SkeletonShimmer } from './SkeletonShimmer'
import { TuneFeedResetConfirm } from './TuneFeedResetConfirm'
import { TuneFeedToasts } from './TuneFeedToasts'
import {
  TUNE_TOPICS,
  formatSnoozeResumeDate,
  isSnoozeActive,
  mutedItemKey,
  useFeedTuningHydrated,
  useFeedTuningStore,
  type TopicWeight,
  type TuneTopic,
} from '../../state/feedTuning'
import './tuneFeed.css'

const WEIGHT_OPTIONS: { value: TopicWeight; label: string }[] = [
  { value: 'less', label: 'Less' },
  { value: 'default', label: 'Default' },
  { value: 'more', label: 'More' },
]

export type TuneFeedSurfaceProps = {
  titleId?: string
  showBack?: boolean
  onBack?: () => void
  autoFocusTitle?: boolean
}

function TopicTuneRow({ topic }: { topic: TuneTopic }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const weight = useFeedTuningStore((state) => state.topicWeights[topic.id] ?? 'default')
  const setTopicWeight = useFeedTuningStore((state) => state.setTopicWeight)
  const hideTopic = useFeedTuningStore((state) => state.hideTopic)

  useEffect(() => {
    if (!menuOpen) return
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [menuOpen])

  return (
    <li className="tune-topic-list__row">
      <div className="tune-topic-list__main">
        <span className="tune-topic-list__name">{topic.label}</span>
        <span className="tune-topic-list__meta">
          From {topic.clipCount} clips you&apos;ve heard.
        </span>
      </div>
      <div className="tune-topic-list__controls">
        <SegmentedControl
          options={WEIGHT_OPTIONS}
          value={weight}
          onChange={(next) => setTopicWeight(topic.id, next)}
          ariaLabel={`Tune ${topic.label}`}
        />
        <div className="tune-topic-list__menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="tune-topic-list__overflow"
            aria-label={`More options for ${topic.label}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <IconMoreVertical />
          </button>
          {menuOpen ? (
            <div className="tune-topic-list__popover" role="menu">
              <button
                type="button"
                role="menuitem"
                className="tune-topic-list__popover-action"
                onClick={() => {
                  hideTopic(topic.id, topic.label)
                  setMenuOpen(false)
                }}
              >
                Hide this topic
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export function TuneFeedSurface({
  titleId: titleIdProp,
  showBack,
  onBack,
  autoFocusTitle = true,
}: TuneFeedSurfaceProps) {
  const autoId = useId()
  const titleId = titleIdProp ?? `tune-feed-title-${autoId}`
  const titleRef = useRef<HTMLHeadingElement>(null)
  const backRef = useRef<HTMLButtonElement>(null)
  const hydrated = useFeedTuningHydrated()

  const hasListeningSignal = useFeedTuningStore((state) => state.hasListeningSignal)
  const snoozeUntil = useFeedTuningStore((state) => state.snoozeUntil)
  const mutedItems = useFeedTuningStore((state) => state.mutedItems)
  const setSnoozeActive = useFeedTuningStore((state) => state.setSnoozeActive)
  const resumeSnoozeNow = useFeedTuningStore((state) => state.resumeSnoozeNow)
  const unmuteItem = useFeedTuningStore((state) => state.unmuteItem)
  const resetPersonalization = useFeedTuningStore((state) => state.resetPersonalization)

  const [exitingMuted, setExitingMuted] = useState<Set<string>>(new Set())
  const [resetOpen, setResetOpen] = useState(false)
  const [decisionsOpen, setDecisionsOpen] = useState(false)

  const snoozeActive = isSnoozeActive(snoozeUntil)

  const visibleTopics = useMemo(() => {
    const hiddenLabels = new Set(
      mutedItems.filter((item) => item.kind === 'topic').map((item) => item.label),
    )
    return TUNE_TOPICS.filter((topic) => !hiddenLabels.has(topic.label))
  }, [mutedItems])

  useEffect(() => {
    if (!hydrated) return
    if (showBack) {
      backRef.current?.focus()
      return
    }
    if (autoFocusTitle) {
      titleRef.current?.focus()
    }
  }, [autoFocusTitle, hydrated, showBack])

  const beginUnmute = (key: string) => {
    setExitingMuted((prev) => new Set(prev).add(key))
    window.setTimeout(() => {
      unmuteItem(key)
      setExitingMuted((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }, 220)
  }

  if (!hydrated) {
    return (
      <div className="tune-feed-surface tune-feed-surface--loading" aria-busy="true">
        <SkeletonShimmer className="tune-feed-surface__title-skeleton" />
        <SkeletonShimmer className="tune-feed-surface__subtitle-skeleton" />
        <div className="tune-feed-surface__rows-skeleton">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonShimmer key={index} className="tune-feed-surface__row-skeleton" />
          ))}
        </div>
        <SkeletonShimmer className="tune-feed-surface__button-skeleton" />
      </div>
    )
  }

  return (
    <div className="tune-feed-surface">
      {snoozeActive && snoozeUntil ? (
        <div className="tune-feed-snooze-banner" role="status">
          <span>
            Recommendations paused — resumes {formatSnoozeResumeDate(snoozeUntil)}.
          </span>
          <button type="button" className="tune-feed-snooze-banner__link" onClick={resumeSnoozeNow}>
            Resume now
          </button>
        </div>
      ) : null}

      {showBack ? (
        <button
          ref={backRef}
          type="button"
          className="tune-feed-surface__back"
          onClick={onBack}
          aria-label="Back to Library"
        >
          Back to Library
        </button>
      ) : null}

      <header className="tune-feed-surface__header">
        <h1 id={titleId} ref={titleRef} className="tune-feed-surface__title" tabIndex={-1}>
          Tune your feed
        </h1>
        <p className="tune-feed-surface__subtitle">
          Calibrate what shows up. We&apos;ll learn the rest.
        </p>
      </header>

      <section className="tune-feed-snooze-card" aria-labelledby={`${titleId}-snooze`}>
        <div className="tune-feed-snooze-card__copy">
          <h2 id={`${titleId}-snooze`} className="tune-feed-snooze-card__title">
            Pause recommendations
          </h2>
          <p className="tune-feed-snooze-card__caption">
            Show only clips from shows you follow. Resets in 30 days.
          </p>
        </div>
        <Toggle
          checked={snoozeActive}
          onCheckedChange={setSnoozeActive}
          label="Pause recommendations for 30 days"
        />
      </section>

      <section className="tune-feed-section" aria-labelledby={`${titleId}-topics`}>
        <div className="tune-feed-section__head">
          <h2 id={`${titleId}-topics`} className="tune-feed-section__title">
            Topics
          </h2>
          <p className="tune-feed-section__caption">What you want more or less of.</p>
        </div>

        {hasListeningSignal && visibleTopics.length > 0 ? (
          <ul className="tune-topic-list">
            {visibleTopics.map((topic) => (
              <TopicTuneRow key={topic.id} topic={topic} />
            ))}
          </ul>
        ) : (
          <div className="tune-feed-topics-empty">
            <p className="tune-feed-topics-empty__title">
              Tune what shows up once you&apos;ve listened to a few clips.
            </p>
            <p className="tune-feed-topics-empty__caption">We need a small starting signal.</p>
          </div>
        )}
      </section>

      <section className="tune-feed-section" aria-labelledby={`${titleId}-muted`}>
        <div className="tune-feed-section__head">
          <h2 id={`${titleId}-muted`} className="tune-feed-section__title">
            Muted
          </h2>
          <p className="tune-feed-section__caption">Things you&apos;ve asked us to skip.</p>
        </div>

        {mutedItems.length === 0 ? (
          <p className="tune-feed-muted-empty">Nothing muted.</p>
        ) : (
          <ul className="tune-feed-muted-list">
            {mutedItems.map((item) => {
              const key = mutedItemKey(item)
              return (
                <motion.li
                  key={key}
                  className="tune-feed-muted-list__row"
                  animate={{ opacity: exitingMuted.has(key) ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.kind === 'show' ? (
                    <img
                      src={item.coverSrc}
                      alt=""
                      className="tune-feed-muted-list__cover"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <span className="tune-feed-muted-list__tag" aria-hidden>
                      <IconTag />
                    </span>
                  )}
                  <span className="tune-feed-muted-list__name">
                    {item.kind === 'show' ? item.name : item.label}
                  </span>
                  <button
                    type="button"
                    className="tune-feed-muted-list__unmute"
                    onClick={() => beginUnmute(key)}
                  >
                    Un-mute
                  </button>
                </motion.li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="tune-feed-section tune-feed-section--link">
        <button
          type="button"
          className="tune-feed-decisions-link"
          onClick={() => setDecisionsOpen(true)}
        >
          View recent feed decisions
        </button>
      </section>

      <section className="tune-feed-reset-card-wrap" aria-labelledby={`${titleId}-reset`}>
        <div className="tune-feed-reset-card">
          <div className="tune-feed-reset-card__copy">
            <h2 id={`${titleId}-reset`} className="tune-feed-reset-card__title">
              Start over
            </h2>
            <p className="tune-feed-reset-card__caption">
              Reset your feed to a clean slate. Your saves and shows stay.
            </p>
          </div>
          <button
            type="button"
            className="tune-feed-reset-card__button"
            onClick={() => setResetOpen(true)}
          >
            Reset feed personalization
          </button>
        </div>
      </section>

      <TuneFeedResetConfirm
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => {
          resetPersonalization()
          setResetOpen(false)
        }}
      />

      <FeedDecisionsSheet open={decisionsOpen} onClose={() => setDecisionsOpen(false)} />

      <TuneFeedToasts />
    </div>
  )
}
