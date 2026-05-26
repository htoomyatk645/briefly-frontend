import { useMemo, type CSSProperties } from 'react'
import { useCoverTintHsl } from '../library/useCoverTintHsl'

export function parseTintHsl(tint: string): { h: string; s: string } {
  const match = tint.match(/^([\d.]+)\s+([\d.]+)%/)
  if (!match) return { h: '220', s: '30%' }
  return { h: match[1], s: `${match[2]}%` }
}

export function useSearchCoverTintStyle(coverSrc: string): CSSProperties {
  const coverTint = useCoverTintHsl(coverSrc)
  const { h, s } = useMemo(() => parseTintHsl(coverTint), [coverTint])
  return useMemo(
    () =>
      ({
        '--search-cover-h': h,
        '--search-cover-s': s,
      }) as CSSProperties,
    [h, s],
  )
}
