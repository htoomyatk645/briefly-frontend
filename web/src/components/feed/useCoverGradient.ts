import { useEffect, useState } from 'react'

const FALLBACK_GRADIENT =
  'linear-gradient(160deg, #5bc8d4 0%, #3aafbf 35%, #2196a8 65%, #1a7b9a 100%)'

type Rgb = { r: number; g: number; b: number }

const gradientCache = new Map<string, string>()
const cardBackgroundCache = new Map<string, string>()

const CARD_BG_FALLBACK = 'hsl(215 45% 22%)'

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

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  }
}

function lighten(c: Rgb, amount: number): Rgb {
  return mix(c, { r: 255, g: 255, b: 255 }, amount)
}

function darken(c: Rgb, amount: number): Rgb {
  return mix(c, { r: 0, g: 0, b: 0 }, amount)
}

function boostSaturation(c: Rgb, factor: number): Rgb {
  const l = luminance(c) * 255
  const s = saturation(c)
  if (s < 0.05) return c
  const targetS = clamp(s * factor, 0, 1)
  const gray = l
  return {
    r: gray + (c.r - gray) * (targetS / s),
    g: gray + (c.g - gray) * (targetS / s),
    b: gray + (c.b - gray) * (targetS / s),
  }
}

function buildGradientFromColors(colors: Rgb[]): string {
  if (colors.length === 0) return FALLBACK_GRADIENT

  const sorted = [...colors].sort((a, b) => luminance(b) - luminance(a))
  const vibrant = sorted.find((c) => saturation(c) > 0.12) ?? sorted[0]
  const anchor = boostSaturation(vibrant, 1.15)

  const top = lighten(anchor, 0.28)
  const midHigh = lighten(anchor, 0.08)
  const midLow = darken(anchor, 0.12)
  const bottom = darken(anchor, 0.32)

  return `linear-gradient(160deg, ${rgbToHex(top)} 0%, ${rgbToHex(midHigh)} 35%, ${rgbToHex(midLow)} 65%, ${rgbToHex(bottom)} 100%)`
}

function buildCardBackgroundFromColors(colors: Rgb[]): string {
  if (colors.length === 0) return CARD_BG_FALLBACK

  const sorted = [...colors].sort((a, b) => luminance(b) - luminance(a))
  const vibrant = sorted.find((c) => saturation(c) > 0.1) ?? sorted[0]
  const anchor = boostSaturation(vibrant, 1.12)
  const toned = darken(anchor, 0.38)
  const h = rgbToHue(toned.r, toned.g, toned.b)
  const sat = clamp(saturation(toned) * 100 * 1.2, 12, 72)
  const light = clamp(luminance(toned) * 100, 18, 32)
  return `hsl(${Math.round(h)} ${Math.round(sat)}% ${Math.round(light)}%)`
}

function extractPalette(data: Uint8ClampedArray): Rgb[] {
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
    if (n === 0) return []
    return [{ r: r / n, g: g / n, b: b / n }]
  }

  return ranked.slice(0, 4).map(({ r, g, b }) => ({ r, g, b }))
}

async function extractCardBackgroundFromCover(coverSrc: string): Promise<string> {
  const cached = cardBackgroundCache.get(coverSrc)
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
    if (!ctx) return CARD_BG_FALLBACK

    ctx.drawImage(img, 0, 0, size, size)
    const { data } = ctx.getImageData(0, 0, size, size)
    const palette = extractPalette(data)
    const background = buildCardBackgroundFromColors(palette)

    cardBackgroundCache.set(coverSrc, background)
    return background
  } catch {
    return CARD_BG_FALLBACK
  }
}

async function extractGradientFromCover(coverSrc: string): Promise<string> {
  const cached = gradientCache.get(coverSrc)
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
    if (!ctx) return FALLBACK_GRADIENT

    ctx.drawImage(img, 0, 0, size, size)
    const { data } = ctx.getImageData(0, 0, size, size)
    const palette = extractPalette(data)
    const gradient = buildGradientFromColors(palette)

    gradientCache.set(coverSrc, gradient)
    return gradient
  } catch {
    return FALLBACK_GRADIENT
  }
}

export function useCoverCardBackground(coverSrc: string) {
  const [background, setBackground] = useState(
    () => cardBackgroundCache.get(coverSrc) ?? CARD_BG_FALLBACK,
  )

  useEffect(() => {
    let cancelled = false
    const cached = cardBackgroundCache.get(coverSrc)
    if (cached) {
      setBackground(cached)
      return
    }

    void extractCardBackgroundFromCover(coverSrc).then((next) => {
      if (!cancelled) setBackground(next)
    })

    return () => {
      cancelled = true
    }
  }, [coverSrc])

  return background
}

export function useCoverGradient(coverSrc: string) {
  const [gradient, setGradient] = useState(
    () => gradientCache.get(coverSrc) ?? FALLBACK_GRADIENT,
  )

  useEffect(() => {
    let cancelled = false
    const cached = gradientCache.get(coverSrc)
    if (cached) {
      setGradient(cached)
      return
    }

    void extractGradientFromCover(coverSrc).then((next) => {
      if (!cancelled) setGradient(next)
    })

    return () => {
      cancelled = true
    }
  }, [coverSrc])

  return gradient
}
