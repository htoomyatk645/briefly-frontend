import { useEffect, useState } from 'react'
import { useCoverCardBackground } from '../feed/useCoverGradient'

function parseHslComponents(hsl: string): string | null {
  const match = hsl.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)/i)
  if (!match) return null
  return `${match[1]} ${match[2]}% ${match[3]}%`
}

const DEFAULT_TINT = '20 6% 12%'

export function useCoverTintHsl(coverSrc: string): string {
  const background = useCoverCardBackground(coverSrc)
  const [tint, setTint] = useState(() => parseHslComponents(background) ?? DEFAULT_TINT)

  useEffect(() => {
    setTint(parseHslComponents(background) ?? DEFAULT_TINT)
  }, [background])

  return tint
}
