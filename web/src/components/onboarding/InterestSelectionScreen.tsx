import { useCallback, useMemo, useState } from 'react'
import {
  INTEREST_GROUPS,
  MIN_INTEREST_SELECTIONS,
} from './interestCategories'
import './interest-selection.css'

export type InterestSelectionScreenProps = {
  onComplete: (selectedCategories: string[]) => void
}

const getCtaLabel = (count: number): string => {
  const remaining = MIN_INTEREST_SELECTIONS - count
  if (remaining <= 0) return 'Continue'
  if (remaining === 1) return 'Pick 1 more'
  return `Pick ${remaining} more`
}

export const InterestSelectionScreen = ({
  onComplete,
}: InterestSelectionScreenProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const canContinue = selected.size >= MIN_INTEREST_SELECTIONS
  const ctaLabel = useMemo(() => getCtaLabel(selected.size), [selected.size])

  const handleToggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleContinue = () => {
    if (!canContinue) return
    onComplete(Array.from(selected))
  }

  return (
    <section
      className="interest-selection interest-selection--shelled"
      aria-label="What are you into?"
    >
      <header className="interest-selection__header">
        <h1 className="interest-selection__title">What are you into?</h1>
        <p className="interest-selection__subtitle">
          Pick things you&apos;d like to hear in your feed.
        </p>
      </header>

      <div className="interest-selection__scroll">
        {INTEREST_GROUPS.map((group) => (
          <div key={group.id} className="interest-group">
            <h2 className="interest-group__title">
              <span className="interest-group__emoji" aria-hidden>
                {group.emoji}
              </span>
              {group.title}
            </h2>
            <div className="interest-group__pills" role="group" aria-label={group.title}>
              {group.topics.map((topic) => {
                const isSelected = selected.has(topic.id)
                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={`interest-pill${isSelected ? ' interest-pill--selected' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => handleToggle(topic.id)}
                  >
                    {isSelected ? (
                      <svg
                        className="interest-pill__check"
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M2.5 7.2l3 3 6-6"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                    {topic.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <footer className="interest-selection__footer">
        <button
          type="button"
          className="btn-pill-primary"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          {ctaLabel}
        </button>
      </footer>
    </section>
  )
}
