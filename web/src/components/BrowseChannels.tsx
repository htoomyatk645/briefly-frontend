import { useState } from 'react'
import type { BrowseCategory } from '../data/discoverData'
import './homeShelves.css'

export type BrowseChannelsProps = {
  categories: BrowseCategory[]
  activeId?: string | null
  onSelect?: (id: string) => void
}

const CategoryIcon = ({ name }: { name: BrowseCategory['icon'] }) => {
  const props = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'newspaper':
      return (
        <svg {...props}>
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8z" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...props}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
        </svg>
      )
    case 'trending-up':
      return (
        <svg {...props}>
          <path d="m22 7-8.5 8.5-5-5L2 17" />
          <path d="M16 7h6v6" />
        </svg>
      )
    case 'alert-triangle':
      return (
        <svg {...props}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      )
    case 'flask':
      return (
        <svg {...props}>
          <path d="M10 2v7.31" />
          <path d="M14 2v7.31" />
          <path d="M8.5 2h7" />
          <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
          <path d="M5.52 16h12.96" />
        </svg>
      )
    case 'laugh':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12z" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      )
    case 'cpu':
      return (
        <svg {...props}>
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2" />
          <path d="M15 20v2" />
          <path d="M2 15h2" />
          <path d="M2 9h2" />
          <path d="M20 15h2" />
          <path d="M20 9h2" />
          <path d="M9 2v2" />
          <path d="M9 20v2" />
        </svg>
      )
    case 'users':
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
  }
}

export const BrowseChannels = ({
  categories,
  activeId: activeIdProp,
  onSelect,
}: BrowseChannelsProps) => {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null)
  const isControlled = activeIdProp !== undefined
  const activeId = isControlled ? activeIdProp : internalActiveId

  const handleSelect = (category: BrowseCategory) => {
    if (!isControlled) {
      setInternalActiveId(category.id)
    }
    onSelect?.(category.id)
  }

  return (
    <section className="home-shelf browse-channels" aria-labelledby="browse-channels-heading">
      <h2 id="browse-channels-heading" className="home-shelf__label">
        Browse Channels
      </h2>
      <div className="home-shelf__scroller" role="list">
        {categories.map((category) => {
          const isActive = activeId === category.id
          return (
            <button
              key={category.id}
              type="button"
              role="listitem"
              className={`browse-channels__chip${isActive ? ' browse-channels__chip--active' : ''}`}
              onClick={() => handleSelect(category)}
              aria-pressed={isActive}
            >
              <span className="browse-channels__chip-icon">
                <CategoryIcon name={category.icon} />
              </span>
              {category.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
