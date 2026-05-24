import { useEffect, useState } from 'react'
import { colors } from '../../tokens'

const FALLBACK_COLOR = colors.feed.bg

type Rgb = { r: number; g: number; b: number }

const colorCache = new Map<string, string>()

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function rgbToHex({ r, g, b }: Rgb) {
  const h = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}

function luminance({ r, g, b }: Rgb) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

function saturation({ r, g, b }: Rgb) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max === 0) return 0
  return (max - min) / max
}

function rgbToHue(r: number, g: number, b: number) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  if (d === 0) return 0
  let h = 0
  if (max === rn) h = ((gn - bn) / d) % 6
  else if (max === gn) h = (bn - rn) / d + 2
  else h = (rn - gn) / d + 4
  return ((h * 60) + 360) % 360
}

function extractDominantColor(data: Uint8ClampedArray): Rgb | null {
  const buckets = new Map<
    number,
    { r: number; g: number; b: number; count: number; satSum: number }
  >()

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 140) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = luminance({ r, g, b })
    if (lum < 0.06 || lum > 0.94) continue

    const hue = Math.floor(rgbToHue(r, g, b) / 12)
    const sat = saturation({ r, g, b })
    const prev = buckets.get(hue) ?? { r: 0, g: 0, b: 0, count: 0, satSum: 0 }
    prev.r += r
    prev.g += g
    prev.b += b
    prev.count += 1
    prev.satSum += sat
    buckets.set(hue, prev)
  }

  const ranked = [...buckets.values()]
    .filter((b) => b.count >= 4)
    .map((b) => ({
      r: b.r / b.count,
      g: b.g / b.count,
      b: b.b / b.count,
      weight: b.count * (1 + b.satSum / b.count),
    }))
    .sort((a, b) => b.weight - a.weight)

  if (ranked.length === 0) {
    let r = 0
    let g = 0
    let b = 0
    let n = 0
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 140) continue
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n += 1
    }
    if (n === 0) return null
    return { r: r / n, g: g / n, b: b / n }
  }

  const { r, g, b } = ranked[0]
  return { r, g, b }
}

async function extractColorFromCover(coverSrc: string): Promise<string> {
  const cached = colorCache.get(coverSrc)
  if (cached) return cached

  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.decoding = 'async'
    img.src = coverSrc

    await new Promise<void>((resolve, reject) => {
      if (img.complete && img.naturalWidth > 0) {
        resolve()
        return
      }
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('cover load failed'))
    })

    const size = 48
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return FALLBACK_COLOR

    ctx.drawImage(img, 0, 0, size, size)
    const { data } = ctx.getImageData(0, 0, size, size)
    const dominant = extractDominantColor(data)
    const color = dominant ? rgbToHex(dominant) : FALLBACK_COLOR

    colorCache.set(coverSrc, color)
    return color
  } catch {
    return FALLBACK_COLOR
  }
}

export function useCoverColor(coverSrc: string) {
  const [color, setColor] = useState(
    () => colorCache.get(coverSrc) ?? FALLBACK_COLOR,
  )

  useEffect(() => {
    let cancelled = false
    const cached = colorCache.get(coverSrc)
    if (cached) {
      setColor(cached)
      return
    }

    void extractColorFromCover(coverSrc).then((next) => {
      if (!cancelled) setColor(next)
    })

    return () => {
      cancelled = true
    }
  }, [coverSrc])

  return color
}
