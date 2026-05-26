import type { SearchPersonChip } from './searchResultsUtils'

export type PeopleChipRowProps = {
  people: SearchPersonChip[]
  activeSpeakerId: string | null
  onSelect: (speakerId: string | null) => void
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

export function PeopleChipRow({
  people,
  activeSpeakerId,
  onSelect,
}: PeopleChipRowProps) {
  if (people.length === 0) {
    return null
  }

  return (
    <div className="search-people-row" role="group" aria-label="People mentioned">
      <div className="search-people-row__chips">
        {people.map((person) => {
          const isActive = activeSpeakerId === person.id
          return (
            <button
              key={person.id}
              type="button"
              className={`search-people-chip${isActive ? ' search-people-chip--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onSelect(isActive ? null : person.id)}
            >
              <span className="search-people-chip__avatar-wrap">
                <img
                  className="search-people-chip__avatar"
                  src={person.avatarSrc}
                  alt=""
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                    const fallback = event.currentTarget.nextElementSibling
                    if (fallback instanceof HTMLElement) {
                      fallback.hidden = false
                    }
                  }}
                />
                <span className="search-people-chip__avatar-fallback" hidden>
                  {initials(person.name)}
                </span>
              </span>
              <span className="search-people-chip__name">{person.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
