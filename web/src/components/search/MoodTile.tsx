import { useMemo, type CSSProperties } from 'react'
import { useCoverTintHsl } from '../library/useCoverTintHsl'
import type { MoodTileItem } from '../../data/searchData'

export type MoodTileProps = {
  item?: MoodTileItem
  loading?: boolean
  onSelect?: (moodQuery: string) => void
}

function parseTintHsl(tint: string): { h: string; s: string } {
  const match = tint.match(/^([\d.]+)\s+([\d.]+)%/)
  if (!match) return { h: '220', s: '30%' }
  return { h: match[1], s: `${match[2]}%` }
}

export function MoodTile({ item, loading = false, onSelect }: MoodTileProps) {
  const coverSrc = item?.coverSrc ?? ''
  const coverTint = useCoverTintHsl(coverSrc)
  const { h, s } = useMemo(() => parseTintHsl(coverTint), [coverTint])

  const tintStyle = useMemo(
    () =>
      ({
        '--search-mood-h': h,
        '--search-mood-s': s,
      }) as CSSProperties,
    [h, s],
  )

  if (loading) {
    return (
      <div
        className="search-mood-tile search-mood-tile--skeleton"
        aria-hidden
      />
    )
  }

  if (!item) {
    return null
  }

  return (
    <button
      type="button"
      className="search-mood-tile"
      style={tintStyle}
      onClick={() => onSelect?.(item.moodQuery)}
      aria-label={`Browse mood: ${item.label}`}
    >
      <span className="search-mood-tile__label">{item.label}</span>
    </button>
  )
}
