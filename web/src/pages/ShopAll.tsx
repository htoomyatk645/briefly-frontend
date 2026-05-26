import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MentionedProducts from '../components/library/MentionedProducts'
import '../components/library/mentionedProducts.css'

const FILTER_CHIPS = [
  'All',
  'This week',
  'By show',
  'By price (asc)',
  'By price (desc)',
] as const

export default function ShopAll() {
  const navigate = useNavigate()
  const backRef = useRef<HTMLButtonElement>(null)
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTER_CHIPS)[number]>('All')

  useEffect(() => {
    backRef.current?.focus()
  }, [])

  return (
    <div className="shop-all">
      <button
        ref={backRef}
        type="button"
        className="shop-all__back"
        onClick={() => navigate('/library')}
        aria-label="Back to Library"
      >
        Back to Library
      </button>

      <header className="shop-all__head">
        <h1 className="shop-all__title">Shop the show</h1>
        <p className="shop-all__subtitle">
          Things mentioned in clips you have listened to.
        </p>
      </header>

      <div className="shop-all__filters" role="tablist" aria-label="Filter products">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            role="tab"
            className={`shop-all__filter${activeFilter === chip ? ' shop-all__filter--active' : ''}`}
            aria-selected={activeFilter === chip}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <p className="shop-all__filter-note" aria-live="polite">
        {activeFilter === 'All'
          ? null
          : `Showing ${activeFilter} — filters connect in a follow-up.`}
      </p>

      <MentionedProducts layout="grid" showSectionHead={false} />
    </div>
  )
}
