import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MentionedReading from '../components/library/MentionedReading'
import '../components/library/mentionedReading.css'

const FILTER_CHIPS = ['All', 'Books', 'Articles & links', 'By show'] as const

export default function ReadingAll() {
  const navigate = useNavigate()
  const backRef = useRef<HTMLButtonElement>(null)
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTER_CHIPS)[number]>('All')

  useEffect(() => {
    backRef.current?.focus()
  }, [])

  return (
    <div className="reading-all">
      <button
        ref={backRef}
        type="button"
        className="reading-all__back"
        onClick={() => navigate('/library')}
        aria-label="Back to Library"
      >
        Back to Library
      </button>

      <header className="reading-all__head">
        <h1 className="reading-all__title">Worth a read</h1>
        <p className="reading-all__subtitle">
          Books and links cited in your listened clips.
        </p>
      </header>

      <div className="reading-all__filters" role="tablist" aria-label="Filter reading list">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            role="tab"
            className={`reading-all__filter${activeFilter === chip ? ' reading-all__filter--active' : ''}`}
            aria-selected={activeFilter === chip}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <p className="reading-all__filter-note" aria-live="polite">
        {activeFilter === 'All'
          ? null
          : `Showing ${activeFilter} — filters connect in a follow-up.`}
      </p>

      <MentionedReading layout="grid" showSectionHead={false} />
    </div>
  )
}
