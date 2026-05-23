import { useCallback, useMemo, useState } from 'react'
import {
  PODCAST_NETWORKS,
  MIN_NETWORK_SELECTIONS,
} from './podcastNetworks'
import './network-selection.css'

export type NetworkSelectionScreenProps = {
  onComplete: (selectedNetworks: string[]) => void
}

const getCtaLabel = (count: number): string => {
  const remaining = MIN_NETWORK_SELECTIONS - count
  if (remaining <= 0) return 'Continue'
  if (remaining === 1) return 'Pick 1 more'
  return `Pick ${remaining} more`
}

export const NetworkSelectionScreen = ({
  onComplete,
}: NetworkSelectionScreenProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const canContinue = selected.size >= MIN_NETWORK_SELECTIONS
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
      className="network-selection network-selection--shelled"
      aria-label="Pick your favorite networks"
    >
      <header className="network-selection__header">
        <h1 className="network-selection__title">Networks you love</h1>
        <p className="network-selection__subtitle">
          Pick the podcast networks you follow. We&apos;ll surface their latest first.
        </p>
      </header>

      <div className="network-selection__scroll">
        <div
          className="network-grid"
          role="group"
          aria-label="Podcast networks"
        >
          {PODCAST_NETWORKS.map((network) => {
            const isSelected = selected.has(network.id)
            return (
              <button
                key={network.id}
                type="button"
                className={`network-item${isSelected ? ' network-item--selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => handleToggle(network.id)}
              >
                <span
                  className="network-item__circle"
                  style={{ backgroundColor: network.color }}
                >
                  <span className="network-item__initials">
                    {network.initials}
                  </span>
                  {isSelected ? (
                    <span className="network-item__check" aria-hidden>
                      <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                        <circle cx={8} cy={8} r={8} fill="var(--primary)" />
                        <path
                          d="M4.5 8.2l2.5 2.5 4.5-4.5"
                          stroke="#fff"
                          strokeWidth={1.75}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </span>
                <span className="network-item__name">{network.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <footer className="network-selection__footer">
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
